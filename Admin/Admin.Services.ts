import { ServiceRequest } from "../models/servicerequest";
import { Users } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { UserRequest } from "../models/userrequest";
import { AdminRepository } from "./Admin.repo";
import { Rating } from "../models/rating";

export class AdminService{
    public constructor(private readonly AdminRepository: AdminRepository) {
        this.AdminRepository = AdminRepository;
    }

    public async fetchAll():Promise<ServiceRequest[]>{
        return this.AdminRepository.fetchAll();
    }

    public async findUser(id:number):Promise<Users | null>{
        return this.AdminRepository.findUser(id);
    }

    public async createAdmin(admin:Users):Promise<Users>{
        return this.AdminRepository.createAdmin(admin);
    }

    public async getAddress(id:number):Promise<UserAddress | null>{
        return this.AdminRepository.getAddress(id);
    }

    public async userRequest (id:number):Promise<UserRequest | null>{
       return this.AdminRepository.userRequest(id); 
    }

    public async findServiceRequestById(id:number):Promise<ServiceRequest | null>{
        return this.AdminRepository.findServiceRequestById(id);
    }

    public async findaddress(id:number):Promise<UserAddress | null>{
        return this.AdminRepository.findaddress(id);
    }

    public async rating(id:number):Promise<Rating[]>{
        return this.AdminRepository.rating(id);
    }

    public async findAlluser():Promise<Users[]>{
        return this.AdminRepository.findAlluser();
    }
    
}