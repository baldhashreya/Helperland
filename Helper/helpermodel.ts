const Joi = require('joi')
.extend(require('@joi/date'));
import { RequestHandler, Request , Response , NextFunction } from "express";


const id = Joi.number().required().example(1);

const token = Joi.number().required().example(1);

const setting = Joi.object({
    FirstName: Joi.string()
        .example("shreya"),
    LastName: Joi.string()
        .example("Baldha"),
    email: Joi.string()
        .email()
        .example("shreyabaldha0@gmail.com"),
    MobileNumber : Joi.string()
        .length(10)
        .example("1234567890"),
    Date_Of_Birth: Joi.date()
        .format(['DD-MM-YYYY'])
        .example("27-01-2001"),
    NationalityId: Joi.number()
        .example(1),
    Gender: Joi.number()
        .example(1),
    User_Profile_Picture: Joi.number()
        .example(1),
    street: Joi.string()
        .example("Bhakti Nagar"),
    House_number: Joi.string()
        .example("S-10"),
    PostelCode: Joi.string()
        .length(6)
        .example("360405"),
    City: Joi.string()
        .example("Rajkot")

})
export const Id:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = id.validate(parseInt(req.params.id));
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Token:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = token.validate(req.params.token);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Setting:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = setting.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}