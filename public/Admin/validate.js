"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_valid = exports.Put_valid = exports.Post_valid = void 0;
const model_1 = require("./model");
const Post_valid = (req, res, next) => {
    const value = model_1.ContactUs_Post.validate(req.body);
    if (value.error) {
        res.status(401).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Post_valid = Post_valid;
const Put_valid = (req, res, next) => {
    const value = model_1.ContactUs_Put.validate(req.body);
    if (value.error) {
        res.status(401).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Put_valid = Put_valid;
const Get_valid = (req, res, next) => {
    const value = model_1.ContactUs_Get_id.validate(req.params);
    if (value.error) {
        res.status(401).json(value.error.message);
    }
    else {
        next();
    }
};
exports.Get_valid = Get_valid;
