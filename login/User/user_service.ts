import { Users } from "../models/user";
import { UserRepository } from "./user_repository";

export class UserService{
    public constructor(private readonly UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }


    public async createUser(user: Users): Promise<Users> {
        return this.UserRepository.createContactUs(user);
    }

    public async getUsersById(userId: number): Promise<Users | null> {
        return this.UserRepository.findUserById(userId);
    }

    public async updateUsers(users: Users, userId: number): Promise<[number, Users[]]> {
        return this.UserRepository.updateUsers(users, userId);
    }
}