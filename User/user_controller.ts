import  { Request, Response ,Express} from 'express';
import { Users  } from "../models/user";
import { UserService } from "./user_service";
import bcrypt from 'bcryptjs'
import sendEmail from "./send-mail";
import  jwt  from 'jsonwebtoken';
import dotenv from "dotenv";


dotenv.config();

require('dotenv').config();

export class UserController {
    public constructor(private readonly UserService: UserService) {
      this.UserService = UserService;
    }

    public createUser = async (req: Request, res: Response): Promise<Response> => {
      const pass = await bcrypt.hash(req.body.Password,10);
     return this.UserService
      .getUsersByemail(req.body.email)
      .then(async(user)=>{
        if(!user){
          return this.UserService
            .createUser(req.body)
            .then(async(user: Users) => { 
                const date = new Date();
                const token = jwt.sign({
                  name: user.FirstName,
                  email: user.email,
                  userId: user.id
                },"djcniwewcdjlwdncjwoc",{
                  expiresIn:"1d"
                });
                res.cookie('helperland',token);
                user.update({RoleId:2,Status:0,CreateDate:date,IsApprove:false,Password:pass});
                const link = `${process.env.BASE_URL}/conform/${user.id}/${token}`;
                await sendEmail(user.email,"conformation User",link);
                
              return res.status(200).json('check your mail for confomation');
            })
            .catch((error: Error) => {
              return res.status(500).json({
                error: error
              });
            });
        }
        else{
          return res.status(201).json("User already sign up");
        }
      })
      .catch((err:Error)=>{
        console.log(err);
        return res.status(500).json("Error");
      });
      
        
    };

    public createHelper = async (req: Request, res: Response): Promise<Response> => {
      const pass = await bcrypt.hash(req.body.Password,10)
      return this.UserService
        .getUsersByemail(req.body.email)
        .then(async(user)=>{
          if(!user){
            return this.UserService
            .createUser(req.body)
            .then(async (user: Users) => {
                const date = new Date();
                const token = jwt.sign({
                  name: user.FirstName,
                  email: user.email,
                  userId: user.id
                },`${process.env.JWT_KEY}`,{
                  expiresIn:"7d"
                });
                res.cookie('helperland',token);
                user.update({RoleId:3,Status:0,CreateDate:date,IsApprove:false,Password:pass});
                const link = `${process.env.BASE_URL}/conform/${user.id}/${token}`;
                await sendEmail(user.email,"conformation Helper",link);
                console.log(user);
               
              return res.status(200).json('check your mail for conformation');
            })
            .catch((error: Error) => {
              return res.status(500).json({
                error: error
              });
            });
          }
          else{
            return res.status(201).json("Helper already signup");
          }
        })
        .catch((err:Error)=>{
          console.log("Error"+err);
          return res.status(500).json("Error");
        });
      
      
  };

  public login = async (req: Request , res: Response):Promise<Response> => {
    return this.UserService
      .getUsersByemail(req.body.email)
      .then(async(user) =>{
        if(user){
          if(user.Status == 1){
            return res.status(201).json("user already login");
          }
          const pass = await bcrypt.compare(req.body.Password,user.Password);
            if(pass){
              console.log("login");
              const token = jwt.sign({
                name: user.FirstName,
                email: user.email,
                userId: user.id
              },`${process.env.JWT_KEY}`,{
                expiresIn:"7d"
              });
              res.cookie('helperland',token);
              
              user.update({Status:1});
              return res.status(200).json({message : "login done"});
            }
            else{
              console.log("passwars incorrect");
              return res.status(401).json("password do not match");
            }
        }
        else{
            console.log("email not found");
           return res.status(401).json("email not found");
        }   
    }).catch((err:Error) =>{
        console.log("ERRRO")
        console.log(err);
        return res.status(500).json('error');
    });
  }

  public conform = async(req:Request, res:Response):Promise<Response> => {

    return this.UserService
      .getUsersById(+req.params.id)
      .then((user)=>{
        if(!user){
          return res.status(404).json('link not valid');
        }
        user.update({IsApprove:true});
        return res.status(200).json('conform user');
      })
  };
 

  public resetEmail = async (req:Request,res:Response): Promise<Response> => {
    
      return this.UserService
        .getUsersByemail(req.body.email)
        .then(async (user) => {
          if (!user){
            return res.status(400).json("user with given email doesn't exist");
          }
          const link = `${process.env.BASE_URL}/password-reset/${user.id}/${req.cookies.helperland}`;
          await sendEmail(user.email, "Password reset", link);
          return res.status(200).json("check your email");
        })
       .catch((error:Error) => {
         console.log(error)
        return res.status(500).json("An error occured");
        
      });
  };

  public resetpassword = async (req:Request,res:Response): Promise<Response |any> => {
    const id = parseInt(req.params.user_id); 
    const token = req.params.token;
      return this.UserService
      .getUsersById(id)
      .then(async user =>{
        if(!user){
          return res.status(400).json("invalid link");
        }
        if(token !== req.cookies.helperland){
          return res.status(400).json("invalid token");
        }
        await user
          .update({Password:req.body.Password})
          .then(data =>{
            console.log("password updata : " + data);
            return res.status(200).json("password reset sucessfully");
          })
          .catch((err:Error)=>{
            console.log("Error:"+err);
            return res.status(500).json("Error");
          });
      })
      .catch((err:Error)=>{
        console.log("Error:"+err);
        return res.status(500).json("Error");
      });
  };

  public logout = async(req:Request,res:Response):Promise<Response> => {
    const email = req.body.email;
   
    return this.UserService
      .getUsersByemail(email)
      .then(async(user)=>{
        if(user){
          if(user.Status == 0){
            return res.status(201).json("user all ready logout");
          }
          res.cookie('helperland','',{maxAge:1});
          await user.update({Status:0});
          return res.status(200).json('logout');
        }
        else{
          return res.status(401).json('email not found');
        }
      })
      .catch((err:Error)=>{
        console.log(err);
        return res.status(500).json("Error");
      })
  }


  
}