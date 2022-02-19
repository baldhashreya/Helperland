import { dbFavoriteAndBlocked, dbRequest_ZipCodes, dbServiceRequest, dbServiceRequestExtra, dbUser, dbUserAddress } from "../models/interface";
import { ServiceRequest } from "../models/servicerequest";
import { Users } from "../models/user";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { UserAddress } from "../models/useraddress";
import { Request_ZipCodes } from "../models/request_zipcode";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { Op } from "sequelize";


export class BookRepository{
    
    public checkPostelCode(postel_code:string):Promise<Users[] | null>{
        return dbUser.Users.findAll({where:{Zipcode:postel_code}});
    }

    public createServiceRequest(ServiceRequest :string) : Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.create({ZipCode:ServiceRequest})
    }

    public findServiceRequest(id:number) : Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.findOne({where:{id:id}});
    }

    public updateServiceRequest(servicerequest:ServiceRequest,id:number):Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.update(servicerequest,{where:{id:id}});
    }

    public updateServiceExtra(Extra:string,id:number): Promise<ServiceRequestExtra>{
        return dbServiceRequestExtra.ServiceRequestExtra.create({
            ServiceExtraId:Extra,
            ServiceRequestId:id
        });
    }

    public getAddress():Promise<UserAddress[]>{
        return dbUserAddress.UserAddress.findAll({attributes: ['AddressLine1', 'Mobile','id']});
    }

    public add_address(address:string,city:string,state:string,postelcode:string,phonenumber:string,email:string,userid:number): Promise<UserAddress>{
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

    public getAddressById(id:number):Promise<UserAddress>{
        return dbUserAddress.UserAddress.findOne({where:{id:id}});
    }

    public add_zipcode(id:string,token:string):Promise<Request_ZipCodes>{
        return dbRequest_ZipCodes.Request_ZipCodes.create({
            userId:id,
            token:token
        });
    }

    public find_zipcode(id:string):Promise<Request_ZipCodes | null>{
        return dbRequest_ZipCodes.Request_ZipCodes.findOne({where:{userId:id}});
    }

    public findUser(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}});
    }


    public fetch_favorite(id:number):Promise<FavoriteAndBlocked[] >{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findAll({where:{UserId:id}});
    }

    public fetch_favoriteById(id:number):Promise<FavoriteAndBlocked | null >{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findOne({where:{id:id}});
    }
}