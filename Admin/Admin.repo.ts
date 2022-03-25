import { DbRating, dbServiceRequest, dbUser, dbUserAddress, DBUserRequest } from "../models/interface";
import { Rating } from "../models/rating";
import { ServiceRequest } from "../models/servicerequest";
import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { UserRequest } from "../models/userrequest";


export class AdminRepository{
    public async fetchAll():Promise<ServiceRequest[]>{
        return dbServiceRequest.ServiceRequest.findAll();
    }

    public async findUser(id:number):Promise<Users | null>{
        return dbUser.Users.findOne({where:{id:id}})
    }

    public async createAdmin(admin:Users):Promise<Users>{
        return dbUser.Users.create(admin);
    }

    public async getAddress(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{id:id}});
    }

    public async userRequest (id:number):Promise<UserRequest | null>{
        return DBUserRequest.UserRequest.findOne({where:{ServiceId:id}});
    }

    public async findServiceRequestById(id:number):Promise<ServiceRequest | null>{
        return dbServiceRequest.ServiceRequest.findOne({where:{ServiceId:id}});
    }

    public async findaddress(id:number):Promise<UserAddress | null>{
        return dbUserAddress.UserAddress.findOne({where:{UserId:id,IsDefault:true}})
    }

    public async rating(id:number):Promise<Rating[]>{
        return DbRating.Rating.findAll({where:{RatingTo:id}});
    }

    public async findAlluser():Promise<Users[]>{
        return dbUser.Users.findAll();
    }
}