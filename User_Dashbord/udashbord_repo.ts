import { ServiceRequest } from "../models/servicerequest";
import { dbFavoriteAndBlocked, DbRating, dbRequest_ZipCodes, dbServiceRequest, dbServiceRequestExtra, dbUser, dbUserAddress, DBUserRequest } from "../models/interface";
import { Users } from "../models/user";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { UserAddress } from "../models/useraddress";
import { UserRequest } from "../models/userrequest";
import { Rating } from "../models/rating";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";

export class Udashbord_repo{
    public async showServiceRequest(id:number):Promise<ServiceRequest[] | null>{
        return dbServiceRequest
            .ServiceRequest
            .findAll({
                where:{
                    UserId:id
                }
            })
    }

    public async findServicebyUser(id:number):Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.findOne({where:{ServiceId:id}});
    }

    public async checkPostelCode(postel_code:string):Promise<Users[] | null>{
        return dbUser.Users.findAll({where:{Zipcode:postel_code}});
    }

    public async findExtraServiceById(id:number):Promise<ServiceRequestExtra | null>{
        return dbServiceRequestExtra.ServiceRequestExtra.findOne({where:{ServiceRequestId:id}});
    }  
    
    public async getAddressById(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{id:id}});
    }

    public async showService(id:number):Promise<ServiceRequest[] | null>{
        return dbServiceRequest
            .ServiceRequest
            .findAll({
                where:{
                    UserId:id
                }
            })
    }

    public async findUserById(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}});
    }

    public async updateDetails(details:Users,id:number):Promise<Users | null>{
        return dbUser.Users.update(details,{where:{id:id}});
    }

    public async getAddressesById(id:number):Promise<UserAddress[]>{
        return dbUserAddress.UserAddress.findAll({attributes: ['AddressLine1', 'Mobile','id'],where:{UserId:id}});
    }

    public async findUser(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}});
    }

    public async findServiceRequest(id:number) : Promise<ServiceRequest>{
        return dbServiceRequest.ServiceRequest.findOne({where:{id:id}});
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

    public async updateAddress(address:UserAddress , id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.update(address,{where:{id:id}});
    } 

    public async deleteAddress(id:number):Promise<number>{
        return dbUserAddress.UserAddress.destroy({where:{id:id}});
    }

    public async userRequest(id:number):Promise<UserRequest[] | null>{
        return DBUserRequest.UserRequest.findAll({where:{ServiceId:id}});
    }

    public async Rating(rating:Rating):Promise<Rating | null>{
        return DbRating.Rating.create(rating);
    }

    public async RatingFromUser(id:number):Promise<Rating | null>{
        return DbRating.Rating.findOne({where:{RatingTo:id}});
    }

    public async RatingFromCustomer(id:number):Promise<Rating[] | null>{
        return DbRating.Rating.findAll({where:{RatingFrom:id}});
    }

    public async findfavourite(id:number):Promise<FavoriteAndBlocked []>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findAll({where:{UserId:id}});
    }

    public async finduserbycustomerid(id:number):Promise<UserRequest[] | null>{
        return DBUserRequest.UserRequest.findAll({where:{CustomerId:id}});
    }
    public async checkfav(hid:number,uid:number):Promise<FavoriteAndBlocked | null>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.findOne({where:{
            UserId:uid,
            TargetUserId:hid
        }});
    }

    public async addfav(id:FavoriteAndBlocked):Promise<FavoriteAndBlocked | null>{
        return dbFavoriteAndBlocked.FavoriteAndBlocked.create(id)
    }
}