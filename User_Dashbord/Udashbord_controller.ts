import { Udashbord_service } from "./Udashbord_service";
import {  NextFunction, Request, Response } from "express";
import { decrypt, encrypt, Token1, user_id } from "../User/encrypt";
import XlSX from "xlsx";
import sendEmail from "../User/send-mail";

var extra = [
    {'id':'a',"name":"Clean cabinet interiors"},
    {'id':'b',"name":"Cleaning the refrigerator"},
    {'id':'c',"name":"Cleaning the oven"},
    {'id':'d',"name":"Washing and drying laundry"},
    {'id':'e',"name":"Cleaning windows"}
];

export class Udashbord{
    public constructor(private readonly Udashbord_service: Udashbord_service) {
        this.Udashbord_service = Udashbord_service;
    }

    public dashboard = async(req:Request,res:Response):Promise<Response>=>{
        const CId = user_id(req.cookies.helperland)
        return this.Udashbord_service
            .showServiceRequest(CId)
            .then(async(serviceRequest)=>{
                if(serviceRequest.length == 0){
                    return res.status(404).json({error:"1Not Found"});
                }
                else{
                    var Details:any = [];
                    var rating = 0;
                    var name:any ;
                    for(var z = 0;z<serviceRequest.length;z++){
                        if(serviceRequest[z].Status == 1 || serviceRequest[z].Status == 2){
                            const serviceId:number = +(serviceRequest[z].ServiceId);
                            await this.Udashbord_service
                            .userRequestByServiceid(serviceId)
                            .then(async(userRequest)=>{
                                if(userRequest.length == 0){
                                    return res.status(404).json({error:"2Not Found"});
                                }
                                else{
                                   
                                    for(var y= 0; y<userRequest.length; y++){
                                        if(userRequest[y].HelperName != null && userRequest[y].IsAssign !=null){
                                            const hid = userRequest[y].UserId;
                                            await this.Udashbord_service
                                                .rating(CId,hid)
                                                .then((rate)=>{
                                                    if(rate == null){
                                                        rating = 0;
                                                    }
                                                    else{
                                                        rating = rate.Ratings
                                                    }
                                                })
                                                .catch((err:Error)=>{
                                                    console.log(err);
                                                    return res.status(500).json({error:"1Error"});
                                                })
                                            name = {
                                                "HelperName":userRequest[y].HelperName,
                                                "Rating":rating
                                            }
                                        }
                                        else{
                                            name = {
                                                "HelperName":"",
                                                "Rating":""
                                            }
                                        }
                                    }
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json({error:"2Error"})
                            })
                            Details.push({
                                "ServiceId": serviceRequest[z].ServiceId,
                                "Service Date": serviceRequest[z].ServiceStartDate.getDate() + "/" + serviceRequest[z].ServiceStartDate.getMonth() + "/" + serviceRequest[z].ServiceStartDate.getFullYear(),
                                "Duration": serviceRequest[z].ArrivalTime +" - " + serviceRequest[z].EndTime,
                                "Service Provider":name,
                                "Payment": serviceRequest[z].TotalCost,
                                "Action": {
                                    "Reschedule": ` ${process.env.BASE_URL}/trainee2021/customer/servicerequest/reschedule/:enterid`,
                                    "Cancel":` ${process.env.BASE_URL}/trainee2021/customer/servicerequest/cancel/:enterid`,
                                    "Details": `${process.env.BASE_URl}/trainee2021/customer/servicerequest/service-details/:enterid`   
                                }
                            })
                        }                        
                    }
                    return res.json(Details);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"3Error"})
            })
    };

