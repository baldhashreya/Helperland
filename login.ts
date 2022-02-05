import { Request,Response } from "express"
import  {dbUser} from "./models/index";
import { Users } from "./models/user";

var login = async(req:Request,res:Response) =>{
    const Email = req.body.email;
    const pass = req.body.password;
    await dbUser.Users.findOne({where:{email:Email}}).then((result:Users) =>{
        if(result){
            if(result.password === pass){
                console.log("login");
                return res.json("sucess");
            }
            else{
                console.log("invalid password");
                return res.json("invalid password");
            }
        }
        else{
            console.log("email not found");
           return res.json("email not found");
        }   
    }).catch((err:Error) =>{
        console.log("ERRRO")
        console.log(err);
    });
}

export default login;
