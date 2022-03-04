import express, { NextFunction, Request,Response } from "express";
const router: express.Router = express.Router();
import { UserRepository } from "../User/user_repository";
import { link, Login, Password, sigup } from "../User/user_model";
import { UserService } from "../User/user_service";
import { UserController } from "../User/user_controller";
import {verifyToken} from "../User/encrypt";

const repo: UserRepository = new UserRepository();
const service: UserService= new UserService(repo);
const controller: UserController = new UserController(service);

router.post('/userRegistration',sigup,controller.createUser);

router.post('/sp-sign-up',sigup,controller.createHelper);

router.post('/login',Login,controller.login);
router.get('/conform/:id',controller.conform);

router.get('/logout',controller.logout);

router.post('/reset-password',link,verifyToken,controller.resetEmail);

router.post('/password-reset/:user_id/:token',Password,verifyToken,controller.resetpassword);


export = router;