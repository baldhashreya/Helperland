import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestExtra } from "../models/servicerequestextra";

import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import {BookRepository} from "./book_repositry";
import {Request_ZipCodes} from '../models/request_zipcode';
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { UserRequest } from "../models/userrequest";

export class BookService{
    public constructor(private readonly BookRepository: BookRepository) {
        this.BookRepository = BookRepository;
    }

    public async checkPostelCode(postel_code:string):Promise<Users[] | null>{
        return this.BookRepository.checkPostelCode(postel_code);
    }

    public async createServiceRequest(servicerequest: string):Promise<ServiceRequest | null>{
        return this.BookRepository.createServiceRequest(servicerequest);
    }

    public async findServiceRequest(id : number):Promise<ServiceRequest>{
        return this.BookRepository.findServiceRequest(id);
    }

    public async updateServiceRequest(servicerequest:ServiceRequest,id : number):Promise<ServiceRequest>{
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

    public async add_zipcode(id:string,token:string):Promise<Request_ZipCodes>{
        return this.BookRepository.add_zipcode(id,token);
    }

    public async find_zipcode(id:string):Promise<Request_ZipCodes | null>{
        return this.BookRepository.find_zipcode(id);
    }

    public async findUser(id:number):Promise<Users | null>{
        return this.BookRepository.findUser(id);
    }

    public async fetch_favorite(id:number):Promise<FavoriteAndBlocked[]>{
        return this.BookRepository.fetch_favorite(id);
    }

    public async fetch_favoriteById(id:number):Promise<FavoriteAndBlocked | null>{
        return this.BookRepository.fetch_favoriteById(id);
    }


    public async UserRequest(id:number,userid:number,name:string,email:string):Promise<UserRequest | null>{
        return this.BookRepository.userRequest(id,userid,name,email);
    }

    public async findheper(id:number):Promise<UserRequest | null>{
        return this.BookRepository.findhepler(id);
    }


}