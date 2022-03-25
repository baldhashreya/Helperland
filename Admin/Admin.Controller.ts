import { AdminService } from "./Admin.Services";
import { Request, Response,NextFunction } from "express";
import { user_id } from "../User/encrypt";
import { fetchData } from "./Admin.data";
import XlSX from 'xlsx';
type t = {
    SeriveId: number;
    Service_Date: Date;
    Customer_Name: string;
    Customer_Address: string;
    Duration: string;
    Service_Provider_Name: string;
    Grouse_Amount: number;
    Net_Amount: number;
    Discount: string;
    Status: string;
    Payment_Status: boolean;
    email: string;
    Zipcode: string;
    Rating : number;
    Avtar: string;
};

type u = {
    UserName : string;
    Date : string;
    UserType : number;
    Phone: string;
    Postelcode: string | undefined;
    Status: string | null;
    Action: string
}


export class AdminController{
    public constructor(private readonly AdminService: AdminService) {
        this.AdminService = AdminService;
    }

    public show = async (req: Request, res: Response): Promise<Response> => {
        const fetchdata = new fetchData();
        return fetchdata.fetch()
            .then((result: t[]) => {
                var length = result.length;
                var Data: any = [];
                var Action = "";
                for (var i = 0; i < length; i++) {
                    if (result[i].Status == "Request" || result[i].Status == "Accept" || result[i].Status == "incomplete") {
                        Action = "Edit&Schedule";
                    }
                    else {
                        Action = " ";
                    }
                    Data.push({
                        "ServiceId": result[i].SeriveId,
                        "Service Details": {
                            "Service_Date": result[i].Service_Date,
                            "Duration": result[i].Duration
                        },
                        "Customer Details": {
                            "Name": result[i].Customer_Name,
                            "Address": result[i].Customer_Address
                        },
                        "Service Provider": {
                            "Name": result[i].Service_Provider_Name,
                            "Avtar": result[i].Avtar,
                            "Rate": result[i].Rating
                        },
                        "Grouse Amount": result[i].Grouse_Amount,
                        "Net Amount": result[i].Net_Amount,
                        "Discount": result[i].Discount,
                        "Status": result[i].Status,
                        "Payment Status": result[i].Payment_Status,
                        "Action": Action
                    });
                }
                return res.status(200).json({ Data });
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            });
    }

    public read = async (req: Request, res: Response): Promise<Response> => {
        const fetchdata = new fetchData();
        return fetchdata.fetch()
            .then((result: t[]) => {
                if (req.body.ServiceId) {
                    result = result.filter(result => result.SeriveId == req.body.ServiceId);
                }
                if (req.body.email != null) {
                    result = result.filter(result => result.email == req.body.email);
                }
                if (req.body.postalcode != null) {
                    result = result.filter(result => result.Zipcode == req.body.postalcode);
                }
                if (req.body.customername != null) {
                    result = result.filter(result => result.Customer_Name == req.body.customername);
                }
                if (req.body.ServiceProvide != null) {
                    result = result.filter(result => result.Service_Provider_Name == req.body.ServiceProvide);
                }
                if (req.body.Status != null) {
                    result = result.filter(result => result.Status == req.body.Status);
                }
                if (req.body.paymentStatus != null) {
                    result = result.filter(result => result.Payment_Status == req.body.paymentStatus);
                }
                if (req.body.StartDate != null) {
                    result = result.filter(result => result.Service_Date >= req.body.StartDate);
                }
                if (req.body.Enddate != null) {
                    result = result.filter(result => result.Service_Date <= req.body.Enddate);
                }
                if (result.length == 0) {
                    return res.status(201).json({ message: "No Data Found" });
                }
                else {
                    var Data: any = [];
                    for (var i = 0; i < result.length; i++) {
                        Data.push({
                            "ServiceId": result[i].SeriveId,
                            "Service Details": {
                                "Service_Date": result[i].Service_Date,
                                "Duration": result[i].Duration
                            },
                            "Customer Details": {
                                "Name": result[i].Customer_Name,
                                "Address": result[i].Customer_Address
                            },
                            "Service Provider": {
                                "Name": result[i].Service_Provider_Name,
                                "Avtar": result[i].Avtar,
                                "Rate": result[i].Rating
                            },
                            "Grouse Amount": result[i].Grouse_Amount,
                            "Net Amount": result[i].Net_Amount,
                            "Discount": result[i].Discount,
                            "Status": result[i].Status,
                            "Payment Status": result[i].Payment_Status
                        });
                    }
                    return res.status(200).json({ Data });
                }

            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            });

    }

