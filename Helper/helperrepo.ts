import { where } from "sequelize/types";
import { City } from "../models/city";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { DbCity, dbFavoriteAndBlocked, DbRating, dbServiceRequest, dbServiceRequestExtra, dbUser, dbUserAddress, DBUserRequest, DbZipCode } from "../models/interface";
import { Rating } from "../models/rating";
import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { UserRequest } from "../models/userrequest";
import { ZipCode } from "../models/zipcode";


export class HelperRepo{
    public async findServiceid(id:number):Promise<UserRequest[]>{
        return DBUserRequest.UserRequest.findAll({where:{UserId:id}});
    }

    public async findUserRequest(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{ServiceId:id}});
    }

    public async findServiceRequestById(id:number):Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.findOne({where:{ServiceId:id}});
    }

    public async getAddressById(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{id:id}});
    }

    public async findUserRequestById(id:number):Promise<UserRequest[] >{
        return DBUserRequest.UserRequest.findAll({where:{ServiceId:id}});
    }

    public async findUser(id:number):Promise<Users| null>{
        return dbUser.Users.findOne({where:{id:id}});
    }

    public async findhelperbyid(serviceid:number):Promise<UserRequest[]>{
        return DBUserRequest.UserRequest.findAll({where:{ServiceId:serviceid}})
    }

    public async findservicebycode(code:string):Promise<ServiceRequest[]>{
        return dbServiceRequest.ServiceRequest.findAll({where:{ZipCode:code,Status:1}})
    }

    public async creatuserRequest(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.create({ServiceId:id});
    }

    public async ExtraHours(id:number):Promise<ServiceRequestExtra | null>{
        return dbServiceRequestExtra.ServiceRequestExtra.findOne({where:{ServiceRequestId:id}});
    }

    public async ratingfromuser(id:number):Promise<Rating[]>{
        return DbRating.Rating.findAll({where:{RatingTo:id}});
    }

    public async userRequestfromRating(id:number):Promise<UserRequest[]>{
        return DbRating.Rating.findAll({where:{IsAssign:id}});
    }

    public async finduserRequest(id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{id:id}});
    }

    public async update_setting(setting:Users,id:number):Promise<[number,Users[]]>{
        return dbUser.Users.update(setting,{where:{id:id}});
    }

    public async update_address(address:UserAddress,id:number):Promise<[number,UserAddress[]]>{
        return dbUserAddress.UserAddress.update(address,{where:{UserId:id}});
    }

    public async check_address(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{UserId:id}});
    }

    public async add_address(address:UserAddress):Promise<UserAddress>{
        return dbUserAddress.UserAddress.create(address);
    }

    public async findZipCode(code:String):Promise<ZipCode | null>{
        return DbZipCode.ZipCode.findOne({where:{ZipcodeValue:code}})
    }

    public async createZipCode(code:String):Promise<ZipCode>{
        return DbZipCode.ZipCode.create({ZipcodeValue:code});
    }

    public async findCity(city:string):Promise<City | null>{
        return DbCity.City.findOne({CityName:city});
    }

    public async createCity(city:string):Promise<City>{
        return DbCity.City.create({CityName:city})
    }

    public async findfav(id:number,Cid:number):Promise<FavoriteAndBlocked | null>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findOne({where:{UserId:id,TargetUserId:Cid}})
    }

    public async createfav(id:number,Cid:number):Promise<FavoriteAndBlocked>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.create({UserId:id,TargetUserId:Cid});
    }
}