import express from "express";
import { celebrate } from 'celebrate';
const router: express.Router = express.Router();
import { UserRepository } from "../User/user_repository";
import { UsersData } from "../User/user_model";
import { UserService } from "../User/user_service";
import { UserController } from "../User/user_controller";

const { update, get, add } = UsersData;

const repo: UserRepository = new UserRepository();
const service: UserService= new UserService(repo);
const controller: UserController = new UserController(service);

router.post('/signup',celebrate(add),controller.createUser);
router.post('/helper',controller.createHelper);
router.post('/reset-password',controller.resetEmail);
router.post('/password-reset/:user_id',celebrate(get),controller.resetpassword);


export = router;