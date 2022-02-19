import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestExtra } from "../models/servicerequestextra";

import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import {BookRepository} from "./book_repositry";
import {Request_ZipCodes} from '../models/request_zipcode';
import { FavoriteAndBlocked } from "../models/favoriteandblocked";

export class BookService{
    public constructor(private readonly BookRepository: BookRepository) {
        this.BookRepository = BookRepository;
    }

    public checkPostelCode(postel_code:string):Promise<Users[] | null>{
        return this.BookRepository.checkPostelCode(postel_code);
    }

    public createServiceRequest(servicerequest: string):Promise<ServiceRequest | null>{
        return this.BookRepository.createServiceRequest(servicerequest);
    }

    public findServiceRequest(id : number):Promise<ServiceRequest>{
        return this.BookRepository.findServiceRequest(id);
    }

    public updateServiceRequest(servicerequest:ServiceRequest,id : number):Promise<ServiceRequest>{
        return this.BookRepository.updateServiceRequest(servicerequest,id);
    }

    public updateExtraService(Extra:string,id:number):Promise<ServiceRequestExtra>{
        return this.BookRepository.updateServiceExtra(Extra,id);
    }

    public getAddress():Promise<UserAddress[]>{
        return this.BookRepository.getAddress();
    }

    public add_address(address:string,city:string,state:string,postelcode:string,phonenumber:string,email:string,userid:number) :Promise<UserAddress>{
        return this.BookRepository.add_address(address,city,state,postelcode,phonenumber,email,userid);
    }

    public getAddressById(id:number):Promise<UserAddress>{
        return this.BookRepository.getAddressById(id);
    }

    public add_zipcode(id:string,token:string):Promise<Request_ZipCodes>{
        return this.BookRepository.add_zipcode(id,token);
    }

    public find_zipcode(id:string):Promise<Request_ZipCodes | null>{
        return this.BookRepository.find_zipcode(id);
    }

    public findUser(id:number):Promise<Users | null>{
        return this.BookRepository.findUser(id);
    }

    public fetch_favorite(id:number):Promise<FavoriteAndBlocked[]>{
        return this.BookRepository.fetch_favorite(id);
    }

    public fetch_favoriteById(id:number):Promise<FavoriteAndBlocked | null>{
        return this.BookRepository.fetch_favoriteById(id);
    }


}