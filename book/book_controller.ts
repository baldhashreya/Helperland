import { BookService } from "./book_service";
import e, {  Request,Response } from "express";
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

    public ckeckAvailability = async(req:Request,res:Response):Promise<Response> =>{
        return  this.BookService
        .checkPostelCode(req.body.postelcode)
        .then((user)=>{
            if(user == null || user.length == 0 || user == undefined){
                return res.status(404).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
            }
            else{
                var t = user.find(o => (o.IsApprove == true && o.RoleId == 3));
                if(t == undefined){
                    return res.status(404).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
                }
                else{
                   
                  return  this.BookService
                    .createServiceRequest(req.body.postelcode)
                    .then((service)=>{
                        if(service == null){
                            return res.status(404).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");  
                        }
                        else{
                            console.log(service);
                            const Id:number = (+service.id) + 1000;
                            service.update({ServiceId:Id})
                            const id = (service.id);
                            const link = `${process.env.BASE_URL}/trainee2021/book-service/plan/${Id}`;
                            return res.status(200).json( link );
                        } 
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json("Error from createServiceRequest");
                    });
                }
               
            }
        })
        .catch((err:Error)=>{
            console.log(err);
            return res.status(500).json("Error from ckeckAvailability");
        });
    }
    


    public Schedule_Plan = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id)
        const userid = user_id(req.cookies.helperland);
        console.log("Userid:"+userid);
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
            "Date":req.body.ServiceStartDate,
            "Arrival Time":req.body.ArrivalTime,
            "Basic":req.body.ServiceHours + "  hours",
            "Benifits":Service,
            "totalhours ":total + "  hours",
            "SubTotal":subtotalpayment,
            "Discount":req.body.Discount,
            "TotalPayment":totalpayment,
            "follow_this_link":`${process.env.BASE_URL}/trainee2021/book-service/details/${id}`
        };                
        return this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service){
                  return this.BookService
                    .updateServiceRequest(req.body,service.id)
                    .then(async(result) =>{
                        if(result == null){
                            console.log(result);
                            return res.status(201).json("something wrong");
                        }
                        else{
                            await service.update({SubTotal:subtotalpayment,TotalCost:totalpayment,UserId:userid,Discount:req.body.Discount});
                            await this.BookService
                                .updateExtraService(extrahour,service.id)
                                .then((result)=>{
                                    if(result == null){
                                        return res.status(401).json("Something is Wrong");
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
                    return res.status(201).json("Something is Wrong");
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
                if(address == null){
                    return res.status(401).json("Something Wrong");
                }
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
                return res.status(500).json("Error");
            })
    }

    public set_address = async(req:Request,res:Response):Promise<Response>=>{
        const token = req.params.token;
        const id = parseInt(req.params.id);
        console.log(req.cookies.helperland);
        const userid = req.cookies.helperland;
        const userId = await user_id(userid);
        console.log('ID:'+userId);
        return this.BookService
            .getAddressById(id)
            .then((result)=>{
                if(result == null || result == undefined){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    result.update({UserId:parseInt(userId)});
                    this.BookService
                    .findServiceRequest(parseInt(token))
                    .then((user)=>{
                        if(user == null){
                            return res.status(401).json("Something Wrong");
                        }
                        else{
                            user.update({UserAddressId:result.id});
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json("Error for set up user address id");
                    })
                    const link = `${process.env.BASE_URL}/trainee2021/book-service/set-fev/${token}`;
                    return res.status(200).json(link);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from set address");
            })
    }
    public set_fav = async(req:Request ,res:Response):Promise<Response>=>{
        const token = req.params.id;
        const Id = user_id(req.cookies.helperland)
        return this.BookService
            .fetch_favorite(Id)
            .then(async(user)=>{
                if(user == null){
                    return res.status(200).json("Something is wrong");
                }
                else{
                    var data:any = [];
                    for(var i=0;i<user.length;i++){
                        const id = user[i].TargetUserId;
                        await this.BookService
                            .findUser(+id)
                            .then((user)=>{
                                if(user == null){
                                    return res.status(401).json("Something is Wrong");
                                    
                                }
                                else{
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
                   return res.status(200).json(data); 
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
        return this.BookService
            .findServiceRequest(+token)
            .then(async(servicerequest)=>{
                if(servicerequest == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    const serviceid = servicerequest.ServiceId;
                    var name = "" ;
                    var email = "" ;
                    await this.BookService
                        .findUser(+id)
                        .then((user)=>{
                            if(user == null){
                                return res.status(401).json("Something is Wrong");
                            }
                            else{
                                name = user.FirstName + " "+ user.LastName;
                            }
                        })
                        .catch((err:Error)=>{
                            console.log((err));
                            return res.status(500).json("Error");
                        })
                    await this.BookService
                        .findUser(Cid)
                        .then((user)=>{
                            if(user == null){
                                return res.status(401).json("Somethig is Wrong");
                            }
                            else{
                                email = user.email;
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                    return await this.BookService
                        .UserRequest(serviceid,+id,name,email)
                        .then((userRequest)=>{
                            if(userRequest == null){
                                return res.status(401).json("Something is Wrong")
                            }
                            else{
                                return res.status(200).json({"payment":`${process.env.BASE_URL}/trainee2021/book-service/payment/${token}`});
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public add_address = async(req:Request , res:Response):Promise<Response> => {
        const id = parseInt(req.params.id);
        const user = req.cookies.helperland;
        const userId = user_id(user);
        return this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service == null){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    const address = req.body.Street_name + " " + req.body.House_number + "," + req.body.City + " " + service.ZipCode;
                    if(req.body.Mobile == null || req.body.email == null){
                        await this.BookService
                         .findUser(userId)
                         .then((user)=>{
                             if(user == null){
                                 return res.status(201).json("Something is Wrong");
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
                             return res.status(500).json("Error from UserFinding");
                         })
                    }
                    return this.BookService
                    .add_address(address,req.body.City,req.body.State,service.ZipCode,req.body.Mobile,req.body.email,userId)
                    .then(address =>{
                        if(address == null){
                            return res.status(500).json("somthing wrong");
                        }  
                        else{
                            return res.json({"address":address.AddressLine1,"Phone Number":address.Mobile,"follow":`${process.env.BASE_URL}/trainee2021/book-service/details/${id}`});
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json("Error");
                    })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public payment = async(req:Request,res:Response):Promise<Response> =>{
        const id  = parseInt(req.params.id);
        console.log(id);
        return  this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service == null){
                    return res.status(401).json("0something is wrong");
                }
                else{
                    service.update({Status:1});
                    const Id = service.ServiceId;
                    console.log("Id: "+Id);
                   return await this.BookService
                        .findheper(Id)
                        .then((userRequest)=>{
                            if(userRequest == null){
                                console.log(userRequest);
                                const zipcode = service.ZipCode;
                                return this.BookService
                                .checkPostelCode(zipcode)
                                .then(async(user)=>{
                                    if(user == null || user.length == 0){
                                        return res.status(401).json("2Something is Wrong");
                                    }
                                    else{
                                        const j:number = user.length;
                                        for(var i = 0; i<j ; i++){
                                            const email = user[i].email;
                                            const id = user[i].id;
                                            const serviceid = +req.params.id;
                                            const name = user[i].FirstName + " " + user[i].LastName;
                                            await this.BookService
                                                    .UserRequest(serviceid,id,name,email)
                                                    .then(User =>{
                                                        if(User == null){
                                                            return res.status(401).json("3Something is Wrong");
                                                        }
                                                    })
                                                    .catch((err:Error)=>{
                                                        console.log(err);
                                                        return res.status(500).json("Error");
                                                    })
                                            sendEmail(email,"New Service",`New Service Request has Arrive in id: ${req.params.id}`);
                                            
                                        }
                                        return res.json("Service id: "+ req.params.id);
                                    }
                                })
                                .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json("Error");
                                })
                            }
                            else if(userRequest.ServiceId == Id){
                                sendEmail(userRequest.email,"New Service",`A service request ${id} has been directly assigned to you`);
                                return res.json("ServiceId:"+Id);
                            }
                            else{
                                return res.status(401).json("Something is Wrong");
                            }
                            
                        })
                       .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from payment");
            });
    }

}

