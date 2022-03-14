import  { Request, Response ,Express} from 'express';
import { Users  } from "../models/user";
import { UserService } from "./user_service";
import sendEmail from "./send-mail";
import  jwt, { JwtPayload }  from 'jsonwebtoken';
import dotenv from "dotenv";
// import jwt_decode from "jwt-decode";
import {decrypt, encrypt, Token, Token1, user_id} from './encrypt';



dotenv.config();

require('dotenv').config();

export class UserController {
  public constructor(private readonly UserService: UserService) {
    this.UserService = UserService;
  }

  public createUser = async (req: Request, res: Response): Promise<Response> => {  
    return this.UserService
      .getUsersByemail(req.body.email)
      .then(async(user)=>{
        if(user){
          return res.status(201).json("User already sign up with this mail id");
        }
        return this.UserService
          .createUser(req.body)
          .then(async(user: Users) => { 
            const pass = await encrypt(req.body.Password);
            user.update({RoleId:2,Status:0,CreateDate:new Date(),IsApprove:false,Password:pass});
            const token = Token1(user.email);
            const link = `${process.env.BASE_URL}/trainee2021/conform/${token}`;
            sendEmail(user.email,"conformation User",link);
            return res.status(200).json({message:'check your mail for confomation'});
          })
          .catch((error: Error) => {
            console.log(error)
            return res.status(500).json("Error");
          });
      })
      .catch((err:Error)=>{
        console.log(err);
        return res.status(500).json("Error");
      });    
  };

  public createHelper = async (req: Request, res: Response): Promise<Response> => {
    return this.UserService
      .getUsersByemail(req.body.email)
      .then(async(user)=>{
        if(!user){
          return this.UserService
          .createUser(req.body)
          .then(async (user: Users) => {
              const pass = await encrypt(user.Password);
              user.update({RoleId:3,Status:0,CreateDate:new Date(),IsApprove:false,Password:pass});
              const token = Token1(user.email);
              const link = `${process.env.BASE_URL}/trainee2021/conform/${token}`;
              sendEmail(user.email,"conformation Helper",link);
            return res.status(200).json({message:'check your mail for conformation'});
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
          // if(user.Status == 1){
          //   return res.status(201).json("user already login");
          // }
          if(user.IsApprove == false)
          {
            return res.status(201).json("User not verify first verify yourself");
          }
          const pass = decrypt(req.body.Password,user.Password);
            if(!pass){
              console.log("passwars incorrect");
              return res.status(401).json({error:"password do not match"});   
            }
            else{
              const token = Token(user);
              res.cookie('helperland',token);
              
              return res.status(200).json({message : "login done"});
            }
        }
        else{
           return res.status(401).json({error:"Email not found"});
        }   
    }).catch((err:Error) =>{
        console.log(err);
        return res.status(500).json('error');
    });
  }

  public conform = async(req:Request, res:Response):Promise<Response> => {
    const data = req.params.id;
    const mail = user_id(data);
    return this.UserService
      .getUsersByemail(mail)
      .then((user)=>{
        if(!user){
          return res.status(404).json({error:'link not valid'});
        }
        user.update({IsApprove:true});
        return res.status(200).json({message:'conform user'});
      })
  };
 

  public resetEmail = async (req:Request,res:Response): Promise<Response> => {
    
      return this.UserService
        .getUsersByemail(req.body.email)
        .then(async (user) => {
          if (!user){
            return res.status(400).json({error:"user with given email doesn't exist"});
          }
          const link = `${process.env.BASE_URL}/trainee2021/password-reset/${user.id}/${req.cookies.helperland}`;
           sendEmail(user.email, "Password reset", link);
          return res.status(200).json({message:"check your email"});
        })
       .catch((error:Error) => {
         console.log(error)
        return res.status(500).json({error:"An error occured"});
        
      });
  };

  public resetpassword = async (req:Request,res:Response): Promise<Response> => {
    const id = parseInt(req.params.user_id); 
    const token = req.params.token;
      return this.UserService
      .getUsersById(id)
      .then(async user =>{
        if(!user){
          return res.status(404).json({error:"invalid link"});
        }
        if(token !== req.cookies.helperland){
          return res.status(400).json({error:"invalid token"});
        }
        const pass = await encrypt(req.body.Password);
         user.update({Password:pass})
         return res.status(200).json({message:"Update Password"});
      })
      .catch((err:Error)=>{
        console.log("Error:"+err);
        return res.status(500).json({error:"Error"});
      });
  };

  // public Login = async(req:Request,res:Response) =>{
  //   const token = req.cookies.helperland;
  //   const decode:JwtPayload = jwt_decode(token);
  //   console.log(decode.userId);
  //   return res.status(200).json({ token });
  // }

  public logout = async(req:Request,res:Response):Promise<Response> => {
    const id:string = user_id(req.cookies.helperland);
    return this.UserService
      .getUsersById(+id)
      .then(async(user)=>{
        if(user == null){
          return res.status(404).json({error:'NotFound'});
        }
        else{
          res.cookie('helperland','',{maxAge:1});
          await user.update({Status:0});
          return res.status(200).json({message:'logout'});
        }
      })
      .catch((err:Error)=>{
        console.log(err);
        return res.status(500).json({error:"Error"});
      })
  }

  

};

 