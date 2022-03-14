import { Udashbord } from "../User_Dashbord/Udashbord_controller";
import { Udashbord_repo } from "../User_Dashbord/udashbord_repo";
import { Udashbord_service } from "../User_Dashbord/Udashbord_service";
import express from "express";
import { verifyToken } from "../User/encrypt";
import { Add_address, Cancel, Details, Id, Pass, RateUp, ReSchedule, Update_address } from "../User_Dashbord/udashbord_model";
const router: express.Router = express.Router();

const repo: Udashbord_repo = new Udashbord_repo();
const service: Udashbord_service= new Udashbord_service(repo);
const controller: Udashbord = new Udashbord(service);

/**
 * @swagger
 * definitions:
 *  ReSchedule:
 *   type: object
 *   properties:
 *    date:
 *     type: date
 *     description: Update date
 *     example: "28-02-2022" 
 *    ArrivalTime:
 *     type: string
 *     description: Update time
 *     example: "10:30"
 *  Cancel:
 *   type: object
 *   properties:
 *    reason:
 *     type: string
 *     description: Reason for Canceling the Service
 *     example: "Do not Want Service Request"
 *  Edit:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: strig
 *     description: First Name 
 *     example: "shreya"
 *    LastName:
 *     type: string
 *     description: Last Name
 *     example: "Baldha"
 *    email:
 *     type: string
 *     description: Email
 *     example: "shreyabaldha0@gmail.com"
 *    MobileNumber:
 *     type: string
 *     description: MobileNumber
 *     example: "7487989043"
 *    Date_Of_Birth:
 *     type: string
 *     description: Date of Birth
 *     example: "27-01-2001"
 *    LanguageId:
 *     type: string
 *     description: LanguageId
 *     example: 1
 *  Add_Address:
 *   type: object
 *   properties:
 *    City:
 *     type: string
 *     description: City of User
 *     example: 'rajkot'
 *    State:
 *     type: string
 *     description: State of User
 *     example: 'Gujarat'
 *    Street_name:
 *     type: string
 *     description: Street_name of User
 *     example: 'Bhakti nagar'
 *    House_number:
 *     type: string
 *     description: House_number of User
 *     example: 'S-12'
 *  change-password:
 *   type: object 
 *   properties: 
 *    Password:
 *     type: string
 *     description: OldPassword
 *     example: "Shreya!123"
 *    NewPassword:
 *     type: string
 *     description: NewPassword
 *     example: "Shreya!123"
 *    ConfirmPassword:
 *     type: string
 *     description: ConfirmPassword
 *     example: "Shreya!123"
 *  RateUp: 
 *   type: object
 *   properties:
 *    OnTimeArrival:
 *     type: integer
 *     description: OnTimeArrival
 *     example: 1
 *    Friendlly:
 *     type: integer
 *     description: Friendlly
 *     example: 1
 *    QualityOfService:
 *     type: integer
 *     description: QualityOfService
 *     example: 1
 *    Comments:
 *     type: string
 *     description: Comments
 *     example: "Good"
 */

 
     
/**
 * @swagger
 * /trainee2021/customer/servicerequest:
 *   get:
 *    summary: User Dashboard
 *    description: User Dashboard 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/servicerequest',verifyToken,controller.verify,controller.dashboard);

/**
 * @swagger
 * /trainee2021/customer/servicerequest/service-details/{id}:
 *   get:
 *    summary: User Service Details
 *    description: User Service Details
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the serviceId
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/servicerequest/service-details/:id',verifyToken,Id,controller.verify,controller.ServiceDetails);

/**
 * @swagger
 * /trainee2021/customer/servicerequest/reschedule/{id}:
 *   put:
 *    summary: User Reschedule Service 
 *    description: User Reschedule Service
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the serviceId
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ReSchedule'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/servicerequest/reschedule/:id',verifyToken,Id,ReSchedule,controller.verify,controller.reSchedule);

/**
 * @swagger
 * /trainee2021/customer/servicerequest/cancel/{id}:
 *   post:
 *    summary: User Cancel Service 
 *    description: User Cancel Service
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the serviceId
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Cancel'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/servicerequest/cancel/:id',verifyToken,Id,Cancel,controller.verify,controller.CancelService);

/**
 * @swagger
 * /trainee2021/customer/service-history:
 *   get:
 *    summary: User Service-History
 *    description: User Service-History
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */
router.get('/service-history',verifyToken,controller.verify,controller.Service_History);

