import Joi from "joi";
import { Request,Response ,NextFunction } from "express";

const SignUp =  Joi.object({
    FirstName: Joi.string()
        .required()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    LastName: Joi.string()
        .required()
        .example('Jones')
        .description('lastName of user'),
    email: Joi.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    MobileNumber: Joi.string()
        .required()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    Password: Joi.string()
        .required()
        .example('Shreya!123')
        .description('password'),
    ConfirmPassword: Joi.valid(Joi.ref('Password'))
        .required()
    
});

const pass = Joi.object({
    Password: Joi.string()
        .required()
        .example('Shreya!123')
        .description('password'),
    ConfirmPassword: Joi.valid(Joi.ref('Password'))
        .required()
});

const login =  Joi.object({
    email: Joi.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    Password: Joi.string()
        .required()
        .example('Shreya!123')
        .description('password')
});

const link_send =  Joi.object({
    email: Joi.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user')
});

export const sigup =(req:Request,res:Response,next:NextFunction) =>{
    const value = SignUp.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Login =(req:Request,res:Response,next:NextFunction) =>{
    const value = login.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const link =(req:Request,res:Response,next:NextFunction) =>{
    const value = link_send.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Password =(req:Request,res:Response,next:NextFunction) =>{
    const value = pass.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};