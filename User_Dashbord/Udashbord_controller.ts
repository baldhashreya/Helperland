import { Udashbord_service } from "./Udashbord_service";
import {  Request, Response } from "express";
import { decrypt, encrypt, user_id } from "../User/encrypt";
import XlSX from "xlsx";
import sendEmail from "../User/send-mail";
import { ServiceRequest } from "../models/servicerequest";

var Service:any = {} ;

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

    public dashboard = async(req:Request,res:Response)=>{
        const id = user_id(req.cookies.helperland)
        this.Udashbord_service
            .showServiceRequest(id)
            .then(async(serviceRequest)=>{
                if(serviceRequest == null){
                    return res.status(401).json("1Something is Wrong")
                }
                else{
                    const length = serviceRequest.length;
                    var d = [];
                    
                    for(var i =0;i<length;i++){
                        var name;
                        var Rating = 0;
                        var id:number = 0;
                        if(serviceRequest[i].Status == 1 || serviceRequest[i].Status == 2){
                            if(serviceRequest[i].Status == 2){
                               await this.Udashbord_service
                                        .userRequest(serviceRequest[i].ServiceId)
                                        .then(async(user)=>{
                                            if(user == null){
                                                return res.status(401).json("2Something Is Wrong");
                                            }
                                            else{
                                                const j = user.find(o => o.IsAssign != null);
                                                if(j != undefined){
                                                    //console.log(j.HelperName);
                                                    name = j.HelperName; 
                                                    id = j.UserId;
                                                }
                                                else{
                                                    name =  " ";
                                                }
                                                
                                            }
                                        })
                                        .catch((err:Error)=>{
                                            console.log(err);
                                            return res.status(500).json("Error");
                                        })
                            }
                            else{
                                name = " ";
                            }

                            if(id != 0){
                                await this.Udashbord_service
                                .ratingfromUser(id)
                                .then((rating)=>{
                                    if(rating == null){
                                        Rating = 0;   
                                    }
                                    else{
                                        Rating = rating.Ratings
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json("Error");
                                })
                             }
                            
                            const Time = (serviceRequest[i].ServiceHours);
                            const ExtraTime = (serviceRequest[i].ExtraHours);
                            const Arrival = ((serviceRequest[i].ArrivalTime).split(':'))
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
                             await serviceRequest[i].update({EndTime:time});
                            
                                
                            const details = {
                                "ServiceId":serviceRequest[i].ServiceId,
                                "ServiceDate":serviceRequest[i].ServiceStartDate,
                                "Duration": serviceRequest[i].ArrivalTime + " - " + time,
                                "Payment":serviceRequest[i].TotalCost,
                                "HelperName":name,
                                "Rating":Rating,
                                "Action1":`ReSchedule : ${process.env.BASE_URL}/trainee2021/customer/servicerequest/reschedule/:enterid`,
                                "Action2":`Cancel : ${process.env.BASE_URL}/trainee2021/customer/servicerequest/cancel/:enterid`,
                                "Action3":`Details : ${process.env.BASE_URL}/trainee2021/customer/servicerequest/service-details/:enterid`
                            } 
                            d.push(details);
                        }
                    }
                    return res.json(d);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    };

    public reSchedule = async(req:Request,res:Response):Promise<Response>=>{
        const reschedule_id : number = parseInt(req.params.id);
        const date = req.body.date;
        const time = req.body.ArrivalTime;
       return this.Udashbord_service
            .findServicebyUser(reschedule_id)
            .then(async(service)=>{
                if(service == null ){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    service.update({ServiceStartDate:date,ArrivalTime:time});
                    await this.Udashbord_service
                        .checkPostelCode(service.ZipCode)
                        .then((serviceZipcode)=>{
                            if(serviceZipcode == null){
                                return res.status(401).json("Something is Wrong");
                            }
                            else{
                                const j:number = serviceZipcode.length;
                            for(var i = 0; i<j ; i++){
                                const email = serviceZipcode[i].email;
                                sendEmail(email,"Service Request Change the Date",` “Service Request ${reschedule_id} has been rescheduled by customer. New date and time are ${date} , ${time}”`);
                            }
                            }
                        })
                    return res.status(200).json("update");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from ReSchedule");
            });
    }

    public CancelService = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id);
        return this.Udashbord_service
            .userRequest(id)
            .then(async(user)=>{
                if(user == null){
                    return res.status(401).json('Something is Wrong')
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
                            return res.status(401).json("Something Is Wrong");
                        }
                        else{
                            user.update({Status:4}); 
                        }
                    })
                    .catch((err:Error)=>{
                        console.log((err));
                        return res.status(500).json("Error");
                    })
                return res.status(200).json("Service Cancle");
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public ServiceDetails = async(req:Request,res:Response):Promise<Response>=>{
        const id = parseInt(req.params.id);
        return this.Udashbord_service
            .findServicebyUser(id)
            .then(async(service)=>{
                if(service == null){
                    console.log("Service"+service)
                    return res.status(401).json("Something is Wrong");
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
                                return res.status(401).json("Something is Wrong");
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
                            return res.status(500).json("Error from Extra Service");
                        })
                        const useraddressId = service.UserAddressId;
                     await this.Udashbord_service
                        .getAddressById(useraddressId)
                        .then((Result)=>{
                           if(Result == null){
                               return res.status(401).json("Something is Wrong");
                           }
                           else{
                            const serviceAddress = Result.AddressLine1;
                             ServiceDetails = {
                                "Date":service.ServiceStartDate,
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
                            return res.status(500).json("Error from UserAddress");
                        });
                    return res.status(200).json(ServiceDetails);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error from ServiceDetails");
            })
    }

    public Service_History = async(req:Request,res:Response):Promise<Response>=>{
        const id = (parseInt(user_id(req.cookies.helperland)));
        return await this.Udashbord_service
            .showService(id)
            .then(async(service)=>{
                if(service == null || service.length == 0){
                    return res.status(401).json("1Something is Wrong");
                }
                else{
                    const length = service.length;
                    var ServiceHistory = [];
                    var j:number = -1;
                    for(var i = 0;i<length; i++){
                        if(service[i].Status == 1 || service[i].Status == 2){
                        }
                        else{
                            var hepler;
                            var rating;
                            await this.Udashbord_service
                                .userRequest(service[i].ServiceId)
                                .then(async(user)=>{
                                    if(user == null || user.length == 0){
                                        return res.status(401).json("2Something is Wrong");
                                    }
                                    else{
                                        const j = user.find(o => o.IsAssign == 1 && o.IsDeleted == false);
                                        if(j!= undefined){
                                            const id:number = j.UserId;
                                            hepler = j.HelperName;
                                            await this.Udashbord_service
                                                .ratingfromUser(id)
                                                .then((userRating)=>{
                                                    if(userRating == null){
                                                        rating = " ";
                                                    }
                                                    else{
                                                        rating = (userRating.Ratings);
                                                    }
                                                })
                                                .catch((err:Error)=>{
                                                    console.log(err);
                                                    return res.status(500).json("Error");
                                                })
                                        }
                                        else {
                                            hepler = {};
                                        }
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json("Error");
                                })
                            ServiceHistory[++j] = {
                                "ServiceId":service[i].ServiceId,
                                "ServiceDate":service[i].ServiceStartDate,
                                "Duaration":service[i].ArrivalTime + " - " + service[i].EndTime,
                                "ServiceProvider":hepler,
                                "ServiceProvider Rating":rating,
                                "Payment":service[i].TotalCost,
                                "Status":service[i].Status == 3 ? "Completed" : "Cancelled",
                                "RateUp": service[i].Status == 3 ? `${process.env.BASE_URL}/trainee2021/customer/service-history/RateUp/:enterid`: " "
                            }
                        }
                    }
                   Service = ServiceHistory;
                    return res.status(200).json(ServiceHistory);
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error From Service History");
            });
    }

    public Export = async(req:Request , res:Response):Promise<Response> =>{
        console.log(Service);
        const worksheet = XlSX.utils.json_to_sheet(Service);
        const workbook = XlSX.utils.book_new();
        XlSX.utils.book_append_sheet(workbook,worksheet,"ServiceHistory");
        XlSX.write(workbook,{bookType:'xlsx',type:"buffer"});
        XlSX.write(workbook,{bookType:"xlsx",type:"binary"});
        XlSX.writeFile(workbook,"History.xlsx");
        return res.json("check your file");
    }

    public RateUp = async(req:Request , res:Response):Promise<Response>=>{
        const cId = user_id(req.cookies.helperland);
        const id = req.params.id;
        return await this.Udashbord_service
            .userRequest(+id)
            .then(async(user)=>{
                if(user == null){
                    return res.status(401).json("Something Is Wrong");
                }
                else{
                    var SPid:number;
                    const j = user.find(o => o.IsAssign == 1 && o.IsDeleted == false);
                    if(j!= undefined){
                        const id = j.UserId;
                        return await this.Udashbord_service
                            .ratingfromUser(id)
                            .then(async(userRating)=>{
                                if(userRating == null){
                                    req.body.Ratings = ((req.body.OnTimeArrival + req.body.Friendlly + req.body.QualityOfService)/3).toFixed(2);
                                   return await this.Udashbord_service
                                        .rating(req.body)
                                        .then(async(userRating)=>{
                                            if(userRating == null){
                                                return res.status(401).json("Something is Wrong");
                                            }
                                            else{
                                                const Id = j.ServiceId;
                                               return  await this.Udashbord_service
                                                    .findServicebyUser(Id)
                                                    .then((serviceRequest)=>{
                                                        if(serviceRequest == null){
                                                            return res.status(401).json("Something is Wrong");
                                                        }
                                                        else{
                                                            SPid = serviceRequest.id;
                                                            userRating.update({
                                                            RatingDate:new Date(),
                                                            ServiceRequestId:SPid,
                                                            RatingTo:id,
                                                            RatingFrom:cId
                                                            })
                                                            return res.json(userRating);
                                                        }
                                                    })
                                                    .catch((err:Error)=>{
                                                    console.log(err);
                                                    return res.status(500).json("Error");
                                                });
                                                
                                            }
                                        })
                                        .catch((err:Error)=>{
                                            console.log(err);
                                            return res.status(500).json("Error");
                                        })
                                }
                                else{
                                    
                                    const Id = j.ServiceId;
                                    console.log("Id"+Id);
                                    const OnTimeArrival = (+req.body.OnTimeArrival+(+userRating.OnTimeArrival))/2;
                                    const Friendlly = (+req.body.Friendlly+(+userRating.Friendlly))/2;
                                    const QualityOfService = (+req.body.QualityOfService+(+userRating.QualityOfService))/2;
                                    const Rating = ((OnTimeArrival + Friendlly + QualityOfService)/3).toFixed(2);
                                    if(req.body.Comments){
                                        userRating.update({Comments:req.body.Comments});
                                    }
                                   console.log("Else block");
                                   return await this.Udashbord_service
                                     .findServicebyUser(Id)
                                     .then((serviceRequest)=>{
                                         if(serviceRequest == null){
                                             return res.status(401).json("Something is Wrong");
                                         }
                                         else{
                                             SPid = serviceRequest.id;
                                              userRating.update({
                                                OnTimeArrival:OnTimeArrival,
                                                Friendlly:Friendlly,
                                                QualityOfService:QualityOfService,
                                                Ratings:Rating,
                                                RatingDate:new Date(),
                                                ServiceRequestId:SPid,
                                                RatingTo:id,
                                                RatingFrom:cId 
                                             })
                                             return res.json(userRating);
                                         }
                                     })
                                     .catch((err:Error)=>{
                                         console.log(err);
                                         return res.status(500).json("Error");
                                     });
                                }
                            })
                            .catch((err:Error)=>{
                                console.log(err);
                                return res.status(500).json("Error");
                            })
                    }
                    else{
                        return res.status(401).json("Something is wrong");
                    }
                    
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public mysetting = async(req:Request,res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.Udashbord_service
            .findUserById(id)
            .then((user)=>{
                if(user == null){
                    return res.status(401).json("Something is Wrong");
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
    }

    public change_details = async(req:Request,res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.Udashbord_service
            .updateUser(req.body,id)
            .then(user =>{
                if(user == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    console.log(user);
                    return res.status(200).json("Update data");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })

    }

    public address = async(req:Request , res: Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
         return this.Udashbord_service
            .getAddressesById(id)
            .then(address =>{
                if(address == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    const data:Object = {
                        "Edit" : `${process.env.BASE_URL}/trainee2021/customer/my-account/change-address`,
                        "Add" : `${process.env.BASE_URL}/trainee2021/customer/my-account/add-address`
                    }
                    return res.status(200).json({
                        address,data
                    })
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public add_user_address = async(req:Request,res:Response):Promise<Response> =>{
        const id = user_id(req.cookies.helperland)
        if(req.body.Mobile == null){
           this.Udashbord_service
            .findUser(id)
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
        return this.Udashbord_service
            .findServiceRequest(id)
            .then((service)=>{
                if(service == null){
                    return res.status(201).json("Something is Wrong");
                }
                else{
                    const address = req.body.Street_name + " " + req.body.House_number + "," + req.body.City + " " + service.ZipCode;
                return this.Udashbord_service
                    .add_address(address,req.body.City,req.body.State,service.ZipCode,req.body.Mobile,req.body.email,id)
                    .then(address =>{
                        if(address == null){
                            return res.status(500).json("somthing wrong");
                        }  
                        else{
                            return res.json({"address":address.AddressLine1,"Phone Number":address.Mobile});
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

    public update_address = async(req:Request , res: Response):Promise<Response> =>{
        const id = req.params.id;
        req.body.AddressLine1 = req.body.Street_name + " " + req.body.House_number;
        return this.Udashbord_service
            .updateAddress(req.body,+id)
            .then((user)=>{
                if(user == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    console.log(user);
                    return res.status(200).json("update Address");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public PassWord = async(req:Request , res:Response):Promise<Response>=>{
        const id = user_id(req.cookies.helperland);
        return this.Udashbord_service
            .findUser(+id)
            .then(async(user)=>{
                if(user == null){
                    return res.json(401).json("Something Is Wrong");
                }
                else{
                    const pass:string = req.body.Password;
                    const compare = await decrypt(pass,user.Password);
                    if(compare == false){
                        return res.status(400).json("Old Password Incorrect")
                    }
                    else{
                        const newPass = await encrypt(req.body.NewPassword);
                        user.update({Password:newPass});
                        return res.status(200).json("Update PassWord");
                    }
                }
            })
    }

    public Delete_address = async(req:Request , res: Response) =>{
        const id = req.params.id;
        this.Udashbord_service
            .deleteAddress(+id)
            .then((id)=>{
                if(id == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    return res.status(200).json("Deleted Address");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })

    }

    public favourite = async(req:Request,res:Response):Promise<Response | any>=>{
        const id = user_id(req.cookies.helperland);
        var Service:any = [];
        return this.Udashbord_service
            .finduserByCustomerId(+id)
            .then(async(user)=>{
                if(user == null){
                    return res.status(401).json("Something is Wrong")
                }
                else{
                    const length = user.length;
                    for(var z= 0 ; z<length ;z++){
                        const Name = user[z].HelperName;
                        const check = Service.find((o: { name: string; }) => o.name == Name);
                        if(check == undefined){
                            const cId = user[z].CustomerId;
                            console.log(cId);
                           return await this.Udashbord_service
                                .ratingfromCustomer(cId)
                                .then(async(customer)=>{
                                    if(customer == null){
                                        return res.status(401).json("Something is Wrong")
                                    }
                                    else{
                                        for(var i= 0 ; i<customer.length;i++){
                                           return await this.Udashbord_service
                                                .findfavourite(customer[i].RatingFrom)
                                                .then((fav)=>{
                                                    if(fav.length == 0){
                                                        const name = {
                                                            "name": Name,
                                                            "Rating": customer[i].Ratings,
                                                            "id": customer[i].RatingTo, 
                                                            "favourite": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/favourite/id`,
                                                            "Block": `${process.env.BASE_URL}/trainee2021/customer/favourite-pros/Block/id`
                                                        }
                                                        Service.push(name);
                                                    }
                                                    else{
                                                        for(var k= 0;k<fav.length;k++){
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
                                                    return res.json(Service);

                                                })
                                                .catch((err:Error)=>{
                                                    console.log(err);
                                                    return res.status(500).json("Error")
                                                })    
                                        }
                                    }
                                })
                                .catch((err:Error)=>{
                                    console.log(err);
                                    return res.status(500).json("Error");
                                })
                            
                        }
                        
                    }
                    //return res.json(Service);

                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
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
                            return res.status(401).json("Something is Wrong")
                        }
                        else{
                            user.update({IsFavorite:true,IsBlocked:false});
                            return res.status(200).json("update")
                        }
                    })
                    .catch((err:Error)=>{
                        console.log(err);
                        return res.status(500).json("Error");
                    })
                }
                else{
                    fav.update({IsFavorite:true});
                    return res.status(200).json("update")
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
            
    }

    public UnFavourite = async(req:Request,res:Response):Promise<Response> =>{
        const id = req.params.id;
        const Cid = +user_id(req.cookies.helperland);
        return this.Udashbord_service
            .checkfav(+id,Cid)
            .then((fav)=>{
                if(fav == null){
                    return res.status(401).json("Somethig is Wrong");
                }
                else{
                    fav.update({IsFavorite:false});
                    return res.status(200).json("update");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
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
                                return res.status(400).json("Something Wrong");
                            }
                            else{
                                user.update({IsFavorite:false,IsBlocked:true})
                                return res.status(200).json("Update");
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json("Error");
                        })
                }
                else{
                    fav.update({IsBlocked:true});
                    return res.status(200).json("Update");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }

    public unblock = async(req:Request,res:Response):Promise<Response> =>{
        const id = +req.params.id;
        const Cid = +user_id(req.cookies.helperland);
        return this.Udashbord_service
            .checkfav(id,Cid)
            .then((user)=>{
                if(user == null){
                    return res.status(401).json("Something is Wrong");
                }
                else{
                    user.update({IsBlocked:false})
                    return res.status(200).json("update");
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json("Error");
            })
    }
    
}

