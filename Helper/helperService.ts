import { City } from "../models/city";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { Rating } from "../models/rating";
import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { UserRequest } from "../models/userrequest";
import { ZipCode } from "../models/zipcode";
import { HelperRepo } from "./helperrepo";

export class HelperService{
    public constructor(private readonly HelperRepo: HelperRepo) {
        this.HelperRepo = HelperRepo;
    }
    public async findServiceId(id:number):Promise<UserRequest[]>{
        return this.HelperRepo.findServiceid(id);
    }

    public async findUserRequest(id:number):Promise<UserRequest | null>{
        return this.HelperRepo.findUserRequest(id);
    }

    public async findServiceRequestById(id:number):Promise<ServiceRequest | null>{
        return this.HelperRepo.findServiceRequestById(id);
    }

    public async getAddressById(id:number):Promise<UserAddress | null>{
        return this.HelperRepo.getAddressById(id);
    }

    public async findUserRequestById(id:number):Promise<UserRequest[]>{
        return this.HelperRepo.findUserRequestById(id);
    }

    public async findUser(id:number):Promise<Users | null>{
        return this.HelperRepo.findUser(id);
    }

    public async findhelperByid(Sid:number):Promise<UserRequest[] | null>{
        return this.HelperRepo.findhelperbyid(Sid);
    }

    public async findservicebycode(code:string):Promise<ServiceRequest[]>{
        return this.HelperRepo.findservicebycode(code);
    }

    public async creatUserRequest(id:number):Promise<UserRequest | null>{
        return this.HelperRepo.creatuserRequest(id);
    }

    public async ExtraHours(id:number):Promise<ServiceRequestExtra | null>{
        return this.HelperRepo.ExtraHours(id);
    }

    public async ratingfromuser(id:number):Promise<Rating[]>{
        return this.HelperRepo.ratingfromuser(id);
    }

    public async userRequestfromRating(id:number):Promise<UserRequest[]>{
        return this.HelperRepo.userRequestfromRating(id);
    }

    public async finduserRequest(id:number):Promise<UserRequest | null>{
       return this.HelperRepo.finduserRequest(id);
    }

    public async update_setting(setting:Users,id:number):Promise<[number,Users[]]>{
        return this.HelperRepo.update_setting(setting,id);
    }
    public async update_address(address:UserAddress,id:number):Promise<[number,UserAddress[]]>{
        return this.HelperRepo.update_address(address,id);
    }

    public async check_address(id:number):Promise<UserAddress | null>{
        return this.HelperRepo.check_address(id);
    }

    public async add_address(address:UserAddress):Promise<UserAddress>{
        return this.HelperRepo.add_address(address);
    }

    public async findZipCode(code:String):Promise<ZipCode | null>{
        return this.HelperRepo.findZipCode(code);
    }

    public async createZipCode(code:String):Promise<ZipCode>{
        return this.HelperRepo.createZipCode(code)
    }

    public async findCity(city:string):Promise<City | null>{
        return this.HelperRepo.findCity(city);
    }

    public async createCity(city:string):Promise<City>{
        return this.HelperRepo.createCity(city)
    }

    public async findfav(id:number,Cid:number):Promise<FavoriteAndBlocked | null>{
        return this.HelperRepo.findfav(id,Cid);
    }

    public async createfav(id:number,Cid:number):Promise<FavoriteAndBlocked>{
        return this.HelperRepo.createfav(id,Cid);
    }
}