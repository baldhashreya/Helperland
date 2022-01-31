import express from "express";
import { celebrate } from 'celebrate';
const router: express.Router = express.Router();
import { UserRepository } from "../User/user_repository";
//import { UserData } from "../User/user_model";
import { UserService } from "../User/user_service";
import { UserController } from "../User/user_controller";

const repo: UserRepository = new UserRepository();
const service: UserService= new UserService(repo);
const controller: UserController = new UserController(service);

router.post('/signup',controller.createUser);

export = router;