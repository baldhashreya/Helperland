import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Contact Us Id')
};

export const UsersData = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            firstName: Joi.string()
                .required()
                .max(100),
            lastName: Joi.string()
                .required()
                .max(100),
            email: Joi.string()
                .email()
                .max(100)
                .required(),
            mobilenumber: Joi.string()
                .max(20)
                .required(),
            password: Joi.string()
                .max(20)
                .required(),
            confirmPassword:Joi.string()
                .required()
                .valid(Joi.ref('password'))
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
            password: Joi.string()
            })
    }
};