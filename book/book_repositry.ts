import { dbFavoriteAndBlocked, dbRequest_ZipCodes, dbServiceRequest, dbServiceRequestExtra, dbUser, dbUserAddress, DBUserRequest } from "../models/interface";
import { ServiceRequest } from "../models/servicerequest";
import { Users } from "../models/user";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { UserAddress } from "../models/useraddress";
import { Request_ZipCodes } from "../models/request_zipcode";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { UserRequest } from "../models/userrequest";


export class BookRepository{
    
    public async checkPostelCode(postel_code:string):Promise<Users[] | null>{
        return dbUser.Users.findAll({where:{Zipcode:postel_code}});
    }

    public async createServiceRequest(ServiceRequest :string) : Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.create({ZipCode:ServiceRequest})
    }

    public async  findServiceRequest(id:number) : Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.findOne({where:{ServiceId:id}});
    }

    public async updateServiceRequest(servicerequest:ServiceRequest,id:number):Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.update(servicerequest,{where:{id:id}});
    }

    public async updateServiceExtra(Extra:string,id:number): Promise<ServiceRequestExtra | null>{
        return dbServiceRequestExtra.ServiceRequestExtra.create({
            ServiceExtraId:Extra,
            ServiceRequestId:id
        });
    }

    public async getAddressesById(id:number):Promise<UserAddress[]>{
        return dbUserAddress.UserAddress.findAll({attributes: ['AddressLine1', 'Mobile','id'],where:{UserId:id}});
    }



    public async add_address(address:string,city:string,state:string,postelcode:string,phonenumber:string,email:string,userid:number): Promise<UserAddress>{
        return dbUserAddress.UserAddress.create({
            AddressLine1 : address,
            City : city,
            State : state,
            PostelCode : postelcode,
            Mobile : phonenumber,
            Email : email,
            UserId : userid,
            IsDefault:false
        });
    }

    public  async getAddressById(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{id:id}});
    }

    public async add_zipcode(id:string,token:string):Promise<Request_ZipCodes>{
        return dbRequest_ZipCodes.Request_ZipCodes.create({
            userId:id,
            token:token
        });
    }

    public async find_zipcode(id:string):Promise<Request_ZipCodes | null>{
        return dbRequest_ZipCodes.Request_ZipCodes.findOne({where:{userId:id}});
    }

    public async findUser(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}});
    }


    public async fetch_favorite(id:number):Promise<FavoriteAndBlocked[]>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findAll({where:{UserId:id}});
    }

    public async fetch_favoriteById(id:number):Promise<FavoriteAndBlocked | null >{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findOne({where:{id:id}});
    }


    public async userRequest(id:number,userid:number,name:string,email:string):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.create({
            ServiceId:id,
            UserId:userid,
            IsDeleted:false,
            HelperName:name,
            email:email
        })
    }

    public async findhepler(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{ServiceId:id}});
    }

}