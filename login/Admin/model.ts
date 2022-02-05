import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Contact Us Id')
};

export const ContactUsData = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            firstName: Joi.string()
                .required()
                .max(25),
            lastName: Joi.string()
                .required()
                .max(25),
            email: Joi.string()
                .email()
                .max(200)
                .required(),
            mobilenumber: Joi.string()
                .max(20)
                .required(),
            message:Joi.string()
                .max(100)    
                .required(),
            uploadfile:Joi.string()
                .optional(),
            subjecttype:Joi.string() .required()
        })
    },
    update: {
        params: params,
        body: Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string()
                .email(),
            mobilenumber: Joi.string(),
            message:Joi.string(),
            uploadfile:Joi.string(),
            subjecttype:Joi.string()
            })
    }
};