import { Request, Response } from 'express';
import { Users  } from "../models/user";
import { UserService } from "./user_service";
import { dbUser } from '../models';
import sendEmail from "./fargot_password";

export class UserController {
    public constructor(private readonly UserService: UserService) {
      this.UserService = UserService;
    }

    public createUser = async (req: Request, res: Response): Promise<Response> => {
        return this.UserService
          .createUser(req.body)
          .then((user: Users) => {
              user.update({roleid:1})
              console.log("data save");
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
    };

    public createHelper = async (req: Request, res: Response): Promise<Response> => {
      return this.UserService
        .createUser(req.body)
        .then((user: Users) => {
            user.update({roleid:2})
            console.log("data save");
          return res.status(200).json({ user });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
  };

  public resetEmail = async (req:Request,res:Response) => {
    try {
        const user = await dbUser.Users.findOne({where:{email:req.body.email}});
        if (!user){
          return res.status(400).send("user with given email doesn't exist");
        }
        const link = `${process.env.BASE_URL}/password-reset/${user.id}`;
        await sendEmail(user.email, "Password reset", link)
          .then((data:string)=>{
            res.json(data);
          })
          .catch((err:Error)=>{
            console.log(err);
          });
        res.send("check your email");
      } catch (error) {
        res.send("An error occured");
        console.log(error);
      }
  };

  public resetpassword = async(req:Request,res:Response)=>{
     await this.UserService
      .getUsersById(req.body.user_id)
      .then(async user=>{
        if(!user){
          return res.status(400).send("invalid link");
        }
        await user
          .update({password:req.body.password})
          .then(data =>{
            console.log("password updata : " + data);
            res.send("password reset sucessfully");
          })
          .catch((err:Error)=>{
            console.log("Error:"+err);
            return res.send("Error");
          });
      })
      .catch((err:Error)=>{
        console.log("Error:"+err);
        return res.json("Error");
      });
      };

  
}