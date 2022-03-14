import { dbFavoriteAndBlocked, DbRating, dbServiceRequest, dbServiceRequestExtra, dbUser, dbUserAddress, DBUserRequest, DbZipCode } from "../models/interface";
import { ServiceRequest } from "../models/servicerequest";
import { Users } from "../models/user";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { UserAddress } from "../models/useraddress";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { UserRequest } from "../models/userrequest";
import { ZipCode } from "../models/zipcode";


export class BookRepository{

    public async findpostelcode(code:string):Promise<ZipCode | null>{
        return DbZipCode.ZipCode.findOne({where:{ZipcodeValue:code}})
    }
    
    public async checkPostelCode(postel_code:string):Promise<Users[]>{
        return dbUser.Users.findAll({where:{Zipcode:postel_code}});
    }

    public async createServiceRequest(ServiceRequest :string) : Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.create({ZipCode:ServiceRequest})
    }

    public async  findServiceRequest(id:number) : Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.findOne({where:{ServiceId:id}});
    }

    public async updateServiceRequest(servicerequest:ServiceRequest,id:number):Promise<[number,ServiceRequest[]]>{
        return dbServiceRequest.ServiceRequest.update(servicerequest,{where:{id:id}});
    }

    public async updateServiceExtra(Extra:string,id:number): Promise<ServiceRequestExtra>{
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


    public async findUser(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}});
    }


    public async fetch_favorite(id:number):Promise<FavoriteAndBlocked[]>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findAll({where:{UserId:id}});
    }

    public async findfav(Hid:number,Cid:number):Promise<FavoriteAndBlocked | null>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findOne({where:{UserId:Hid,TargetUserId:Cid}})
    }


    public async userRequest(id:number,userid:number,name:string,email:string):Promise<UserRequest>{
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

    public async findUserRequest(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{ServiceId:id}});
    }

    public async finduserRequest(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{ServiceId:id}})
    }

}