/**
 * @swagger
 * /trainee2021/customer/service-history/export:
 *   get:
 *    summary: User Service-History export
 *    description: User Service-History export
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/service-history/export',verifyToken,controller.verify,controller.Export);


/**
 * @swagger
 * /trainee2021/customer/service-history/RateUp/{id}:
 *   post:
 *    summary: User Rate-Up form Helper 
 *    description: User Rate-up from Helper
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the serviceId
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/RateUp'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.post('/service-history/RateUp/:id',verifyToken,Id,RateUp,controller.verify,controller.RateUp);

/**
 * @swagger
 * /trainee2021/customer/my-account:
 *   get:
 *    summary: User Account Details
 *    description: User Account Details
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/my-account',verifyToken,controller.verify,controller.mysetting);

/**
 * @swagger
 * /trainee2021/customer/my-account/edit:
 *   put:
 *    summary: User Account Details Edit
 *    description: User Account Details Edit
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Edit'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/my-account/edit',verifyToken,Details,controller.verify,controller.change_details);

/**
 * @swagger
 * /trainee2021/customer/my-account/address:
 *   get:
 *    summary: User Addresses
 *    description: User Addresses
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/my-account/address',verifyToken,controller.verify,controller.address);

/**
 * @swagger
 * /trainee2021/customer/my-account/add-address:
 *   post:
 *    summary: User add Addresses
 *    description: User add Addresses
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Add_Address'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/my-account/add-address',verifyToken,Add_address,controller.verify,controller.add_user_address);

/**
 * @swagger
 * /trainee2021/customer/my-account/change-address/{id}:
 *   put:
 *    summary: User Update Addresses
 *    description: User Update Addresses
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the AddressId
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Add_Address'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/my-account/change-address/:id',verifyToken,Id,Update_address,controller.verify,controller.update_address);

/**
 * @swagger
 * /trainee2021/customer/my-account/delete-address/{id}:
 *   delete:
 *    summary: User Delete Addresses
 *    description: User Delete Addresses
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the AddressId
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */
router.delete('/my-account/delete-address/:id',verifyToken,Id,controller.verify,controller.Delete_address);

/**
 * @swagger
 * /trainee2021/customer/my-account/change-password:
 *   put:
 *    summary: User ChangePassword
 *    description: User ChangePassword
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/change-password'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/my-account/change-password',verifyToken,Pass,controller.verify,controller.PassWord)

/**
 * @swagger
 * /trainee2021/customer/favourite-pros:
 *   get:
 *    summary: Favourite User
 *    description: Favourite User
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/favourite-pros',verifyToken,controller.verify,controller.favourite);

/**
 * @swagger
 * /trainee2021/customer/favourite-pros/favourite/{id}:
 *   get:
 *    summary: user set favourite Helper
 *    description: user set favourite Helper
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Helper
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/favourite-pros/favourite/:id',verifyToken,Id,controller.verify,controller.Favourite);

/**
 * @swagger
 * /trainee2021/customer/favourite-pros/Unfavourite/{id}:
 *   get:
 *    summary: user set Unfavourite Helper
 *    description: user set Unfavourite Helper
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Helper
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/favourite-pros/Unfavourite/:id',verifyToken,Id,controller.verify,controller.UnFavourite);
// router.get('/favourite-pros/UnBlock/:id',verifyToken,Id,controller.unblock);
// router.get('/favourite-pros/Block/:id',verifyToken,Id,controller.Block);
export  = router;