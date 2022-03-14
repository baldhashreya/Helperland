import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestExtra } from "../models/servicerequestextra";

import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import {BookRepository} from "./book_repositry";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { UserRequest } from "../models/userrequest";
import { ZipCode } from "../models/zipcode";

export class BookService{
    public constructor(private readonly BookRepository: BookRepository) {
        this.BookRepository = BookRepository;
    }

    public async checkPostelCode(postel_code:string):Promise<Users[]>{
        return this.BookRepository.checkPostelCode(postel_code);
    }

    public async createServiceRequest(servicerequest: string):Promise<ServiceRequest>{
        return this.BookRepository.createServiceRequest(servicerequest);
    }

    public async findServiceRequest(id : number):Promise<ServiceRequest | null>{
        return this.BookRepository.findServiceRequest(id);
    }

    public async updateServiceRequest(servicerequest:ServiceRequest,id : number):Promise<[number,ServiceRequest[]]>{
        return this.BookRepository.updateServiceRequest(servicerequest,id);
    }

    public async updateExtraService(Extra:string,id:number):Promise<ServiceRequestExtra | null>{
        return this.BookRepository.updateServiceExtra(Extra,id);
    }

    public async getAddressesById(id:number):Promise<UserAddress[]>{
        return this.BookRepository.getAddressesById(id);
    }

    public async add_address(address:string,city:string,state:string,postelcode:string,phonenumber:string,email:string,userid:number) :Promise<UserAddress>{
        return this.BookRepository.add_address(address,city,state,postelcode,phonenumber,email,userid);
    }

    public async getAddressById(id:number):Promise<UserAddress | null>{
        return this.BookRepository.getAddressById(id);
    }


    public async findUser(id:number):Promise<Users | null>{
        return this.BookRepository.findUser(id);
    }

    public async fetch_favorite(id:number):Promise<FavoriteAndBlocked[]>{
        return this.BookRepository.fetch_favorite(id);
    }


    public async UserRequest(id:number,userid:number,name:string,email:string):Promise<UserRequest>{
        return this.BookRepository.userRequest(id,userid,name,email);
    }

    public async findheper(id:number):Promise<UserRequest | null>{
        return this.BookRepository.findhepler(id);
    }

    public async findUserRequest(id:number):Promise<UserRequest | null>{
        return this.BookRepository.findUserRequest(id);
    }

    public async finduserRequest(id:number):Promise<UserRequest | null>{
        return this.BookRepository.finduserRequest(id);
    }

    public async findpostelcode(code:string):Promise<ZipCode | null>{
        return this.BookRepository.findpostelcode(code);
    }

    public async findfav(Hid:number,Cid:number):Promise<FavoriteAndBlocked | null>{
        return this.BookRepository.findfav(Hid,Cid);
    }


}