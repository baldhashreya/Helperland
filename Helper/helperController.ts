import { NextFunction, Request, Response } from "express";
import { decrypt, encrypt, user_id } from "../User/encrypt";
import sendEmail from "../User/send-mail";
import { HelperService } from "./helperService";
import XlSX from "xlsx";

var extra = [
    {'id':'a',"name":"Clean cabinet interiors"},
    {'id':'b',"name":"Cleaning the refrigerator"},
    {'id':'c',"name":"Cleaning the oven"},
    {'id':'d',"name":"Washing and drying laundry"},
    {'id':'e',"name":"Cleaning windows"}
];

export class HelperController{
    public constructor(private readonly HelperService: HelperService) {
        this.HelperService = HelperService;
    }

    public new_Request = async(req:Request, res:Response)=>{
        const Hid = +user_id(req.cookies.helperland);
        console.log("Id:          "+Hid);
        await this.HelperService
            .findServiceId(Hid)
            .then(async(userRequest)=>{
                console.log(userRequest.length);
                if(userRequest.length == 0){
                    return res.status(201).json("No serviceRequest");
                }
                else{
                    var Data:any = [];
                    var helpername;
                    for(var z=0;z<userRequest.length;z++){
                        helpername = userRequest[z].HelperName;
                        if(userRequest[z].IsAssign == null){
                            await this.HelperService
                            .findServiceRequestById(userRequest[z].ServiceId)
                            .then(async(serviceRequest)=>{
                                if(serviceRequest == null){
                                    return res.status(404).json({error:"NotFound"});
                                }
                                const Cid = serviceRequest.UserId;
                                const Aid = serviceRequest.UserAddressId;
                                var name,Address;
                                await this.HelperService
                                    .findUser(Cid)
                                    .then((user)=>{
                                        if(user == null){
                                            return res.status(404).json({error:"Not Found"});
                                        }
                                        name = user.FirstName + " " + user.LastName;
                                    })
                                    .catch((err:Error)=>{
                                        console.log(err);
                                        return res.status(500).json({error:"Error"});
                                    })
                                await this.HelperService
                                    .getAddressById(Aid)
                                    .then((userAddresss)=>{
                                        if(userAddresss == null){
                                            return res.status(404).json({error:"not found"})
                                        }
                                        Address = userAddresss.AddressLine1;
                                    })
                                    .catch((err:Error)=>{
                                        console.log(err);
                                        return res.status(500).json({error:"Error"});
                                    });
                                Data.push({
                                    "ServiceId": userRequest[z].ServiceId,
                                    "Service Date":{
                                        "Date": serviceRequest.ServiceStartDate.getDate()+"/" + serviceRequest.ServiceStartDate.getMonth()+"/"+serviceRequest.ServiceStartDate.getFullYear(),
                                        "Duration": serviceRequest.ArrivalTime + " - " + serviceRequest.EndTime
                                    },
                                    "Customer Details":{
                                        "name": name,
                                        "Address": Address
                                    },
                                    "Payment": serviceRequest.TotalCost,
                                    "Details": `${process.env.BASE_URL}/trainee2021/sp-dashboard/Details/EnterServiceId`,
                                    "Accept": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-new-service-requests/Accept/EnterServiceId`

                                })
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                        }
                    }
                    return res.status(200).json({"Wel-come":helpername,Data,"entries Total Recode":Data.length});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status
            })
        
    }

    public Accept_Service = async(req:Request , res:Response):Promise<Response | any>=>{
        const Hid = +user_id(req.cookies.helperland);
        const serviceId = req.params.id;
        return await this.HelperService
            .findUserRequest(+serviceId)
            .then(async(userRequest)=>{
                if(userRequest == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else if(userRequest.IsAssign != null){
                    return res.status(201).json({message:"This Service request is no more availble. It has assiged to another provider"});
                }
                else{
                    var date:any,Stime:any = [],Etime:any=[],Stime1:any,Etime1:any,Sid:any;
                    var comaper = false;
                    await this.HelperService
                        .findServiceRequestById(+serviceId)
                        .then((serviceRequest)=>{
                            if(serviceRequest == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else{
                                date = serviceRequest.ServiceStartDate;
                                Sid = serviceRequest.ServiceId;
                                Stime1 = serviceRequest.ArrivalTime;
                                Etime1 = serviceRequest.EndTime;
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({err:"Error"})
                        })
                        await this.HelperService
                        .findServiceId(Hid)
                        .then(async(userRequest1)=>{
                            if(userRequest1.length == 0){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else{
                                for(var i=0;i<userRequest1.length;i++){
                                    if(userRequest1[i].IsAssign == null || userRequest1[i].IsAssign == Hid){
                                        const id = userRequest1[i].ServiceId;
                                        await this.HelperService
                                            .findServiceRequestById(id)
                                            .then((serviceRequest)=>{
                                                if(serviceRequest == null){
                                                    return res.status(404).json({error:"Not Found"});
                                                }
                                                else{
                                                    if(serviceRequest.ServiceId != Sid){
                                                        if(serviceRequest.Status == 1 || serviceRequest.Status == 2){
                                                            if(serviceRequest.ServiceStartDate.getTime() === date.getTime()){
                                                                Stime.push(serviceRequest.ArrivalTime);
                                                                Etime.push(serviceRequest.EndTime);
                                                            }  
                                                        }
                                                    }
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"Error"});
                                            })
                                    }
                                }
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                   
                     var length = Stime.length;
                     for(var i=0;i<length;i++){
                         console.log(Stime[i]);
                        const stime1 = (Stime[i].split(":"))[1] == "30" ? (+(Stime[i].split(":"))[0]) + 0.5 : (+(Stime[i].split(":"))[0]);
                        const etime1 = (Etime[i].split(":"))[1] == "30" ? (+(Etime[i].split(":"))[0]) + 0.5 : (+(Etime[i].split(":"))[0]);
                        const stime2 = (Stime1.split(":"))[1] == "30" ? (+(Stime1.split(":"))[0]) + 0.5 : (+(Stime1.split(":"))[0]);
                        const etime2 = (Etime1.split(":"))[1] == "30" ? (+(Etime1.split(":"))[0]) + 0.5 : (+(Etime1.split(":"))[0]);
                        if(stime2>= etime1+1 || etime2 <= stime1+1){
                            userRequest.update({IsAssign:Hid})
                            comaper = true;
                            break;
                        }
                    }
                     
                     if(length == 0 || comaper == true){
                        userRequest.update({IsAssign:Hid})
                        const sid = userRequest.ServiceId
                         this.HelperService
                            .findServiceRequestById(sid)
                            .then((service)=>{
                                if(service == null){
                                    return res.status(404).json({error:"Not Found"})
                                }
                                else{
                                    
                                    service.update({Status:2,SPAcceptedDate:new Date()});
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                        const Cid = userRequest.CustomerId;
                       await this.HelperService
                            .findUser(Cid)
                            .then((user)=>{
                                if(user == null){
                                    return res.status(404).json({error:"Not found"});
                                }
                                else{
                                    
                                    sendEmail(user.email,"Your Service Accept",`Your Service Request ${userRequest.ServiceId} has been Accept by ${userRequest.HelperName}`);
                                    return res.status(200).json({message:"Accept your Service"});
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                    }
                    else{
                        return res.status(201).json({message:"Another service request has already been assigned which has time overlap with this service request. You can’t pick this one"});
                    }
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            }) 
            
    }

    public Details = async(req:Request , res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        const id = req.params.id;
        return await this.HelperService
            .findServiceRequestById(+id)
            .then(async(serviceRequest)=>{
                if(serviceRequest == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    var Extra:any = [];
                    const sid = serviceRequest.id;
                    var compare;
                    await this.HelperService
                        .findUserRequest(serviceRequest.ServiceId)
                        .then((userRequest)=>{
                            if(userRequest == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else if(userRequest.IsAssign == Hid && userRequest.IsDeleted == false){
                                compare = true;
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"})
                        })
                    await this.HelperService
                        .ExtraHours(sid)
                        .then((extraService)=>{
                            if(extraService == null){
                                return res.status(401).json("Something is Wrong");
                            }
                            else{
                                const eid = extraService.ServiceExtraId;
                                for(var i=0;i<eid.length;i++){
                                    var service = extra.find((o: { id: string; }) =>o.id == eid[i]);
                                    if(service != undefined){
                                        Extra.push(service.name);
                                    }
                                }
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                    const Cid = serviceRequest.UserId;
                    const Aid = serviceRequest.UserAddressId;
                    var name,address;
                    await this.HelperService
                        .findUser(Cid)
                        .then((user)=>{
                            if(user == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            name = user.FirstName + " " + user.LastName;
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                    await this.HelperService
                        .getAddressById(Aid)
                        .then((userAddress)=>{
                            if(userAddress == null){
                                return res.status(404).json({error:"Not Found"});
                            }
                            address = userAddress.AddressLine1;
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                        var accept:any = [];
                        if(compare != true){
                            const Accept = {"Accept": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-new-service-requests/Accept/EnterServiceId`};
                            accept.push(Accept);
                        }
                        else{
                            var date = serviceRequest.ServiceStartDate;
                            var today = new Date();
                            if(date.getTime() === today.getTime()){
                                var time = (serviceRequest.EndTime.split(":"))[1] == "30" ? (+(serviceRequest.EndTime.split(":"))[0])+0.5 : (+(serviceRequest.EndTime.split(":"))[0]);
                                var t = new Date().getHours();
                                if(time<= t){
                                    const cancel ={"Complete": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/complete/enter_id`};
                                    accept.push(cancel);
                                }
                                else{
                                    const cancel ={"Cancel": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/cancle/enter_id`};
                                    accept.push(cancel);
                                }
                                 
                            }
                            else{
                                const cancel ={"Cancel": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/cancle/enter_id`};
                                accept.push(cancel);
                            }
                            
                        }
                    var data = {
                        "ServiceDate": serviceRequest.ServiceStartDate.getDate()+"/"+serviceRequest.ServiceStartDate.getMonth()+"/"+serviceRequest.ServiceStartDate.getFullYear(),
                        "Duration": serviceRequest.ArrivalTime + " - "+serviceRequest.EndTime,
                        "Total Hrs": (serviceRequest.ExtraHours)+(serviceRequest.ServiceHours),
                        "ServiceId": serviceRequest.ServiceId,
                        "Extra Service": Extra,
                        "Total Payment": serviceRequest.TotalCost,
                        "Customer":{
                            "name": name,
                            "Address": address
                        },
                        "Comments": serviceRequest.HasPets == true ? "i have pets at home" : " i do not have pets at home"
                    }
                    if(serviceRequest.Status == 3){
                        return res.status(200).json({data});
                    }
                    else{
                        return res.status(200).json({data,accept});
                    }
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public up_comnig = async(req:Request , res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        return this.HelperService
            .findServiceId(Hid)
            .then(async(userRequest)=>{
                if(userRequest.length == 0){
                    return res.status(201).json({message:"No Upcoming request"})
                }
                else{
                    var data = userRequest.filter(o => o.IsAssign == Hid && o.IsDeleted == false);
                    var Data:any = [];
                    var helprname = "WelCome, "+ data[0].HelperName;
                    for(var z=0;z<data.length;z++){
                        const Serviceid = data[z].ServiceId;
                        await this.HelperService
                            .findServiceRequestById(Serviceid)
                            .then(async(serviceRequest)=>{
                                if(serviceRequest == null){
                                    return res.status(404).json({error:"NotFound"})
                                }
                                else{
                                    if(serviceRequest.Status == 2){
                                        var name:string = "";
                                        var Address:string = "";
                                        await this.HelperService
                                            .findUser(data[z].CustomerId)
                                            .then((user)=>{
                                                if(user == null){
                                                    return res.status(404).json({error:"Not Found"})
                                                }
                                                else{
                                                    name = user.FirstName + " " + user.LastName;
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:Error});
                                            })
                                        await this.HelperService
                                            .getAddressById(serviceRequest.UserAddressId)
                                            .then((userAddress)=>{
                                                if(userAddress == null){
                                                    return res.status(404).json({error:"Not Found"});
                                                }
                                                else{
                                                    Address = userAddress.AddressLine1;
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"Error"});
                                            })
                                            var action;
                                            if(serviceRequest.ServiceStartDate.getTime() == new Date().getTime()){
                                                var t = serviceRequest.EndTime.split(":")[1] == "30" ? +(serviceRequest.EndTime.split(":")[0]) + 0.5 : +(serviceRequest.EndTime.split(":")[0]);
                                                if(t<= new Date().getHours()){
                                                    action = {"Complete": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/complete/enter_id`}
                                                }
                                                else{
                                                    action = {"Cancle": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/cancel/enter_id`}
                                                }
    
                                            }
                                            else{
                                                action = {"Cancle": `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-upcoming-requests/cancel/enter_id`}
                                            }
                                        Data.push({
                                            "ServiceId": data[z].ServiceId,
                                            "Service details": {
                                                "Service Date": serviceRequest.ServiceStartDate.getDate() + "/"+serviceRequest.ServiceStartDate.getMonth()+"/"+serviceRequest.ServiceStartDate.getFullYear(),
                                                "Duration": serviceRequest.ArrivalTime +" - "+ serviceRequest.EndTime
                                            },
                                            "Customer Details":{
                                                "name": name,
                                                "Address": Address
                                            },
                                            "Payment": serviceRequest.TotalCost,
                                            "Action": action
                                        })  
                                    }
                                    
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"});
                            })
                    }
                    var length = "Entries total Recode: "+ Data.length;
                    return res.status(200).json({helprname,Data,"entries Total Recode":Data.length});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public complete = async(req:Request , res:Response):Promise<Response>=>{
        var id = req.params.id;
        return this.HelperService
            .findServiceRequestById(+id)
            .then((serviceRequest)=>{
                if(serviceRequest == null){
                    return res.status(404).json({error:"Not Found"})
                }
                else{
                    if(serviceRequest.Status == 2){
                        // if(serviceRequest.ServiceStartDate.getTime() == new Date().getTime()){
                    //     var time = serviceRequest.EndTime.split(":")[1] == "30" ? (+serviceRequest.EndTime.split(":")[0])+0.5 : (serviceRequest.EndTime.split(":")[0]);
                    //     if(time <= new Date().getTime()){
                    //         serviceRequest.update({Status:3});
                    //         return res.status(200).json({message:"Complete the Service"});
                    //     }
                    //     else{
                    //         return res.status(201).json({message:"You can not Set the Complete this Service"})
                    //     }
                    // }
                    // else{
                    //     return res.status(201).json({message:"You can not Set the Complete this Service"})
                    // }
                    serviceRequest.update({Status:3});
                    return res.status(200).json({message:"Complete the Service"});
                    }
                    else{
                        return res.status(201).json({message:"You can not Set the Complete this Service"})
                    }
                    

                }
                
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public cancel = async(req:Request , res:Response):Promise<Response> =>{
        const id = +req.params.id;
        return this.HelperService
            .findUserRequest(id)
            .then(async(userRequest)=>{
                if(userRequest == null){
                    return res.status(404).json({error:"Not Found"})
                }
                else{
                    const Cid = userRequest.CustomerId;
                    await this.HelperService
                        .findUser(Cid)
                        .then((user)=>{
                            if(user == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else{
                                const email = user.email;
                                sendEmail(email,"Service Cancel",`Your Service Request ${id} has been cancel by the service Provider`);
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"})
                        })
                    
                    return await this.HelperService
                        .findServiceRequestById(userRequest.ServiceId)
                        .then((serviceRequest)=>{
                            if(serviceRequest == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else if(serviceRequest.Status == 3){
                                return res.status(201).json({error:"you can not cancel the service while completing service"});
                            }
                            else if(serviceRequest.Status == 1){
                                return res.status(201).json({error:"You can not cancel the sarvice Request"})
                            }
                            else{
                                serviceRequest.update({Status:4});
                                return res.status(200).json({message:"cancle the Service request"});
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
                return res.status(500).json({error:"Error"})
            })
    }

    public Service_history = async(req:Request , res:Response):Promise<Response>=>{
        const Hid = user_id(req.cookies.helperland);
        return await this.HelperService
            .findServiceId(+Hid)
            .then(async(userRequest)=>{
                if(userRequest.length == 0){
                    return res.status(404).json({message:"No Data"})
                }
                else{
                    var Data:any = []
                    console.log("length:"+userRequest.length);
                    for(var i=0;i<userRequest.length;i++){
                        var id,date:any,Stime,Etime,Aid:any;
                       
                        await this.HelperService
                            .findServiceRequestById(userRequest[i].ServiceId)
                            .then(async(serviceRequest)=>{
                                if(serviceRequest == null){
                                    return res.status(404).json({error:"1Not Found"})
                                }
                                else if(serviceRequest.Status == 3){
                                    var name, Address;
                                    id = serviceRequest.ServiceId;
                                    date = serviceRequest.ServiceStartDate,
                                    Stime = serviceRequest.ArrivalTime,
                                    Etime = serviceRequest.EndTime
                                    Aid = serviceRequest.UserAddressId
                                        await this.HelperService
                                            .findUser(userRequest[i].CustomerId)
                                            .then((user)=>{
                                                if(user){
                                                    name = user.FirstName + " " + user.LastName
                                                }
                                                else{
                                                    return res.status(404).json({error:"2Not Found"})
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"2Error"});
                                            })
                                        console.log(`Address:${Aid}`);
                                        await this.HelperService
                                            .getAddressById(Aid)
                                            .then((userAddress)=>{
                                                if(userAddress == null){
                                                    return res.status(404).json({error:"3Not Found"})
                                                }
                                                else{
                                                    Address = userAddress.AddressLine1
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"3Error"})
                                            })
                                            Data.push({
                                                "ServiceId": id,
                                                "ServiceDate": date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear(),
                                                "ServiceDuration": Stime +" - "+Etime,
                                                "CustomerName": name,
                                                "CustomerAddress": Address
                                            })

                                }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"1Error"});
                                })
                    }
                   
                    const link = `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-service-history/export`
                    return res.status(200).json({Data,link});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({err:Error});
            })

    }

    public export = async(req:Request,res:Response):Promise<Response>=>{
        var service:any = {};
        const Hid = user_id(req.cookies.helperland);
        return await this.HelperService
            .findServiceId(+Hid)
            .then(async(userRequest)=>{
                if(userRequest.length == 0){
                    return res.status(404).json({message:"No Data"})
                }
                else{
                    var Data:any = []
                    console.log("length:"+userRequest.length);
                    for(var i=0;i<userRequest.length;i++){
                        var id,date:any,Stime,Etime,Aid:any;
                       
                        await this.HelperService
                            .findServiceRequestById(userRequest[i].ServiceId)
                            .then(async(serviceRequest)=>{
                                if(serviceRequest == null){
                                    return res.status(404).json({error:"1Not Found"})
                                }
                                else if(serviceRequest.Status == 3){
                                    var name, Address;
                                    id = serviceRequest.ServiceId;
                                    date = serviceRequest.ServiceStartDate,
                                    Stime = serviceRequest.ArrivalTime,
                                    Etime = serviceRequest.EndTime
                                    Aid = serviceRequest.UserAddressId
                                        await this.HelperService
                                            .findUser(userRequest[i].CustomerId)
                                            .then((user)=>{
                                                if(user){
                                                    name = user.FirstName + " " + user.LastName
                                                }
                                                else{
                                                    return res.status(404).json({error:"2Not Found"})
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"2Error"});
                                            })
                                        console.log(`Address:${Aid}`);
                                        await this.HelperService
                                            .getAddressById(Aid)
                                            .then((userAddress)=>{
                                                if(userAddress == null){
                                                    return res.status(404).json({error:"3Not Found"})
                                                }
                                                else{
                                                    Address = userAddress.AddressLine1
                                                }
                                            })
                                            .catch((err:Error)=>{
                                                console.log(err);
                                                return res.status(500).json({error:"3Error"})
                                            })
                                            Data.push({
                                                "ServiceId": id,
                                                "ServiceDate": date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear(),
                                                "ServiceDuration": Stime +" - "+Etime,
                                                "CustomerName": name,
                                                "CustomerAddress": Address
                                            })

                                }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"1Error"});
                                })
                    }
                    
                    service = Data;
                    console.log(service);
                    const worksheet = XlSX.utils.json_to_sheet(service);
                    const workbook = XlSX.utils.book_new();
                    XlSX.utils.book_append_sheet(workbook,worksheet,"ServiceHistory");
                    XlSX.write(workbook,{bookType:'xlsx',type:"buffer"});
                    XlSX.write(workbook,{bookType:"xlsx",type:"binary"});
                    XlSX.writeFile(workbook,"History.xlsx");
                    return res.json({message:"Check Your File"});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({err:Error});
            })
        
    }

    public rating = async(req:Request,res:Response):Promise<Response>=>{
       const Hid = +user_id(req.cookies.helperland);
       return await this.HelperService
        .ratingfromuser(Hid)
        .then(async(rating)=>{
            if(rating.length == 0){
                return res.status(404).json({message:"Not Rating"});
            }
            else{
                var Data:any = [];
                for(var i=0;i<rating.length;i++){
                    const rate = (((+rating[i].OnTimeArrival)+(+rating[i].Friendlly)+(+rating[i].QualityOfService))/3).toFixed(2);
                    const Comments = rating[i].Comments;
                    const id = rating[i].UserRequestId;
                    await this.HelperService
                        .finduserRequest(id)
                        .then(async(userRequest)=>{
                            if(userRequest == null){
                                return res.status(404).json({error:"Not Found"});
                            }
                            else{
                                var name="";
                               await this.HelperService
                                    .findUser(userRequest.CustomerId)
                                    .then((user)=>{
                                        if(user == null){
                                            return res.status(404).json({error:"Not Found"})
                                        }
                                        else{
                                            name = user.FirstName + " " + user.LastName;
                                        }
                                    })
                                    .catch((err:Error)=>{
                                        console.log(err);
                                        return res.status(500).json({error:"Error"});
                                    })
                                await this.HelperService
                                    .findServiceRequestById(userRequest.ServiceId)
                                    .then((serviceRequest)=>{
                                        if(serviceRequest == null){
                                            return res.status(404).json({error:"Not Found"})
                                        }
                                        else{
                                            Data.push({
                                                "ServiceId": userRequest.ServiceId,
                                                "name": name,
                                                "Service Date": serviceRequest.ServiceStartDate.getDate() +"/"+serviceRequest.ServiceStartDate.getMonth()+"/"+serviceRequest.ServiceStartDate.getFullYear(),
                                                "Duration": serviceRequest.ArrivalTime + " - " + serviceRequest.EndTime,
                                                "Ratings": rate,
                                                "Comments": Comments
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
                            return res.status(500).json({error:"Error"});
                        })
                }
                return res.json(Data);
            }
        })
        .catch((err:Error)=>{
            console.log(err);
            return res.status(500).json({error:"Error"});
        })
    }

    public mysetting = async(req:Request,res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        return await this.HelperService
            .findUser(Hid)
            .then(async(user)=>{
                if(user){
                    var street,House_number,postelcode,city
                   await this.HelperService
                        .check_address(Hid)
                        .then((userAddress)=>{
                            if(userAddress){
                                var address = userAddress.AddressLine1.split(",");
                                var address1 = (address[0].split(" ")).length;
                                if(address1 == 3){
                                    street = (address[0].split(" "))[0] + " " + (address[0].split(" "))[1];
                                    House_number = (address[0].split(" "))[2];
                                }
                                else{
                                    street = (address[0].split(" "))[0];
                                    House_number = (address[0].split(" "))[1];
                                }
                                postelcode = (address[1].split(" "))[1];
                                city = (address[1].split(" "))[0];

                            } 
                            else{
                                street = " ";
                                House_number = " ";
                                postelcode = " ";
                                city = " ";
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err)
                            return res.status(500).json({err:"Error"});
                        })
                       var Data = {
                            "FirstName": user.FirstName,
                            "LastName": user.LastName,
                            "email": user.email,
                            "MobileNumber": user.MobileNumber,
                            "Date_Of_Birth": user.Date_Of_Birth,
                            "NationalityId": user.NationalityId,
                            "Gender": user.Gender,
                            "User_Profile_Picture": user.User_Profile_Picture,
                            "street": street,
                            "House_number": House_number,
                            "PostelCode": postelcode,
                            "City": city
                        }
                    return res.status(200).json({ Data})
                }
                return res.status(404).json({error:"Not Found"});
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public mysetting_update = async(req:Request,res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        const City = req.body.City;
        const code = req.body.PostelCode;
        req.body.Zipcode = req.body.PostelCode;
        await this.HelperService
            .findCity(City)
            .then(async(city)=>{    
                if(city){
                    await this.HelperService
                        .findZipCode(code)
                        .then((zipcode)=>{
                            if(zipcode == null){
                                this.HelperService
                                    .createZipCode(code)
                                    .then((postel_code)=>{
                                        if(postel_code == null){
                                            return res.status(400).json({error:"Not Found"})
                                        } 
                                        postel_code.update({CityId:city.id})
                                    })
                                    .catch((err:Error)=>{
                                        console.log(err);
                                        return res.status(500).json({error:"Error"})
                                    })
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:Error})
                        })
                }
                else{
                    await this.HelperService
                        .createCity(City)
                        .then(async(city)=>{
                            await this.HelperService
                                .createZipCode(code)
                                .then((zipcode)=>{
                                    if(zipcode){
                                        zipcode.update({CityId:city.id})
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"Error"})
                                })
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                }
            })
            .catch((err:Error)=>{
                return res.status(500).json({error:"Error"})
            })
        
        return this.HelperService
            .update_setting(req.body,Hid)
            .then(async(user)=>{
                if(user){
                    req.body.AddressLine1 = req.body.street+" "+req.body.House_number +","+ req.body.City + " " + req.body.PostelCode;
                   return await this.HelperService
                        .check_address(Hid)
                        .then(async(address)=>{
                            if(address){
                                return await this.HelperService
                                    .update_address(req.body,Hid)
                                    .then((userAddress)=>{
                                        if(userAddress){
                                            return res.status(200).json({userAddress})
                                        }
                                        else{
                                            return res.status(404).json({error:"Not Found"})
                                        }
                                    })
                                    .catch((err:Error)=>{
                                        console.log(err);
                                        return res.status(500).json({error:"Error"});
                                    })
                            }
                            else{
                               return await  this.HelperService
                                    .add_address(req.body)
                                    .then((userAddress)=>{
                                        if(userAddress){
                                            userAddress.update({UserId:Hid})
                                            return res.status(200).json({message:"update"})
                                        }
                                        else{
                                            return res.status(404).json({error:"Not Found"})
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
                            return res.status(500).json({error:"Error"})
                        })
                    
                }
                return res.status(400).json({error:'Not Found'});
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
    }

    public PassWord = async(req:Request , res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.HelperService
            .findUser(+id)
            .then(async(user)=>{
                if(user == null){
                    return res.json(404).json({error:"Not Found"});
                }
                else{
                    const pass:string = req.body.Password;
                    const compare = await decrypt(pass,user.Password);
                    if(compare == false){
                        return res.status(400).json({message:"Old Password Incorrect"})
                    }
                    else{
                        const newPass = await encrypt(req.body.NewPassword);
                        user.update({Password:newPass});
                        return res.status(200).json({message:"Update PassWord"});
                    }
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public block_customer_Page = async(req:Request,res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        var id = [];
      return  await this.HelperService
            .findServiceId(Hid)
            .then(async(userRequest)=>{
                if(userRequest.length == 0){
                    return res.status(400).json({error:"Not Found"})
                }
                else{
                    var Data:any = [];
                    for(var i=0;i<userRequest.length;i++){
                        const Cid = userRequest[i].CustomerId;
                        var name:string;
                        await this.HelperService
                            .findUser(Cid)
                            .then((user)=>{
                              if(user == null){
                                  return res.status(400).json({error:"Not Found"})
                              }
                              else{
                                  name = user.FirstName + " " + user.LastName;
                              }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"Error"})
                            })
                            const n = Data.find((o:any) => o.Name == name)
                            var link;
                            if(n === undefined){
                                await this.HelperService
                                .findfav(Hid,Cid)
                                .then((fav)=>{
                                    if(fav){
                                        if(fav.IsBlocked == true){
                                            link = `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-block-customer/unblock/:enterid`;
                                            Data.push({
                                                "Name": name,
                                                "UnBlock": link,
                                                "id": Cid
                                            })
                                        }
                                        else{
                                            link = `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-block-customer/block/:enterid`;
                                            Data.push({
                                                "Name": name,
                                                "Block": link,
                                                "id": Cid
                                            })
                                        }
                                    }
                                    else{
                                        this.HelperService
                                            .createfav(Hid,Cid)
                                            .then((Cfav)=>{
                                                if(Cfav){
                                                    link = `${process.env.BASE_URL}/trainee2021/sp-dashboard/sp-block-customer/block/:enterid`;
                                                    Data.push({
                                                        "Name": name,
                                                        "UnBlock": link,
                                                        "id": Cid
                                                    })
                                                }
                                                else{
                                                    return res.status(400).json({error:"Not Found"})
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
                        
                    }
                    return res.json({Data})
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public block_customer = async(req:Request,res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        const Cid = req.params.id;
        return await this.HelperService
            .findfav(Hid,+Cid)
            .then(async(fav)=>{
                if(fav == null){
                   return  await this.HelperService
                        .createfav(Hid,+Cid)
                        .then((fetch_fav)=>{
                            if(fetch_fav){
                                fetch_fav.update({IsBlocked:true})
                                return res.status(200).json({message:"Update"});
                            }
                            return res.status(404).json({error:"Not Found"});
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                }
                else{
                    fav.update({IsBlocked:true});
                    return res.status(200).json({message:"Update"});
                    
                }
                
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public Unblock_customer = async(req:Request,res:Response):Promise<Response>=>{
        const Hid = +user_id(req.cookies.helperland);
        const Cid = req.params.id;
        return this.HelperService
            .findfav(Hid,+Cid)
            .then((fav)=>{
                if(fav){
                    fav.update({IsBlocked:false});
                    return res.status(200).json({message:"Update"});
                }
                return res.status(404).json({error:"Not Found"});
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }




    public Verify = async(req:Request,res:Response,next:NextFunction)=>{
        const id = +user_id(req.cookies.helperland);
        this.HelperService
            .findUser(id)
            .then((user)=>{
                if(user == null){
                    return res.status(404).json({message:"Not Found"})
                }
                else if(user.RoleId == 1 || user.RoleId == 3){
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