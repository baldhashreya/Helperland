import Joi from "joi";

export const ContactUs_Post =  Joi.object({
    firstName: Joi.string()
        .required()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    lastName: Joi.string()
        .required()
        .example('Jones')
        .description('lastName of user'),
    email: Joi.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    mobilenumber: Joi.string()
        .required()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    subjecttype: Joi.string()
        .example('general')
        .required()
        .description('Subject type'), 
    message: Joi.string()
        .required()
        .max(100)
        .min(10)
        .example('meassge')
        .description('Message'), 
    isDeleted : Joi.boolean()
        .description("Boolean")
});

export const ContactUs_Get_id = Joi.object( {
    id : Joi.number()
        .integer()
        .required()
        .description('Id of User')
} ); 

export const ContactUs_Put =  Joi.object({
    firstName: Joi.string()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    lastName: Joi.string()
        .example('Jones')
        .description('lastName of user'),
    email: Joi.string()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    mobilenumber: Joi.string()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    subjecttype: Joi.string()
        .example('general')
        .description('Subject type'), 
    message: Joi.string()
        .max(100)
        .min(10)
        .example('meassge')
        .description('Message'), 
    uploadfile: Joi.string()
        .example('abc.jpg')
        .description('upload file'),
});



