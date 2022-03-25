import { NextFunction, Request, Response } from 'express';
import { object } from 'joi';

import {ContactUs_Post,ContactUs_Get_id,ContactUs_Put} from './ContactUs.model';

export const Post_valid =(req:Request,res:Response,next:NextFunction) =>{
    const value = ContactUs_Post.validate(Object);
    if(value.error){
        res.status(401).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Put_valid =(req:Request,res:Response,next:NextFunction) =>{
    const value = ContactUs_Put.validate(req.body);
    if(value.error){
        res.status(401).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Get_valid =(req:Request,res:Response,next:NextFunction) =>{
    const value = ContactUs_Get_id.validate(req.params);
    if(value.error){
        res.status(401).json(value.error.message);
    }
    else{
        
        next();
    }
}