    public Edit = async (req:Request, res:Response): Promise<Response> => {
        var id = req.params.id;
        return this.AdminService
            .findServiceRequestById(+id)
            .then(async (serviceRequest) => {
                if(serviceRequest == null){
                    return res.status(404).json({ error: "Not Found" });
                }
                else{
                    if(serviceRequest.Status == 1 || serviceRequest.Status == 2 || serviceRequest.Status == null){
                        var SStreet_name = " ", SHouse_number = " ", SPostelCode = " " , SCity = " ";
                        var IStreet_name = " ", IHouse_number = " ", IPostelCode = " " , ICity = " "; 
                        await this.AdminService
                            .findaddress(serviceRequest.UserId)
                            .then((userAddress) => {
                                if(userAddress == null){
                                    return res.status(404).json({ error: "Not Found" })
                                }
                                else{
                                    var a = userAddress.AddressLine1.split(",");
                                    var a1 = a[0].split(" ");
                                    if(a1.length == 2){
                                        SStreet_name = a1[0];
                                        SHouse_number = a1[1]
                                    }
                                    else{
                                        SStreet_name = a1[0] + " " + a1[1];
                                        SHouse_number = a1[2]
                                    }
                                    var a2 = a[1].split(" ");
                                    SPostelCode = a2[1];
                                    SCity = a2[0];
                                }
                            })
                            .catch((err: Error) => {
                                console.log(err);
                                return res.status(500).json({ error: "Error" });
                            })
                        await this.AdminService
                            .getAddress(serviceRequest.UserAddressId)
                            .then((useraddress) => {
                                if(useraddress == null){
                                    return res.status(404).json({ error: "Not Found" })
                                }
                                else{
                                    var a = useraddress.AddressLine1.split(",");
                                    var a1 = a[0].split(" ");
                                    if(a1.length == 3){
                                        IStreet_name = a1[0] + " " + a1[1];
                                        IHouse_number = a1[2]
                                    }
                                    else{
                                        IStreet_name = a1[0];
                                        IHouse_number = a1[1]
                                    }
                                    ICity = (a[1].split(" "))[0];
                                    IPostelCode = (a[1].split(" "))[1]
                                }
                            })
                            .catch((err: Error)=>{
                                console.log(err);
                                return res.status(500).json({ error: "Error" });
                            })
                        var Data:any = {};
                        Data = {
                            "Date": serviceRequest.ServiceStartDate,
                            "Arrival Time": serviceRequest.ArrivalTime,
                            "Service Address":{
                                "Street name": SStreet_name,
                                "House number": SHouse_number,
                                "Postel code": SPostelCode,
                                "City": SCity
                            },
                            "Invoice Address":{
                                "Street name": IStreet_name,
                                "House number": IHouse_number,
                                "Postel Code": IPostelCode,
                                "City": ICity
                            }
                        }
                        return res.status(200).json({ Data });
                    }
                    else if(serviceRequest.Status == 3){
                        return res.status(201).json({ message: "You Can not Reschedule after complete the service" });
                    }
                    else{
                        return res.status(201).json({ message: "You Can not Reschedule after cancle the service" });
                    }
                }
            })
            .catch((err: Error)=>{
                console.log(err);
                return res.status(500).json({ error: "Error" })
            })

    }

