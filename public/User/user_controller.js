"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const send_mail_1 = __importDefault(require("./send-mail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const encrypt_1 = require("./encrypt");
dotenv_1.default.config();
require('dotenv').config();
class UserController {
    constructor(UserService) {
        this.UserService = UserService;
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.UserService
                .getUsersByemail(req.body.email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    return res.status(201).json("User already sign up with this mail id");
                }
                return this.UserService
                    .createUser(req.body)
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    const pass = yield (0, encrypt_1.encrypt)(req.body.Password);
                    user.update({ RoleId: 2, Status: 0, CreateDate: new Date(), IsApprove: false, Password: pass });
                    const link = `${process.env.BASE_URL}/conform/${user.id}`;
                    (0, send_mail_1.default)(user.email, "conformation User", link);
                    return res.status(200).json('check your mail for confomation');
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json("Error");
                });
            }))
                .catch((err) => {
                console.log(err);
                return res.status(500).json("Error");
            });
        });
        this.createHelper = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.UserService
                .getUsersByemail(req.body.email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return this.UserService
                        .createUser(req.body)
                        .then((user) => __awaiter(this, void 0, void 0, function* () {
                        const pass = yield (0, encrypt_1.encrypt)(user.Password);
                        user.update({ RoleId: 3, Status: 0, CreateDate: new Date(), IsApprove: false, Password: pass, Zipcode: "360405" });
                        const link = `${process.env.BASE_URL}/conform/${user.id}`;
                        (0, send_mail_1.default)(user.email, "conformation Helper", link);
                        return res.status(200).json('check your mail for conformation');
                    }))
                        .catch((error) => {
                        return res.status(500).json({
                            error: error
                        });
                    });
                }
                else {
                    return res.status(201).json("Helper already signup");
                }
            }))
                .catch((err) => {
                console.log("Error" + err);
                return res.status(500).json("Error");
            });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.UserService
                .getUsersByemail(req.body.email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    if (user.Status == 1) {
                        return res.status(201).json("user already login");
                    }
                    if (user.IsApprove == false) {
                        return res.status(201).json("User not verify first verify yourself");
                    }
                    const pass = (0, encrypt_1.decrypt)(req.body.Password, user.Password);
                    if (!pass) {
                        console.log("passwars incorrect");
                        return res.status(401).json("password do not match");
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({
                            name: user.FirstName,
                            email: user.email,
                            userId: user.id
                        }, `${process.env.JWT_KEY}`, {
                            expiresIn: "7d"
                        });
                        res.cookie('helperland', token);
                        user.update({ Status: 1 });
                        return res.status(200).json({ message: "login done" });
                    }
                }
                else {
                    return res.status(401).json("email not found");
                }
            })).catch((err) => {
                console.log(err);
                return res.status(500).json('error');
            });
        });
        this.conform = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.UserService
                .getUsersById(+req.params.id)
                .then((user) => {
                if (!user) {
                    return res.status(404).json('link not valid');
                }
                user.update({ IsApprove: true });
                return res.status(200).json('conform user');
            });
        });
        this.resetEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.UserService
                .getUsersByemail(req.body.email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return res.status(400).json("user with given email doesn't exist");
                }
                const link = `${process.env.BASE_URL}/password-reset/${user.id}/${req.cookies.helperland}`;
                (0, send_mail_1.default)(user.email, "Password reset", link);
                return res.status(200).json("check your email");
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json("An error occured");
            });
        });
        this.resetpassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.user_id);
            const token = req.params.token;
            return this.UserService
                .getUsersById(id)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return res.status(400).json("invalid link");
                }
                if (token !== req.cookies.helperland) {
                    return res.status(400).json("invalid token");
                }
                const pass = yield (0, encrypt_1.encrypt)(req.body.Password);
                user.update({ Password: pass })
                    .then(data => {
                    console.log("password updata : " + data);
                    return res.status(200).json("password reset sucessfully");
                })
                    .catch((err) => {
                    console.log("Error:" + err);
                    return res.status(500).json("Error");
                });
            }))
                .catch((err) => {
                console.log("Error:" + err);
                return res.status(500).json("Error");
            });
        });
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.helperland;
            const decode = (0, jwt_decode_1.default)(token);
            console.log(decode.userId);
            return res.status(200).json({ token });
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            return this.UserService
                .getUsersByemail(email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    if (user.Status == 0) {
                        return res.status(201).json("user all ready logout");
                    }
                    res.cookie('helperland', '', { maxAge: 1 });
                    yield user.update({ Status: 0 });
                    return res.status(200).json('logout');
                }
                else {
                    return res.status(401).json('email not found');
                }
            }))
                .catch((err) => {
                console.log(err);
                return res.status(500).json("Error");
            });
        });
        this.UserService = UserService;
    }
}
exports.UserController = UserController;
