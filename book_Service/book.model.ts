import { NextFunction, Request, RequestHandler, Response } from "express";
const Joi = require('joi')
.extend(require('@joi/date'));



const postel = Joi.object({
    postelcode : Joi.string()
        .required()
        .length(6)
        .example('123456')
        .description('postel-code')
});

const plan = Joi.object({
    ServiceStartDate : Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .greater(Date.now())
        .required(),
    ArrivalTime : Joi.string()
        .valid('8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00')
        .required(),
    ServiceHours : Joi.string()
        .required()
        .valid('3.0','3.5','4.0','4.5','5.0','5.5','6.0','6.5','7.0','7.5','8.0','8.5','9.0','9.5','10.0','10.5','11.0','11.5','12.0'),
    ExtraHours : Joi.array()
        .items('Clean cabinet interiors','Cleaning the refrigerator','Cleaning the oven','Washing and drying laundry','Cleaning windows'),
    Discount :Joi.string()
        .valid('H-20','H-25','H-30','H-40','H-50'),
    Comments : Joi.string(),
    HasPets : Joi.boolean() 
        .required()    
});

const add_address = Joi.object({
    City : Joi.string()
        .required()
        .max(50)
        .example('rajkot'),
    State : Joi.string()
        .required()
        .max(50)
        .example('gujarat'),
    Street_name : Joi.string()
        .required()
        .example('asdmpe'),
    House_number : Joi.string()
        .required()
        .example('A-45'),
    Mobile : Joi.string()
        .length(10)
        .example('1234567890')
});

const id =
    Joi.number().required().example(1)

const token = Joi.number().required().example(1)


const payment = Joi.object({
    CardNumber:Joi.string()
        .required()
        .length(16)
        .example(1234123412341234),
    ValidDate:Joi.date()
        .format(['MM/YY','MM-YY'])
        .greater(Date.now())
        .required()
        .example(22/24),
    CCV : Joi.string()
        .length(3)
        .required()
        .example(603)
});


export const Payment:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = payment.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};

export const Postel:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = postel.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
};
export const Plan:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = plan.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}

export const Add_address:RequestHandler = (req:Request,res:Response,next:NextFunction) =>{
    const value = add_address.validate(req.body);
    if(value.error){
        res.status(400).json(value.error.message);
    }
    else{
        
        next();
    }
}



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