    public reSchedule = async(req:Request,res:Response):Promise<Response>=>{
        const reschedule_id : number = parseInt(req.params.id);
        const date1 = (req.body.date).split("-");
        const date = new Date(date1[2],date1[1],date1[0]);
        req.body.ServiceStartDate = date;
        return await this.Udashbord_service
            .updateServicebyUser(reschedule_id,req.body)
            .then((serviceRequest)=>{
                if(serviceRequest){
                    return this.Udashbord_service
                        .findServicebyUser(reschedule_id)
                        .then(async(service)=>{
                            if(service == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            const Time = (service.ServiceHours);
                            const ExtraTime = (service.ExtraHours);
                            const Arrival = ((service.ArrivalTime).split(':'))
                            const total = ((Time+ExtraTime).toString()).split('.');
                            var time:string ;
                            if(Arrival[1] == "30"){
                                if(total[1] == '5'){
                                    time = (((+Arrival[0])+(+total[0])+1).toString())+":00";
                                }
                                else{
                                    time = (((+Arrival[0])+(+total[0])).toString())+":30";
                                }
                            }
                            else{
                                if(total[1] == '5'){
                                    time = (((+Arrival[0])+(+total[0])).toString())+":30";
                                }
                                else{
                                    time = (((+Arrival[0])+(+total[0])).toString())+":00";
                                } 
                            }
                            service.update({EndTime:time});
                            return await this.Udashbord_service
                                .userRequestByServiceid(service.ServiceId)
                                .then((user)=>{
                                    if(user.length == 0){
                                        return res.status(401).json("2Something is Wrong");
                                    }
                                    else{
                                        for(var i =0;i<user.length;i++){
                                            user[i].update({
                                                Start:service.ArrivalTime,
                                                End:service.EndTime,
                                                Time:(service.ServiceHours)+(service.ExtraHours)
                                            })
                                            sendEmail(user[i].email,"ReSchedule",`Service Request ${user[i].ServiceId} has been rescheduled by customer. new date ${req.body.date} and time ${user[i].Start}`);
                                        }
                                        return res.status(200).json("Update");
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json({error:"Error"})
                                })
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"})
                        })
                    
                }
                return res.status(404).json({error:"Not Found"});
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
        
    }

    public CancelService = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id);
        return this.Udashbord_service
            .userRequest(id)
            .then(async(user)=>{
                if(user.length == 0){
                    return res.status(404).json({error:"Not Found"});
                }
                const length = user.length;
                const j = user.find(o => o.IsAssign != null);
                if(j != undefined){
                    j.update({IsDeleted:true});
                    sendEmail(j.email,"Cancele the Service",`Service Request ${id} has been cancelled by customer`)
                }
                else{
                    for(var i= 0;i<length ; i++){
                        user[i].update({IsDeleted:true})
                        sendEmail(user[i].email,"Cancele the Service",`Service Request ${id} has been cancelled by customer`)
                    }  
                }
                await this.Udashbord_service
                    .findServicebyUser(id)
                    .then((user)=>{
                        if(user == null){
                            return res.status(404).json({error:"Not Found"});
                        }
                        else{
                            user.update({Status:4}); 
                        }
                    })
                    .catch((err:Error)=>{
                        console.log((err));
                        return res.status(500).json({error:"Error"});
                    })
                return res.status(200).json("Service Cancle");
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public ServiceDetails = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id);
        return this.Udashbord_service
            .findServicebyUser(id)
            .then(async(service)=>{
                if(service == null){
                    return res.status(404).json({error:"NotFound"});
                }
                else{
                    var ExtraHours:string = "";
                    var ServiceDetails:Object = {};
                    var pet:string = "";
                    if(service.HasPets == true ){
                        pet = "I have pets";
                    }
                    else{
                        pet = "I don't have pets";
                    }
                    await this.Udashbord_service
                        .findServiceExtraById(service.id)
                        .then((service)=>{
                            if(service == null){
                                return res.status(404).json({error:"NotFound"});
                            }
                            else{
                                const id = service.ServiceExtraId;
                                console.log("id: "+id);
                                for(var i:number = 0;i<id.length;i++){
                                    var j = extra.find(o => id[0] == o.id);
                                   if(j!=undefined){
                                       ExtraHours += j.name +",";
                                   }

                                }
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        })
                        const useraddressId = service.UserAddressId;
                        await this.Udashbord_service
                        .getAddressById(useraddressId)
                        .then((Result)=>{
                           if(Result == null){
                            return res.status(404).json({error:"NotFound"});
                           }
                           else{
                            const serviceAddress = Result.AddressLine1;
                             ServiceDetails = {
                                "Date":service.ServiceStartDate.getDate()+"/"+service.ServiceStartDate.getMonth()+"/"+service.ServiceStartDate.getFullYear(),
                                "Duration":service.ArrivalTime +" - " + service.EndTime ,
                                "Duration_hours": (service.ServiceHours + service.ExtraHours),
                                "Service_id":service.ServiceId,
                                "Extra":ExtraHours,
                                "NetAmount":service.TotalCost,
                                "ServiceAddress":serviceAddress,
                                "Phone":Result.Mobile,
                                "Email":Result.Email,
                                "Would you like to tell your helper something?":pet,
                                "Reschedule": ` ${process.env.BASE_URL}/trainee2021/customer/servicerequest/reschedule/:enterid`,
                                "Cancel":` ${process.env.BASE_URL}/trainee2021/customer/servicerequest/cancel/:enterid`
                            }

                           }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({error:"Error"});
                        });
                    return res.status(200).json(ServiceDetails);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public Service_History = async(req:Request,res:Response):Promise<Response>=>{
        const Cid = (parseInt(user_id(req.cookies.helperland)));
        return await this.Udashbord_service
            .showService(Cid)
            .then(async(service)=>{
                if(service.length == 0){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    const length = service.length;
                    var ServiceHistory = [];
                    
                    for(var i = 0;i<length; i++){
                        if(service[i].Status == 1 || service[i].Status == 2){
                        }
                        else{
                            var j:number = -1;
                            var name:any = [];
                            var Rate:any = []
                            var k:number = -1;
                            if(service[i].Status == 3){
                                const id = service[i].ServiceId;
                                await this.Udashbord_service
                                    .userRequestByServiceid(id)
                                    .then(async(userRequest)=>{
                                        if(userRequest.length == 0){
                                            return res.status(404).json({error:"Not Found"})
                                        }
                                        else{
                                            const Hid = userRequest[0].UserId;
                                            const Cid = userRequest[0].CustomerId;
                                            name[++j] = userRequest[0].HelperName;
                                            await this.Udashbord_service
                                                .rating(Cid,Hid)
                                                .then((Rating)=>{
                                                    if(Rating == null){
                                                        Rate[++k] = 0;
                                                    }
                                                    else{
                                                        Rate[++k] = Rating.Ratings;
                                                        
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
                            else{
                                name[++j] = "";
                                Rate[++k] = 0;
                            }                           
                            
                            ServiceHistory.push({
                            "ServiceId":service[i].ServiceId,
                            "ServiceDate":service[i].ServiceStartDate.getDate() + "/" + service[i].ServiceStartDate.getMonth() +"/" + service[i].ServiceStartDate.getFullYear(),
                            "Duaration":service[i].ArrivalTime + " - " + service[i].EndTime,
                            "ServiceProvider":name[i],
                            "ServiceProvider Rating":Rate[i],
                            "Payment":service[i].TotalCost,
                            "Status":service[i].Status == 3 ? "Completed" : "Cancelled",
                            "RateUp": service[i].Status == 3 ? `${process.env.BASE_URL}/trainee2021/customer/service-history/RateUp/:enterid`: " "
                            })
                        }
                    }
                    return res.status(200).json({ServiceHistory});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            });
    }

    public Export = async(req:Request , res:Response):Promise<Response> =>{ 
        var Service:any = {} ;
        const Cid = (parseInt(user_id(req.cookies.helperland)));
        return await this.Udashbord_service
            .showService(Cid)
            .then(async(service)=>{
                if(service.length == 0){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    const length = service.length;
                    var ServiceHistory = [];
                    
                    for(var i = 0;i<length; i++){
                        if(service[i].Status == 1 || service[i].Status == 2){
                        }
                        else{
                            var j:number = -1;
                            var name:any = [];
                            var Rate:any = []
                            var k:number = -1;
                            if(service[i].Status == 3){
                                const id = service[i].ServiceId;
                                await this.Udashbord_service
                                    .userRequestByServiceid(id)
                                    .then(async(userRequest)=>{
                                        if(userRequest.length == 0){
                                            return res.status(404).json({error:"Not Found"})
                                        }
                                        else{
                                            const Hid = userRequest[0].UserId;
                                            const Cid = userRequest[0].CustomerId;
                                            name[++j] = userRequest[0].HelperName;
                                            await this.Udashbord_service
                                                .rating(Cid,Hid)
                                                .then((Rating)=>{
                                                    if(Rating == null){
                                                        Rate[++k] = 0;
                                                    }
                                                    else{
                                                        Rate[++k] = Rating.Ratings;
                                                        
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
                            else{
                                name[++j] = "";
                                Rate[++k] = 0;
                            }                           
                            ServiceHistory.push({
                            "ServiceId":service[i].ServiceId,
                            "ServiceDate":service[i].ServiceStartDate.getDate() + "/" + service[i].ServiceStartDate.getMonth() +"/" + service[i].ServiceStartDate.getFullYear(),
                            "Duaration":service[i].ArrivalTime + " - " + service[i].EndTime,
                            "ServiceProvider":name[i],
                            "ServiceProvider Rating":Rate[i],
                            "Payment":service[i].TotalCost,
                            "Status":service[i].Status == 3 ? "Completed" : "Cancelled",
                            })
                        }
                    }
                   Service = ServiceHistory;
                   console.log(Service);
                    const worksheet = XlSX.utils.json_to_sheet(Service);
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
                return res.status(500).json({error:"Error"});
            });
        
    }

    public RateUp = async(req:Request , res:Response)=>{
        const Cid = +user_id(req.cookies.helperland);
        const serviceId = req.params.id;
        await this.Udashbord_service
            .findServicebyUser(+serviceId)
            .then(async(serviceRequest)=>{
                if(serviceRequest == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else if(serviceRequest.Status != 3){
                    return res.status(404).json({message:"You can not rate Helper right now"});
                }
                else{
                    this.Udashbord_service
                        .userRequestById(serviceRequest.ServiceId)
                        .then(async(userRequest)=>{
                            if(userRequest == null){
                                return res.status(404).json({error:"Not Found"})
                            }
                            else{
                                const Hid = userRequest.IsAssign;
                                if(Cid == userRequest.CustomerId){
                                    await this.Udashbord_service
                                        .ratingfromUser(Hid)
                                        .then(async(rating)=>{
                                            const ratings:number = ((+req.body.OnTimeArrival)+(+req.body.Friendlly)+(+req.body.QualityOfService))/3;
                                            var rate:number = 0;
                                            if(rating){
                                                for(var i = 0;i<rating.length;i++){
                                                    const r:number = +rating[i].Ratings;
                                                    rate = +(((r + ratings)/2).toFixed(2));
                                                    rating[i].update({Ratings:rate});
                                                }
                                            }
                                            if(rate == 0){
                                                rate = +(ratings.toFixed(2));
                                            }
                                            req.body.Ratings = rate;
                                            req.body.RatingFrom = Cid;
                                            req.body.RatingTo = Hid;
                                            req.body.RatingDate = new Date();
                                           await this.Udashbord_service
                                                .Rating(req.body)
                                                .then((rateup)=>{
                                                    if(rateup){
                                                        rateup.update({UserRequestId:userRequest.id})
                                                        return res.status(200).json({"rateing":rateup.Ratings})
                                                    }
                                                    else{
                                                        return res.status(404).json({message:"Something Wrong"})
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
                                else{
                                    return res.status(200).json({message:"Something Is Wrong"});
                                }
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err)
                            return res.status(500).json({error:"Error"});
                        })
                   
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    
    }

    public mysetting = async(req:Request,res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.Udashbord_service
            .findUserById(id)
            .then((user)=>{
                if(user == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    const name = "Welcome "+ user.FirstName +" !";
                    const myDetails = {
                        "FirstName": user.FirstName,
                        "LastName": user.LastName,
                        "Email Address" : user.email,
                        "Mobile Number" : user.MobileNumber,
                        "Date Of Birth" : user.Date_Of_Birth,
                        "My Preferred Language" : user.LanguageId
                    }
                    const save = `Reset Details : ${process.env.BASE_URL}/trainee2021/customer/my-account`
                    return res.status(200).json({name,myDetails,save})
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public change_details = async(req:Request,res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        if(req.body.MobileNumber != null){
            const number = req.body.MobileNumber;
           await this.Udashbord_service
                .getAddressesById(+id)
                .then((userAddress)=>{
                    if(userAddress.length != 0){
                        for(var i=0;i<userAddress.length;i++){
                            if(userAddress[i].Mobile != number){
                                userAddress[i].update({Mobile:number});
                            }
                        }
                    }

                })
                .catch((err:Error)=>{
                    console.log(err);
                    return res.status(500).json("Error")
                })
        }
        const email = req.body.email;
        return await  this.Udashbord_service
            .findUser(id)
            .then((user)=>{
                if(user == null){
                    return res.status(404).json({error:"NotFound"})
                }
                else if(user.email != email){
                    return res.status(201).json({message:"User can not Edit Email"});
                }
                else{
                    return this.Udashbord_service
                        .updateUser(req.body,id)
                        .then(userupdate =>{
                            if(userupdate){
                                console.log(userupdate);
                                return res.status(200).json({message:"Update data"});
                            }
                            return res.status(404).json({error:"NotFound"});
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
        
    }

    public address = async(req:Request , res: Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
         return this.Udashbord_service
            .getAddressesById(id)
            .then(address =>{
                if(address.length == 0){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    const data:Object = {
                        "Edit" : `${process.env.BASE_URL}/trainee2021/customer/my-account/change-address/id`,
                        "Add" : `${process.env.BASE_URL}/trainee2021/customer/my-account/add-address`
                    }
                    return res.status(200).json({
                        address,data
                    })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public add_user_address = async(req:Request,res:Response):Promise<Response> =>{
        const id = user_id(req.cookies.helperland)
        if(req.body.Mobile == null){
           this.Udashbord_service
            .findUser(id)
            .then((user)=>{
                if(user == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    req.body.Mobile = user.MobileNumber;
                    req.body.email = user.email;
                } 
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
        }
        return this.Udashbord_service
            .findServiceRequest(id)
            .then((service)=>{
                if(service == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    const address = req.body.Street_name + " " + req.body.House_number + "," + req.body.City + " " + service.ZipCode;
                return this.Udashbord_service
                    .add_address(address,req.body.City,req.body.State,service.ZipCode,req.body.Mobile,req.body.email,id)
                    .then(address =>{
                        if(address == null){
                            return res.status(404).json({error:"Not Found"});
                        }  
                        else{
                            return res.status(200).json({"address":address.AddressLine1,"Phone Number":address.Mobile});
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

    public update_address = async(req:Request , res: Response):Promise<Response> =>{
        const id = req.params.id;
        req.body.AddressLine1 = req.body.Street_name + " " + req.body.House_number;
        return this.Udashbord_service
            .updateAddress(req.body,+id)
            .then((user)=>{
                if(user){
                    console.log(user);
                    return res.status(200).json({user});
                }
                return res.status(401).json({error:"Not Found"});
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public PassWord = async(req:Request , res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.Udashbord_service
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

    public Delete_address = async(req:Request , res: Response) =>{
        const id = req.params.id;
        this.Udashbord_service
            .findUserAddres(+id)
            .then((user)=>{
                if(user){
                    if(user.Status == 1 || user.Status == 2){
                        return res.status(200).json({message:`Your Address is Assign to ${user.ServiceId},so you can not delete`})
                    }  
                }
                this.Udashbord_service
                .deleteAddress(+id)
                .then((id)=>{
                    if(id > 0){
                        return res.status(200).json({message:"Deleted Address"});
                    }
                    return res.status(404).json({error:"Something is Wrong"});
                })
                .catch((err:Error)=>{
                    console.log(err);
                    return res.status(500).json({error:"Error"});
                })

            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
        
    }

    public favourite = async(req:Request,res:Response):Promise<Response | any>=>{
        const id = user_id(req.cookies.helperland);
        var Service:any = [];
        return this.Udashbord_service
            .finduserByCustomerId(+id)
            .then(async(user)=>{
                if(user.length == 0){
                    return res.status(404).json({error:"Not Found"})
                }
                else{
                    const length = user.length;
                    for(var z= 0 ; z<length ;z++){
                        const Name = user[z].HelperName;
                        const Hid = user[z].IsAssign;
                        const check = Service.find((o: { name: string; }) => o.name == Name);
                        if(check == undefined){
                            const cId = user[z].CustomerId;
                           return await this.Udashbord_service
                                .ratingfromCustomer(cId)
                                .then(async(customer)=>{
                                    if(customer.length == 0){
                                        return res.status(404).json({error:"Not Found"})
                                    }
                                    else{
                                        for(var i= 0 ; i<customer.length;i++){
                                           return await this.Udashbord_service
                                                .findfavourite(customer[i].RatingFrom)
                                                .then(async(fav)=>{
                                                    if(fav.length == 0){
                                                        await this.Udashbord_service
                                                            .checkfav(Hid,cId)
                                                            .then((Fav)=>{
                                                                console.log(Fav);
                                                                if(Fav != null){
                                                                    if(Fav.IsBlocked == false){
                                                                        const name = {
                                                                            "name": Name,
                                                                            "Rating": customer[i].Ratings,
                                                                            "id": customer[i].RatingTo, 
                                                                            "favourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/favourite/id`,
                                                                            "Block": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Block/id`
                                                                        }
                                                                        Service.push(name);
                                                                    }
                                                                }
                                                            })
                                                            .catch((err:Error)=>{
                                                                console.log(err);
                                                                return res.status(500).json({error:"Error"});
                                                            })
                                                        
                                                    }
                                                    else{
                                                        for(var k= 0;k<fav.length;k++){
                                                           await this.Udashbord_service
                                                                .checkfav(fav[i].TargetUserId,fav[i].UserId)
                                                                .then(async(Fav)=>{
                                                                    if(Fav){
                                                                        if(Fav.IsBlocked == false){
                                                                            if(fav[i].IsFavorite == false && fav[i].IsBlocked == false){
                                                                                const name = {
                                                                                    "name": Name,
                                                                                    "Rating": customer[i].Ratings,
                                                                                    "id": customer[i].RatingTo, 
                                                                                    "favourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/favourite/id`,
                                                                                    "Block": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Block/id`
                                                                                }
                                                                                Service.push(name);
                                                                            }
                                                                            else if(fav[i].IsFavorite == true && fav[i].IsBlocked == true){
                                                                                const name = {
                                                                                    "name": Name,
                                                                                    "Rating": customer[i].Ratings,
                                                                                    "id": customer[i].RatingTo, 
                                                                                    "Unfavourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Unfavourite/id`,
                                                                                    "UnBlock": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/UnBlock/id`
                                                                                }
                                                                                Service.push(name);
                                                                            }
                                                                            else if(fav[i].IsFavorite == false && fav[i].IsBlocked == true){
                                                                                const name = {
                                                                                    "name": Name,
                                                                                    "Rating": customer[i].Ratings,
                                                                                    "id": customer[i].RatingTo, 
                                                                                    "favourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/favourite/id`,
                                                                                    "UnBlock": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/UnBlock/id`
                                                                                }
                                                                                Service.push(name);
                                                                            }
                                                                            else if(fav[i].IsFavorite == true && fav[i].IsBlocked == false){
                                                                                const name = {
                                                                                    "name": Name,
                                                                                    "Rating": customer[i].Ratings,
                                                                                    "id": customer[i].RatingTo, 
                                                                                    "Unfavourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Unfavourite/id`,
                                                                                    "Block": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Block/id`
                                                                                }
                                                                                Service.push(name);
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
                                                    return res.status(200).json({Service});

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
                    //return res.json(Service);

                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"})
            })
    }

    public Favourite = async(req:Request,res:Response):Promise<Response> =>{
        const id = req.params.id;
        const Cid = <number>user_id(req.cookies.helperland);
        req.body.UserId = Cid;
        req.body.TargetUserId = id;
        return this.Udashbord_service
            .checkfav(+id,Cid)
            .then(async(fav)=>{
                if(fav == null){
                   return await this.Udashbord_service
                    .addfev(req.body)
                    .then((user)=>{
                        if(user == null){
                            return res.status(404).json({error:"Not Found"})
                        }
                        else{
                            user.update({IsFavorite:true,IsBlocked:false});
                            return res.status(200).json({message:"update"})
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json({error:"Error"});
                    })
                }
                else{
                    fav.update({IsFavorite:true});
                    return res.status(200).json({message:"update"})
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
            
    }

    public UnFavourite = async(req:Request,res:Response):Promise<Response> =>{
        const id = req.params.id;
        const Cid = +user_id(req.cookies.helperland);
        return this.Udashbord_service
            .checkfav(+id,Cid)
            .then((fav)=>{
                if(fav == null){
                    return res.status(404).json({error:"Error"});
                }
                else{
                    fav.update({IsFavorite:false});
                    return res.status(200).json({message:"update"});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public Block = async(req:Request,res:Response):Promise<Response> =>{
        const id = +req.params.id;
        const Cid = +user_id(req.cookies.helperland);
        req.body.UserId = Cid;
        req.body.TargetUserId = id;
        return await this.Udashbord_service
            .checkfav(id,Cid)
            .then((fav)=>{
                if(fav == null){
                   return this.Udashbord_service
                        .addfev(req.body)
                        .then((user)=>{
                            if(user == null){
                                return res.status(404).json({error:"Not Found"});
                            }
                            else{
                                user.update({IsFavorite:false,IsBlocked:true})
                                return res.status(200).json({message:"Update"});
                            }
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

    public unblock = async(req:Request,res:Response):Promise<Response> =>{
        const id = +req.params.id;
        const Cid = +user_id(req.cookies.helperland);
        return this.Udashbord_service
            .checkfav(id,Cid)
            .then((user)=>{
                if(user == null){
                    return res.status(404).json({error:"Not Found"});
                }
                else{
                    user.update({IsBlocked:false})
                    return res.status(200).json({message:"Update"});
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({error:"Error"});
            })
    }

    public verify = async(req:Request,res:Response,next:NextFunction)=>{
        const id = +user_id(req.cookies.helperland);
        this.Udashbord_service
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

