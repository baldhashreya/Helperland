import { BookService } from "./book_service";
import e, {  NextFunction, Request,Response } from "express";
import {  user_id } from "../User/encrypt";
import sendEmail from "../User/send-mail";

var Discount_list = [
    {'value':'H-20',"id":0.8},
    {'value':'H-25',"id":0.75},
    {'value':'H-30',"id":0.3},
    {'value':'H-40',"id":0.6},
    {'value':'H-50',"id":0.5}
]
var extra = [
    {'id':'a',"name":"Clean cabinet interiors"},
    {'id':'b',"name":"Cleaning the refrigerator"},
    {'id':'c',"name":"Cleaning the oven"},
    {'id':'d',"name":"Washing and drying laundry"},
    {'id':'e',"name":"Cleaning windows"}
];

export class BookController{
    public constructor(private readonly BookService: BookService) {
        this.BookService = BookService;
    }

    public ckeckAvailability = async(req:Request,res:Response):Promise<Response> => {
        const Cid = +user_id(req.cookies.helperland);
        var count = 0;
        await this.BookService
            .fetch_favorite(Cid)
            .then(async(fetch_fav)=>{
                if(fetch_fav){
                    for(var i=0;i<fetch_fav.length;i++){
                        if(fetch_fav[i].IsFavorite == true){
                            const Hid = fetch_fav[i].TargetUserId;
                       await this.BookService
                            .findfav(Hid,Cid)
                            .then((fav)=>{
                                if(fav){
                                    if(fav.IsBlocked == false){
                                        count = count+1;
                                    }
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                        }
                        
                        if(count == 1 ){
                            break;
                        }
                    }
                    
                }
            })
            .catch((err:Error)=>{
                return res.status(500).json({error:"Error"})
            })
        if(count == 1){
            return this.BookService
            .findpostelcode(req.body.postelcode)
            .then((postelcode)=>{
                if(postelcode){
                    this.BookService
                        .findUser(+user_id(req.cookies.helperland))
                        .then((user)=>{
                            if(user == null){
                                return res.status(401).json({error:"NotFound User"});
                            }
                            else{
                                user.update({Zipcode:req.body.postelcode})
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                   
                  return  this.BookService
                    .createServiceRequest(req.body.postelcode)
                    .then((service)=>{
                        if(service){
                            const Id:number = (+service.id) + 1000;
                            service.update({ServiceId:Id})
                            const link = `${process.env.BASE_URL}/trainee2021/book-service/plan/${Id}`;
                            return res.status(200).json({"Follow Link": link});  
                        }
                        return res.status(201).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json({error:"Error"});
                    });
                }
                else{
                    return res.status(201).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
        }
        else{
            return res.status(201).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
        }
        
        
    }
    
    public Schedule_Plan = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id)
        const userid = user_id(req.cookies.helperland);
        var date = (req.body.ServiceStartDate).split("-");
        req.body.ServiceStartDate = new Date(date[2],date[1],date[0]);
        const length:number = (req.body.ExtraHours).length;
        const Service = (req.body.ExtraHours).reduce((a:any,b:any)=> (a[b] = '30 min',a),{});
        req.body.CreateDate = new Date();
        var Extra = req.body.ExtraHours;
        var extrahour = "";
        for(var i = 0;i<Extra.length;i++){
            var j = Extra[i];
            var d = extra.find( o => o.name == j);
            if(d != undefined){
                extrahour += d.id;
            } 
        }
        req.body.ExtraHours = (length/2);
        const total = parseFloat(req.body.ServiceHours) + parseFloat(req.body.ExtraHours);
        const subtotalpayment = total*18;
        var  totalpayment = 0;
          
        if(req.body.Discount != null){
            var Discount =((((req.body.Discount).split("-"))[1]))+"%";
            const dis = Discount_list.find(o => o.value == req.body.Discount);
            totalpayment = (subtotalpayment)*(dis == undefined? 1 : dis.id);
            console.log(Discount);
            req.body.Discount = Discount;
        }
        else{
            totalpayment = subtotalpayment;
            req.body.Discount = " ";
        }
        var  bill = {
            "Date":req.body.ServiceStartDate.getDate()+"/"+(req.body.ServiceStartDate.getMonth())+"/"+req.body.ServiceStartDate.getFullYear(),
            "Arrival Time":req.body.ArrivalTime,
            "Basic":req.body.ServiceHours + "  hours",
            "Benifits":Service,
            "totalhours ":total + "  hours",
            "SubTotal":subtotalpayment,
            "Discount":req.body.Discount,
            "TotalPayment":totalpayment,
            "follow_this_link":`${process.env.BASE_URL}/trainee2021/book-service/details/${id}`
        };
        const Time = (req.body.ServiceHours);
        const ExtraTime = (req.body.ExtraHours);
        const Arrival = ((req.body.ArrivalTime).split(':'))
        const Total = ((Time+ExtraTime).toString()).split('.');
        var time:string ;
        if(Arrival[1] == "30"){
            if(Total[1] == '5'){
                time = (((+Arrival[0])+(+Total[0])+1).toString())+":00";
            }
            else{
                time = (((+Arrival[0])+(+Total[0])).toString())+":30";
            }
        }
        else{
            if(Total[1] == '5'){
                time = (((+Arrival[0])+(+Total[0])).toString())+":30";
            }
            else{
                time = (((+Arrival[0])+(+Total[0])).toString())+":00";
            } 
        }                
        return this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service){
                  return this.BookService
                    .updateServiceRequest(req.body,service.id)
                    .then(async(result) =>{
                        if(result == null){
                            console.log(result);
                            return res.status(201).json("1something wrong");
                        }
                        else{
                            await service.update({SubTotal:subtotalpayment,TotalCost:totalpayment,UserId:userid,Discount:req.body.Discount,EndTime:time});
                            await this.BookService
                                .updateExtraService(extrahour,service.id)
                                .then((result)=>{
                                    if(result == null){
                                        return res.status(401).json("2Something is Wrong");
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json("Error from update Extra Service");
                                });
                            return res.status(200).json(bill);
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json("Error from Schedule SAVE");
                    })
                }
                else{
                    return res.status(201).json("3Something is Wrong");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from Schedule");
            }); 
    }

    public Address_details = async(req:Request,res:Response):Promise<Response> =>{
        const id = req.params.id;
        const Id = parseInt(user_id(req.cookies.helperland));
        return this.BookService
            .getAddressesById(Id)
            .then((address)=>{
               if(address.length == 0){
                   return res.status(200).json({"message":"no data availble","link":`${process.env.BASE_URL}/trainee2021/book-service/add_address/${id}`});
               }
               else{
                   console.log(address);
                   return res.status(200).json({"data":address,"choose":`enter id above one to use as default address and follow the link : ${process.env.BASE_URL}/trainee2021/book-service/set_address/${id}/Enter id:`,"add address":`${process.env.BASE_URL}/trainee2021/book-service/add_address/${id}`});
               }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public set_address = async(req:Request,res:Response):Promise<Response>=>{
        const token = req.params.token;
        const id = parseInt(req.params.id);
        const userId = user_id(req.cookies.helperland);
        return this.BookService
            .getAddressById(id)
            .then((result)=>{
                if(result == null){
                    return res.status(401).json({error:"Not Found"});
                }
                else{
                    result.update({UserId:parseInt(userId)});
                    this.BookService
                    .findServiceRequest(parseInt(token))
                    .then((user)=>{
                        if(user == null){
                            return res.status(401).json({error:"Not Found"});
                        }
                        else{
                            user.update({UserAddressId:result.id});
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json({error:"Error"});
                    })
                    const link = `${process.env.BASE_URL}/trainee2021/book-service/set-fev/${token}`;
                    return res.status(200).json({"follow link": link});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from set address");
            })
    }

    public set_fav = async(req:Request ,res:Response):Promise<Response>=>{
        const token = req.params.id;
        const CId = user_id(req.cookies.helperland)
        return this.BookService
            .fetch_favorite(CId)
            .then(async(user)=>{
                if(user.length == 0){
                    return res.status(200).json({"Payment":`${process.env.BASE_URL}/trainee2021/book-service/payment/${token}`})
                }
                else{
                    var data:any = [];
                    for(var i=0;i<user.length;i++){
                        const Hid = user[i].TargetUserId;
                        if(user[i].IsFavorite == true){
                            await this.BookService
                                .findfav(Hid,CId)
                                .then(async(fav)=>{
                                    if(fav == null){
                                    }
                                    else{
                                        if(fav.IsBlocked == true){

                                        }
                                        else{
                                            await this.BookService
                                                .findUser(Hid)
                                                .then((user)=>{
                                                    if(user == null){
                                                        return res.status(401).json("Something is Wrong");
                                                        
                                                    }
                                                    else { 
                                                        const name = user.FirstName + " "+user.LastName;
                                                        const Data = {
                                                            "service Provider":name,
                                                            "Accept Service Provider":`${process.env.BASE_URL}/trainee2021/book-service/set-fev/${user.id}/${token}`,
                                                            "Else Payment":`${process.env.BASE_URL}/trainee2021/book-service/payment/${token}`
                                                        }
                                                        data.push(Data) ; 
                                                    }
                                                })
                                                .catch((err:Error)=>{
                                                    console.log(err);
                                                    return res.status(500).json("Error");
                                                })
                                        }
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"Error"})
                                })
                            
                        }
                        
                    }
                    if(data.length == 0){
                        return res.status(200).json({"Payment":`${process.env.BASE_URL}/trainee2021/book-service/payment/${token}`})
                    }
                    else{
                        return res.status(200).json(data); 
                    }
                  
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })

    }

    public set_helper = async(req:Request,res:Response):Promise<Response>=>{
        const token = req.params.token;
        const id = req.params.id;
        const Cid = user_id(req.cookies.helperland);
        var name:string = "",email:string = "";
       return this.BookService
            .fetch_favorite(Cid)
            .then(async(fav)=>{
                if(fav.length == 0){
                    return res.status(404).json({error:"Not Found"})
                }
                else{
                    var d = fav.find(o => o.TargetUserId == +id);
                    if(d != undefined){
                        await this.BookService
                            .findUser(+id)
                            .then((user)=>{
                                if(user == null){
                                    return res.status(404).json({error:"Not Found"})
                                }
                                else{
                                    name = user.FirstName + " " + user.LastName;
                                    email = user.email
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"})
                            })
                        return this.BookService
                            .UserRequest(+token,+id,name,email)
                            .then((UserRequest)=>{
                                if(UserRequest){
                                   UserRequest.update({CustomerId:Cid})
                                    return res.status(200).json({"link": `${process.env.BASE_URL}/trainee2021/book-service/payment/${token}`})
                                }
                                return res.status(404).json({error:"Not Found"})
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                    }
                    else{
                        return res.status(404).json({error:"Not Found"});
                    }
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
        
    }

    public add_address = async(req:Request , res:Response):Promise<Response> => {
        const id = parseInt(req.params.id);
        console.log("Id:"+id);
        const userId = user_id(req.cookies.helperland);
        return this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service == null){
                    return res.status(404).json({error:"NotFound"});
                }
                else{
                    const address = req.body.Street_name + " " + req.body.House_number + "," + req.body.City + " " + service.ZipCode;
                    if(req.body.Mobile == null || req.body.email == null){
                        await this.BookService
                         .findUser(+userId)
                         .then((user)=>{
                             if(user == null){
                                return res.status(404).json({error:"NotFound"});
                             }
                            else{
                                if(req.body.Mobile == null){
                                    req.body.Mobile = user.MobileNumber;
                                }
                                req.body.email = user.email;  
                            } 
                             
                         })
                         .catch((err:Error)=>{
                             console.log(err);
                             return res.status(500).json({error:"Error"});
                         })
                    }
                    return this.BookService
                    .add_address(address,req.body.City,req.body.State,service.ZipCode,req.body.Mobile,req.body.email,userId)
                    .then(address =>{
                        if(address){
                            return res.json({"address":address.AddressLine1,"Phone Number":address.Mobile,"follow":`${process.env.BASE_URL}/trainee2021/book-service/details/${id}`});
                            
                        }  
                        return res.status(404).json({error:"NotFound"});
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json({error:"Error"});
                    })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public payment = async(req:Request,res:Response):Promise<Response>=>{
        const id  = parseInt(req.params.id);
        const Cid = +user_id(req.cookies.helperland);
        return await this.BookService
            .findUserRequest(id)
            .then(async(userRequest)=>{
                if(userRequest){
                    await this.BookService
                        .findServiceRequest(id)
                        .then((serviceRequest)=>{
                            if(serviceRequest == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else{
                                serviceRequest.update({Status:1});
                                userRequest.update({Start:serviceRequest.ArrivalTime,End:serviceRequest.EndTime,Time:(serviceRequest.ExtraHours + serviceRequest.ServiceHours)});
                                console.log(userRequest);
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                    sendEmail(userRequest.email,"New Service Request",`A Service Request ${id} has been directly assigned you`)
                    return res.status(200).json(`ServiceIs:${id}`)
                }
                else{
                    return await this.BookService
                    .findServiceRequest(id)
                    .then((serviceRequest)=>{
                        if(serviceRequest == null){
                            return res.status(404).json({error:"Not Found"})
                        }
                        else{
                            serviceRequest.update({Status:1});
                            const code = serviceRequest.ZipCode;
                            return this.BookService
                                .checkPostelCode(code)
                                .then(async(user)=>{
                                    if(user.length == 0){
                                        return res.status(404).json({error:"Not Found"})
                                    }
                                    else{
                                        var count = 0;
                                        for(var i=0;i<user.length;i++){
                                            if(user[i].id != Cid){
                                                const name = user[i].FirstName + " " + user[i].LastName;
                                                const Hid = user[i].id;
                                                const email = user[i].email;
                                                this.BookService
                                                    .findfav(Hid,Cid)
                                                    .then(async(fav)=>{
                                                        if(fav){
                                                            if(fav.IsBlocked == false){
                                                                await this.BookService
                                                                    .UserRequest(+(req.params.id),Hid,name,email)
                                                                    .then(async(request)=>{
                                                                        if(request){
                                                                            count = count + 1;
                                                                            request.update({Start:serviceRequest.ArrivalTime,End:serviceRequest.EndTime,CustomerId:Cid,Time:serviceRequest.ExtraHours+serviceRequest.ServiceHours})
                                                                            sendEmail(request.email,"New Service is Arrive",`new Service ${request.ServiceId} has been arrive`);
                                                                            
                                                                        }
                                                                    })
                                                                    .catch((err:Error)=>{
                                                                        console.log(err);
                                                                        return res.status(500).json({error:"Error"})
                                                                    })
                                                            }
                                                        }
                                                    })
                                                    .catch((err:Error)=>{
                                                        console.log(err);
                                                        return res.status(500).json({error:"Error"})
                                                    })
                                            }
                                        }
                                        if(count > 0){
                                            return res.status(200).json({message:`ServiceId: ${serviceRequest.ServiceId}`})
                                        }
                                        else{
                                            return res.status(404).json({message:"Something is Wrong"});
                                        }
                                        
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"Error"})
                                })
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json({error:"Error"});
                    })
                }
               
                
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:'Error'});
            })
    }

    public verify = async(req:Request,res:Response,next:NextFunction)=>{
        const id = +user_id(req.cookies.helperland);
        this.BookService
            .findUser(id)
            .then((user)=>{
                if(user?.RoleId == 1 || user?.RoleId == 2){
                    next();
                }
                else{
                    return res.status(404).json({message:"You can not access this page"});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
    }

}

