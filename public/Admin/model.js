"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUs_Put = exports.ContactUs_Get_id = exports.ContactUs_Post = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ContactUs_Post = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    lastName: joi_1.default.string()
        .required()
        .example('Jones')
        .description('lastName of user'),
    email: joi_1.default.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    mobilenumber: joi_1.default.string()
        .required()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    subjecttype: joi_1.default.string()
        .example('general')
        .required()
        .description('Subject type'),
    message: joi_1.default.string()
        .required()
        .max(100)
        .min(10)
        .example('meassge')
        .description('Message'),
    uploadfile: joi_1.default.string()
        .example('abc.jpg')
        .description('upload file'),
});
exports.ContactUs_Get_id = joi_1.default.object({
    id: joi_1.default.number()
        .integer()
        .required()
        .description('Id of User')
});
exports.ContactUs_Put = joi_1.default.object({
    firstName: joi_1.default.string()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    lastName: joi_1.default.string()
        .example('Jones')
        .description('lastName of user'),
    email: joi_1.default.string()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    mobilenumber: joi_1.default.string()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    subjecttype: joi_1.default.string()
        .example('general')
        .description('Subject type'),
    message: joi_1.default.string()
        .max(100)
        .min(10)
        .example('meassge')
        .description('Message'),
    uploadfile: joi_1.default.string()
        .example('abc.jpg')
        .description('upload file'),
});
