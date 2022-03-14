import express from "express";
import { HelperController } from "../Helper/helperController";
import { Id, Setting } from "../Helper/helpermodel";
import { HelperRepo } from "../Helper/helperrepo";
import { HelperService } from "../Helper/helperService";
import { verifyToken } from "../User/encrypt";
import { Pass } from "../User_Dashbord/udashbord_model";


const repo:HelperRepo  = new HelperRepo();
const service:HelperService = new HelperService(repo);
const controller:HelperController = new HelperController(service);
const router: express.Router = express.Router();

/**
 * @swagger
 *  definitions:
 *   Setting:
 *    type: object
 *    properties:
 *     FirstName:
 *      type: string
 *      description: Helper First Name
 *      example: "Prachi"
 *     LastName:
 *      type: string
 *      description: Helper Last Name
 *      example: "Goswami"
 *     email:
 *      type: string
 *      description: Helper email
 *      example: "seetabalbha@gmail.com"
 *     MobileNumber:
 *      type: string
 *      description: Helper Mobile Number
 *      example: "7487989043"
 *     Date_Of_Birth:
 *      type: string
 *      description: Helper Date_of_Brith
 *      example: "27/01/2001"
 *     NationalityId:
 *      type: integer
 *      description: Helper Nationality
 *      example: "1"
 *     Gender:
 *      type: integer
 *      description: Helper Gender
 *      example: "1"
 *     User_Profile_Picture:
 *      type: integer
 *      description: Helper Picture
 *      example: "1"
 *     Street:
 *      type: string
 *      description: Helper Street
 *      example: "Bhakti Nagar"
 *     House_Number:
 *      type: string
 *      description: Helper House_Number
 *      example: "S-10"
 *     PostelCode:
 *      type: string
 *      description: Helper PostelCode
 *      example: "360405"
 *     City:
 *      type: string
 *      description: Helper City
 *      example: "Rajkot"
 *   Pass:
 *    type: object
 *    properties:
 *     Password:
 *      type: string
 *      description: Helper OldPassword
 *      example: "Shreya!123"
 *     NewPassword:
 *      type: string
 *      description: Helper NewPassword
 *      example: "Shreya!123"
 *     ConfirmPassword:
 *      type: string
 *      description: Helper ConfirmPassword
 *      example: "Shreya!123"
 */

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-new-service-requests:
 *   get:
 *    summary: New Service Request
 *    description: New Service Request 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/sp-new-service-requests',verifyToken,controller.Verify,controller.new_Request);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-new-service-requests/Accept/{id}:
 *   get:
 *    summary: New Service Request Accept
 *    description: New Service Request Accept 
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Service id 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/sp-new-service-requests/Accept/:id',verifyToken,Id,controller.Verify,controller.Accept_Service);

/**
 * @swagger
 * /trainee2021/sp-dashboard/Details/{id}:
 *   get:
 *    summary: Service Details
 *    description: Service Details 
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Service id 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/Details/:id',verifyToken,Id,controller.Verify,controller.Details);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-upcoming-requests:
 *   get:
 *    summary: UpComing Service Request
 *    description: Upcoming Service Request 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-upcoming-requests',verifyToken,controller.Verify,controller.up_comnig);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-upcoming-requests/complete/{id}:
 *   get:
 *    summary: Complete Service Request
 *    description: Complete Service Request 
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Service id
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-upcoming-requests/complete/:id',Id,verifyToken,controller.Verify,controller.complete);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-upcoming-requests/cancel/{id}:
 *   get:
 *    summary: Cancel Service Request
 *    description: Cancel Service Request 
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Service id
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-upcoming-requests/cancel/:id',verifyToken,Id,controller.Verify,controller.cancel);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-service-history:
 *   get:
 *    summary:  Service History
 *    description:  Service History 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-service-history',verifyToken,controller.Verify,controller.Service_history);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-service-history/export:
 *   get:
 *    summary:  Service History Export
 *    description:  Service History Export 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-service-history/export',verifyToken,controller.Verify,controller.export);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-my-ratings:
 *   get:
 *    summary:  Service Rating
 *    description:  Service Rating
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-my-ratings',verifyToken,controller.Verify,controller.rating)

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-my-account:
 *   get:
 *    summary:  Service Provider Account
 *    description:  Service Provider Account
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-my-account',verifyToken,controller.Verify,controller.mysetting)

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-my-account/edit:
 *   put:
 *    summary:  Service Provider Account Details Update
 *    description:  Service Provider Account Details Update
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Setting'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/sp-my-account/edit',verifyToken ,Setting, controller.Verify,controller.mysetting_update);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-my-account/changePassword:
 *   put:
 *    summary:  Service Provider Account Change Password
 *    description:  Service Provider Account Change Password
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Pass'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/sp-my-account/changePassword',verifyToken,Pass,controller.Verify,controller.PassWord);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-block-customer:
 *   get:
 *    summary:  Service Provider Block Page
 *    description:  Service Provider Block Page
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-block-customer',verifyToken,controller.Verify,controller.block_customer_Page);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-block-customer/block/{id}:
 *   get:
 *    summary: Block Customer
 *    description: Block Customer
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the UserId
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-block-customer/block/:id',verifyToken,Id,controller.Verify,controller.block_customer);

/**
 * @swagger
 * /trainee2021/sp-dashboard/sp-block-customer/unblock/{id}:
 *   get:
 *    summary: UnBlock Customer
 *    description: UnBlock Customer
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the UserId
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/sp-block-customer/unblock/:id',verifyToken,Id,controller.Verify,controller.Unblock_customer);

export =  router;