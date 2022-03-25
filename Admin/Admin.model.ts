const Joi = require('joi')
.extend(require('@joi/date'));

import { Request , Response , NextFunction } from "express";

const serviceRequest = Joi.object({
    ServiceId: Joi.number()
        .example('1002'),
    email: Joi.string()
        .email()
        .example('shreyabaldha0@gmail.com'),
    postelcode: Joi.string()
        .length(6)
        .example('360405'),
    customername: Joi.string()
        .example('shreya baldha'),
    ServiceProvide: Joi.string()
        .example('brinsu Baldha'),
    Status: Joi.number()
        .example('2'),
    paymentStatus: Joi.boolean()
        .example('true'),
    StartDate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .example('12-12-2021'),
    EndDate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .example('12-12-2021')
})

const edit = Joi.object({
    ServiceStartDate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .greater(Date.now())
        .example('12/02/2022'),
    ArrivalTime: Joi.string()
        .example('10:30'),
    SStreet_name: Joi.string()
        .example('name'),
    SHouse_number: Joi.string()
        .example('S-12'),
    SCity: Joi.string()
        .example('Rajkot'),
    SPostelCode: Joi.string()
        .length(6)
        .example('360405'),
    Street_name: Joi.string()
        .example('name'),
    House_number: Joi.string()
        .example('S-12'),
    City: Joi.string()
        .example('Rajkot'),
    PostelCode: Joi.string()
        .length(6)
        .example('360405')
    
})

const user = Joi.object({
    UserName: Joi.string()
        .example('shreya baldha'),
    UserType: Joi.number()
        .example('2'),
    Phone: Joi.string()
        .length(10)
        .example('1234567890'),
    Postelcode: Joi.string()
        .length(6)
        .example('360405'),
    email: Joi.string()
        .email()
        .example('shreyabaldha0@gmail.com'),
    fromdate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .example('12-12-2021'),
    todate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .example('12-12-2021'),
})

const id = Joi.number().required().example(1);

export function User(req: Request, res: Response, next: NextFunction) {
    const value = user.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {

        next();
    }
}


export function Edit(req: Request, res: Response, next: NextFunction) {
    const value = edit.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {

        next();
    }
}

export function Servicerequest(req: Request, res: Response, next: NextFunction) {
    const value = serviceRequest.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {

        next();
    }
}

export function Id(req: Request, res: Response, next: NextFunction) {
    const value = id.validate(parseInt(req.params.id));
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {

        next();
    }
}