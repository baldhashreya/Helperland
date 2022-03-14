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

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'shreya'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'baldha'
 *    email:
 *     type: string
 *     description: email of user
 *     example: 'shreyabaldha0@gmail.com'
 *    MobileNumber:
 *     type: string
 *     description: mobile number of user
 *     example: '7487989043'
 *    Password:
 *     type: string
 *     description: password of user
 *     example: 'Shreya!123'
 *    ConfirmPassword:
 *     type: strig
 *     description: ConfirmPassword
 *     example: 'Shreya!123'
 *  Login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of user
 *     example: 'shreyabaldha0@gmail.com'
 *    Password:
 *     type: string
 *     description: password of user
 *     example: 'Shreya!123'
 *  Link:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of user
 *     example: 'shreyabaldha0@gmail.com'
 *  Password:
 *   type: object
 *   properties:
 *    Password:
 *     type: string
 *     description: password of user
 *     example: 'Shreya!123'
 *    ConfirmPassword:
 *     type: strig
 *     description: ConfirmPassword
 *     example: 'Shreya!123'
 * 
 *    
 */


/**
 * @swagger
 * /trainee2021/userRegistration:
 *   post:
 *    summary: User SignUp
 *    description: User SignUp
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/userRegistration',sigup,controller.createUser);

/**
 * @swagger
 * /trainee2021/sp-sign-up:
 *   post:
 *    summary: Helper SignUp
 *    description: Helper SignUp
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/sp-sign-up',sigup,controller.createHelper);

/**
 * @swagger
 * /trainee2021/login:
 *   post:
 *    summary: User Login
 *    description: User Login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Login'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.post('/login',Login,controller.login);
router.get('/conform/:id',controller.conform);

/**
 * @swagger
 * /trainee2021/logout:
 *   get:
 *    summary: LogOut
 *    description: LogOut 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/logout',verifyToken,controller.logout);

/**
 * @swagger
 * /trainee2021/reset-password:
 *   post:
 *    summary: ResetPassword Link
 *    description: ResetPassword Link
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Link'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/reset-password',link,verifyToken,controller.resetEmail);

/**
 * @swagger
 * /trainee2021/password-reset/{user_id}/{token}:
 *   post:
 *    summary: ResetPassword 
 *    description: ResetPassword
 *    parameters:
 *     - in: path
 *       name: user_id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id
 *     - in: path
 *       name: token
 *       schema:
 *        type: string
 *       required: true
 *       description: token
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Password'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.post('/password-reset/:user_id/:token',Password,verifyToken,controller.resetpassword);


export = router;