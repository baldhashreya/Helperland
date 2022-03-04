import  {dbUser} from "../models/interface";
import { Users } from "../models/user";

export class UserRepository{
    
    public async createContactUs(Users: Users): Promise<Users> {
        return dbUser.Users.create(Users);
    }

    public async findUserById(userid: number): Promise<Users | null> {
        return dbUser.Users.findOne({where:{id:userid}});
    }

    public async findUserByEmail(Email: string): Promise<Users | null> {
        return dbUser.Users.findOne({where:{email:Email}});
    }

    public async updateUsers(users: Users, userId: number): Promise<[number, Users[]]> {
        return dbUser.Users.update(users, { where: {id: userId}});
    }

}