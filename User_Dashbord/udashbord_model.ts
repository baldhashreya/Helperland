const Joi = require('joi')
.extend(require('@joi/date'));

import { Request , Response , NextFunction } from "express";

const id = Joi.number().required().example(1);

const reschedule = Joi.object({
    date:Joi.date()
    .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
    .greater(Date.now())
    .required()
    .example('12/02/2022'),
    ArrivalTime : Joi.string()
    .valid('8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00')
    .required()
});

const cancle = Joi.object({
    reason: Joi.string()
        .required()
        .example("the reason")
});

const details = Joi.object({
    FirstName: Joi.string()
        .example("shreya"),
    LastName:   Joi.string()
        .example("Baldha"),
    email: Joi.string()
        .email()
        .example("shreyabaldha0@gamil.com"),
    MobileNumber: Joi.string()
        .length(10)
        .example("1234567890"),
    Date_Of_Birth: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .max(Date.now())
        .example('12/02/2022'), 
    LanguageId: Joi.number()
        .example("1")
});

const update_address = Joi.object({
    City : Joi.string()
        .max(50)
        .example('rajkot'),
    State : Joi.string()
        .max(50)
        .example('gujarat'),
    Street_name : Joi.string()
        .example('asdmpe'),
    House_number : Joi.string()
        .example('A-45'),
    Mobile : Joi.string()
        .length(10)
        .example('1234567890')
});

const add_address = Joi.object({
    City : Joi.string()
        .max(50)
        .example('rajkot')
        .required(),
    State : Joi.string()
        .max(50)
        .example('gujarat')
        .required(),
    Street_name : Joi.string()
        .example('asdmpe')
        .required(),
    House_number : Joi.string()
        .example('A-45')
        .required(),
    Mobile : Joi.string()
        .length(10)
        .example('1234567890')
});

const pass = Joi.object({
    Password: Joi.string()
        .required()
        .example("Shreya!123"),
    NewPassword: Joi.string()
        .required()
        .example("Shreya@123"),
    ConfirmPassword: Joi.valid(Joi.ref('NewPassword'))
        .required()
})

const rateUp = Joi.object({
    OnTimeArrival: Joi.number()
        .min(0)
        .max(5)
        .required()
        .example("2"),
    Friendlly: Joi.number()
        .min(0)
        .max(5)
        .required()
        .example("3"),
    QualityOfService: Joi.number()
        .min(0)
        .max(5)
        .required()
        .example("2"),
    Comments: Joi.string()
        .example("Good")
});




export const Id = (req:Request,res:Response,next:NextFunction) =>{
    const value = id.validate(parseInt(req.params.id));
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const ReSchedule = (req:Request,res:Response,next:NextFunction) =>{
    const value = reschedule.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        next();
    }
}

export const Cancel = (req:Request,res:Response,next:NextFunction) =>{
    const value = cancle.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Details = (req:Request,res:Response,next:NextFunction) =>{
    const value = details.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Pass = (req:Request,res:Response,next:NextFunction) =>{
    const value = pass.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Update_address = (req:Request,res:Response,next:NextFunction) =>{
    const value = update_address.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Add_address = (req:Request,res:Response,next:NextFunction) =>{
    const value = add_address.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}
export const RateUp = (req:Request,res:Response,next:NextFunction) =>{
    const value = rateUp.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        next();
    }
}