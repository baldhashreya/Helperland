import { BookService } from "./book_service";
import { NextFunction, Request,RequestHandler,Response } from "express";
import { decrypt, encrypt, Token1, user_id } from "../User/encrypt";
import { json } from "body-parser";



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

    public ckeckAvailability = async(req:Request,res:Response):Promise<Response | undefined> =>{
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
                            const id = (service.id).toString();
                            const link = `${process.env.BASE_URL}/user/plan/${id}`;
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
    


    public Schedule_Plan = async(req:Request,res:Response)=>{
        const id = parseInt(req.params.id)
        const userid = user_id(req.cookies.helperland);
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
        await this.BookService.updateExtraService(extrahour,id)
            .then((result)=>{
                console.log(result);
            })
            .catch((err:Error)=>{
                console.log(err);
            });
        req.body.ExtraHours = (length/2);                   
        
        return this.BookService
            .findServiceRequest(id)
            .then(async(service)=>{
                if(service){
                   this.BookService
                    .updateServiceRequest(req.body,service.id)
                    .then(async(result) =>{
                        if(result == null){
                            console.log(result);
                            return res.status(201).json("something wrong");
                        }
                        else{
                            const total = (service.ServiceHours) + (service.ExtraHours);
                            const subtotalpayment = total*18;
                            var  totalpayment = 0;
                            if(service.Discount != null){
                                var Discount =((((service.Discount).split("-"))[1]))+"%";
                                const dis = Discount_list.find(o => o.value == service.Discount);
                                totalpayment = (subtotalpayment)*(dis == undefined? 1 : dis.id);
                                console.log(Discount);
                                service.Discount = Discount;
                            }
                            else{
                                totalpayment = subtotalpayment;
                                service.Discount = " ";
                            }
                            service.update({SubTotal:subtotalpayment,TotalCost:totalpayment,UserId:userid,Discount:service.Discount});
                            var  bill = {
                                "Date":service.ServiceStartDate,
                                "Arrival Time":service.ArrivalTime,
                                "Basic":service.ServiceHours + "  hours",
                                "Benifits":Service,
                                "totalhours ":total + "  hours",
                                "SubTotal":subtotalpayment,
                                "Discount":service.Discount,
                                "TotalPayment":totalpayment,
                                "follow_this_link":`${process.env.BASE_URL}/user/details/${id}`
                            };
                            return res.json(bill);
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
        return this.BookService
            .getAddress()
            .then((address)=>{
               if(address.length == 0){
                   return res.status(200).json({"message":"no data availble","link":`${process.env.BASE_URL}/user/add_user/${id}`});
               }
               else{
                   return res.status(200).json({"data":address,"choose":`enter id above one to use as default address and follow the link : ${process.env.BASE_URL}/user/add_user/${id}/Enter id:`,"add address":`${process.env.BASE_URL}/user/add_user/${id}`});
               }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public set_address = async(req:Request,res:Response):Promise<Response | any>=>{
        const token = req.params.token;
        const id = parseInt(req.params.id);
        const userid = req.cookies.helper;
        const UserId = user_id(userid);
        return this.BookService
            .getAddressById(id)
            .then((result)=>{
                if(result == null || result == undefined){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    result.update({IsDefault:true,UserId:UserId});
                    this.BookService
                        .fetch_favorite(userid)
                        .then((user)=>{
                            if(user == null){
                                const link = `${process.env.BASE_URL}/user/payment/${token}`;
                                return res.status(200).json(link);  
                            }
                            else{
                                return res.status(201).json({"Choose one:":user,"link :":`${process.env.BASE_URL}/user/favourite/${token}/Enter_id`});
                            }
                        }) 
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from set address");
            })
    }
    public set_fav = async(req:Request ,res:Response)=>{
        const token = req.params.token;
        const id = parseInt(req.params.id);
        this.BookService
            .fetch_favoriteById(id)
            .then((user)=>{
                if(user == null){
                    return res.status(200).json("Something is wrong");
                }
                else{
                    const link = `${process.env.BASE_URL}/user/payment/${token}`;
                    return res.status(200).json(link); 
                }
            })

    }

    public add_address = async(req:Request , res:Response):Promise<Response | any> => {
        const id = parseInt(req.params.id);
        const userId = user_id(req.cookies.helperland);
        if(req.body.Mobile == null){
           this.BookService
            .findUser(userId)
            .then((user)=>{
                if(user == null){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    req.body.Mobile = user.MobileNumber;
                    req.body.email = user.email;
                } 
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from UserFinding");
            })
        }
        return this.BookService
            .findServiceRequest(id)
            .then((service)=>{
                if(service == null){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    const address = req.body.Street_name + " " + req.body.House_number + "," + req.body.City + " " + service.ZipCode;
                this.BookService
                    .add_address(address,req.body.City,req.body.State,service.ZipCode,req.body.Mobile,req.body.email,id)
                    .then(address =>{
                        if(address == null){
                            return res.status(500).json("somthing wrong");
                        }  
                        else{
                            return res.json({"address":address.AddressLine1,"Phone Number":address.Mobile,"follow":`${process.env.BASE_URL}/user/details/${id}`});
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
        return this.BookService
            .findServiceRequest(id)
            .then((service)=>{
                if(service == null){
                    return res.status(401).json("something is wrong");
                }
                else{
                    const Id:number = (10001)+id;
                    service.update({ServiceId:Id});
                    return res.status(200).json({"service Id:" : Id});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from payment");
            });
    }

}

