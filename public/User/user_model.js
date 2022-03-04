"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = exports.link = exports.Login = exports.sigup = void 0;
const joi_1 = __importDefault(require("joi"));
const SignUp = joi_1.default.object({
    FirstName: joi_1.default.string()
        .required()
        .max(25)
        .example('Max')
        .description('firstName of user'),
    LastName: joi_1.default.string()
        .required()
        .example('Jones')
        .description('lastName of user'),
    email: joi_1.default.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    MobileNumber: joi_1.default.string()
        .required()
        .length(10)
        .example('0123456789')
        .description('mobile number'),
    Password: joi_1.default.string()
        .required()
        .example('Shreya!123')
        .description('password'),
    ConfirmPassword: joi_1.default.valid(joi_1.default.ref('Password'))
        .required()
});
const pass = joi_1.default.object({
    Password: joi_1.default.string()
        .required()
        .example('Shreya!123')
        .description('password'),
    ConfirmPassword: joi_1.default.valid(joi_1.default.ref('Password'))
        .required()
});
const login = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user'),
    Password: joi_1.default.string()
        .required()
        .example('Shreya!123')
        .description('password')
});
const link_send = joi_1.default.object({
    email: joi_1.default.string()
        .required()
        .email()
        .example('abc@gmail.com')
        .description('email of user')
});
const sigup = (req, res, next) => {
    const value = SignUp.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.sigup = sigup;
const Login = (req, res, next) => {
    const value = login.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Login = Login;
const link = (req, res, next) => {
    const value = link_send.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.link = link;
const Password = (req, res, next) => {
    const value = pass.validate(req.body);
    if (value.error) {
        res.status(400).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Password = Password;
