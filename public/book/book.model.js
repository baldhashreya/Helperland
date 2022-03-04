"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = exports.Postel = void 0;
const Joi = require('joi')
    .extend(require('@joi/date'));
const postel = Joi.object({
    postelcode: Joi.string()
        .required()
        .length(6)
        .example('123456')
        .description('postel-code')
});
const plan = Joi.object({
    ServiceStartDate: Joi.date()
        .format(['DD/MM/YYYY', 'DD-MM-YYYY'])
        .greater(Date.now())
        .required(),
    ArrivalTime: Joi.string()
        .valid('8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00')
        .required(),
    ServiceHours: Joi.string()
        .required()
        .valid('3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'),
    ExtraHours: Joi.array()
        .items('Clean cabinet interiors', 'Cleaning the refrigerator', 'Cleaning the oven', 'Washing and drying laundry', 'Cleaning windows'),
    Comments: Joi.string(),
    HasPets: Joi.boolean()
});
const Postel = (req, res, next) => {
    const value = postel.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Postel = Postel;
const Plan = (req, res, next) => {
    const value = plan.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Plan = Plan;