    public Edit_data = async (req:Request, res:Response): Promise<Response> => {
        const id = req.params.id;
        var endtime;
        return await this.AdminService
            .findServiceRequestById(+id)
            .then(async (serviceRequest) => {
                if(serviceRequest == null){
                    return res.status(404).json({ error: "Not Found!" })
                }
                else{
                    var stime = serviceRequest.ServiceHours;
                    var Etime = serviceRequest.ExtraHours;
                    var t = (stime) + (Etime);
                    var Arrival = ( req.body.ArrivalTime.split(":") )[1] == "30" ? +(req.body.ArrivalTime.split(":"))[0] + 0.5 : +(req.body.ArrivalTime.split(":"))[0];
                    var t1 = ((Arrival + t).toString()).split(".");
                    endtime = t1[1] == '5'? t1[0]+":30" :  t1[0]+":30" ;
                    serviceRequest.update({
                        ServiceStartDate: req.body.ServiceStartDate,
                        ArrivalTime: req.body.ArrivalTime,
                        EndTime: endtime
                    });
                    var Addressid = serviceRequest.UserAddressId;
                    var id = serviceRequest.UserId;
                    await this.AdminService
                        .findaddress(id)
                        .then((address) => {
                            if(address){
                                address.update({
                                    AddressLine1 : req.body.SStreet_name + " " + req.body.SHouse_number + "," + req.body.SCity + " " + req.body.SPostelCode,
                                    City: req.body.SCity,
                                    PostelCode: req.body.SPostelCode
                                })
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({ error: "Error" });
                        })
                    await this.AdminService
                        .getAddress(Addressid)
                        .then((userAddress) => {
                            if(userAddress == null){
                                return res.status(404).json({ error: "Not Found!!" });
                            }
                            else{
                                userAddress.update({
                                    AddressLine1: req.body.Street_name+ " " +req.body.House_number+ "," + req.body.City + " "+ req.body.PostleCode,
                                    City:  req.body.City,
                                    PostelCode: req.body.PostleCode
                                })
                            }
                        })
                        .catch((err:Error)=>{
                            console.log(err);
                            return res.status(500).json({ error: "Error" });
                        })
                    return res.status(200).json({ message: "Update" });
                }
            })
            .catch((err:Error)=>{
                console.log(err);
                return res.status(500).json({ error: "Error" });
            })
            
    }

    public user_managmnet  = async (req: Request, res: Response): Promise<Response> => {
        const user = new fetchData();
        return await user.user()
            .then((User: u[]) => {
                if (User) {
                    var Data:any = []
                    for(var i=0; i<User.length; i++){
                        Data.push({
                            "UserName": User[i].UserName,
                            "Date Of Registration": User[i].Date,
                            "User Type": User[i].UserType,
                            "Phone": User[i].Phone,
                            "Postel Code": User[i].Postelcode,
                            "Status": User[i].Status,
                            "Action": User[i].Action
                        })
                    }
                    return res.status(200).json({ Data });
                }
                else {
                    return res.status(404).json({ message: "Not Found" });
                }
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            });
    }

    public export = async (req: Request, res:Response): Promise<Response> =>{
        const user = new fetchData();
        return await user.user()
            .then((User: u[]) => {
                if (User) {
                    var Data:any = []
                    for(var i=0; i<User.length; i++){
                        Data.push({
                            "UserName": User[i].UserName,
                            "Date Of Registration": User[i].Date,
                            "User Type": User[i].UserType,
                            "Phone": User[i].Phone,
                            "Postel Code": User[i].Postelcode,
                            "Status": User[i].Status,
                            
                        })
                    }
                    const worksheet = XlSX.utils.json_to_sheet(Data);
                    const workbook = XlSX.utils.book_new();
                    XlSX.utils.book_append_sheet(workbook,worksheet,"ServiceHistory");
                    XlSX.write(workbook,{bookType:'xlsx',type:"buffer"});
                    XlSX.write(workbook,{bookType:"xlsx",type:"binary"});
                    XlSX.writeFile(workbook,"data.xlsx");
                    return res.json({message:"Check Your File"});
                }
                else {
                    return res.status(404).json({ message: "Not Found" });
                }
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            });
    }

    public user_managment_filter = async (req: Request, res: Response): Promise<Response> =>{
        const fetchdata = new fetchData();
        return await fetchdata
            .user()
            .then((user) =>{
                if(user){
                    var Data:any = [];
                    if(req.body.UserName != null){
                        user = user.filter(user => user.UserName == req.body.UserName)
                    }
                    if(req.body.UserType != null){
                        user = user.filter(user => user.UserType == req.body.UserType)
                    }
                    if(req.body.Phone != null){
                        user = user.filter(user => user.Phone == req.body.Phone);
                    }
                    if(req.body.Postelcode != null){
                        user = user.filter(user => user.Postelcode == req.body.Postelcode)
                    }
                    if(req.body.email != null){
                        user = user.filter(user => user.Email == req.body.email)
                    }
                    if(req.body.fromdate != null){
                        user = user.filter(user => user.Date >= req.body.fromdate);
                    }
                    if(req.body.todate != null){
                        user = user.filter(user => user.Date <= req.body.todate);
                    }
                    if(user.length == 0){
                        return res.status(201).json({ message: "No Data" });
                    }
                    else{
                        for(var i=0; i<user.length; i++){
                            Data.push({
                                "UserName": user[i].UserName,
                                "DateOfRegistration": user[i].Date,
                                "UserType": user[i].UserType,
                                "Phone": user[i].Phone,
                                "PostelCode": user[i].Postelcode,
                                "Status": user[i].Status,
                                "Action": user[i].Action
                            })
                        }
                        return res.status(200).json({ Data });
                    }
                    
                }
                else{
                    return res.status(404).json({ error: "Not Found"});
                }
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            })
    }

    public Active = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id;
        return await this.AdminService
            .findUser(+id)
            .then((user) => {
                if(user == null){
                    return res.status(404).json({ message: "Not Found" });
                }
                else{
                    user.update({ Status: 1});
                    return res.status(200).json({ message: "Active" });
                }
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            })
    }

    public Deactive = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id;
        return await this.AdminService
            .findUser(+id)
            .then((user) => {
                if(user == null){
                    return res.status(404).json({ message: "Not Found" });
                }
                else{
                    user.update({ Status: 0});
                    return res.status(200).json({ message: "Deactive" });
                }
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: "Error" });
            })
    }

    public signUp = async (req: Request, res: Response): Promise<Response> => {
        return this.AdminService
            .createAdmin(req.body)
            .then((admin) => {
                if(admin){
                    return res.status(200).json({ admin });
                }
                return res.status(404).json({ error: "Not found" });
            })
            .catch((err: Error)=>{
                console.log(err);
                return res.status(500).json({ error: "Error" });
            })
    }

    public verify = async (req: Request, res: Response, next: NextFunction) => {
        const id = +user_id({ data: req.cookies.helperland });
        this.AdminService
            .findUser(id)
            .then((user) => {
                if(user?.RoleId == 1){
                    next();
                }
                else{
                    return res.status(404).json({ message: "You can not access this page" });
                }
            })
            .catch((err: Error)=>{
                console.log(err);
                return res.status(500).json({ error: "Error" })
            })
    }
}


