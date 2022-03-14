import { BookController } from "../book_Service/book_controller";
import { BookRepository } from "../book_Service/book_repositry";
import { BookService } from "../book_Service/book_service";
import { Postel,Plan, Add_address,Id,Token, Payment } from "../book_Service/book.model";
import express from "express";
import { verifyToken } from "../User/encrypt";


const router: express.Router = express.Router();



const repo: BookRepository = new BookRepository();
const service: BookService= new BookService(repo);
const controller: BookController = new BookController(service);

/**
 * @swagger
 * definitions:
 *  PostelCode:
 *   type: object
 *   properties:
 *    postelcode:
 *     type: string
 *     description: User Enter postelcode
 *     example: '360405'
 *  Schedule_Plan:
 *   type: object
 *   properties:
 *    ServiceStartDate:
 *     type: date
 *     description: user want to book service date
 *     example: '25-03-2022' 
 *    ArrivalTime:
 *     type: string
 *     description: Arrival time
 *     example: '11:00' 
 *    ServiceHours:
 *     type: string
 *     description: Basic Hours
 *     example: '4.5'
 *    ExtraHours:
 *     type: array
 *     description: extra hours
 *     example: ["Clean cabinet interiors","Washing and drying laundry","Cleaning windows"]
 *    Discount:
 *     type: string
 *     description: Discount
 *     example: 'H-25'
 *    Comments:
 *     type: string
 *     description: Comment
 *     example: "hii"
 *    HasPets:
 *     type: boolean
 *     desription: pets or not
 *     example: "true"
 *  Add_Address:
 *   type: object
 *   properties:
 *    City:
 *     type: string
 *     description: City of User
 *     example: "Rajkot"
 *    State:
 *     type: string
 *     description: State of User
 *     example: "Gujarat"
 *    Street_name:
 *     type: string
 *     description: Street_name of User
 *     example: "limada chok"
 *    House_number:
 *     type: string
 *     description: House number of User
 *     example: "S-12"
 *    Mobile:
 *     type: string
 *     description: House Mobile Number of User
 *     example: "9904266342"
 *  Payment:
 *   type: object
 *   properties:
 *    CardNumber:
 *     type: string
 *     description: CardNumber
 *     example: "1234123412341234"
 *    ValidDate:
 *     type: date
 *     description: validateDate
 *     example: "12/22"
 *    CCV:
 *     type: string
 *     description: CCV number
 *     example: "603"
 */ 
  
 
/**
 * @swagger
 * /trainee2021/book-service/postal-code:
 *   post:
 *    summary: PostelCode
 *    description: PostelCode
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/PostelCode'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.post('/postal-code',Postel,verifyToken,controller.verify,controller.ckeckAvailability);

/**
 * @swagger
 * /trainee2021/book-service/plan/{id}:
 *   post:
 *    summary: Schedule_Plan
 *    description: Schedule_Plan
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Schedule_Plan'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.post('/plan/:id',Plan,verifyToken,controller.verify,controller.Schedule_Plan);

/**
 * @swagger
 * /trainee2021/book-service/details/{id}:
 *   get:
 *    summary: User All Address
 *    description: User All Address
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/details/:id',Id,verifyToken,controller.verify,controller.Address_details);

/**
 * @swagger
 * /trainee2021/book-service/add_address/{id}:
 *   post:
 *    summary: Add_Address for Book Service
 *    description: Add_Address for Book Service
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id
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


router.post('/add_address/:id',Id,Add_address,verifyToken,controller.verify,controller.add_address);

/**
 * @swagger
 * /trainee2021/book-service/set_address/{user_id}/{Address_id}:
 *   get:
 *    summary: User set Address for Book service
 *    description: User set Address for Book service
 *    parameters:
 *     - in: path
 *       name: user_id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the user id
 *     - in: path
 *       name: Address_id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the Address_id 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/set_address/:token/:id',Token,Id,verifyToken,controller.verify,controller.set_address);

/**
 * @swagger
 * /trainee2021/book-service/set-fev/{id}:
 *   get:
 *    summary: Find fevourite service Provider
 *    description: Find fevourite service Provider
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/set-fev/:id',verifyToken,Id,controller.verify,controller.set_fav);

/**
 * @swagger
 * /trainee2021/book-service/set-fev/{id}/{token}:
 *   get:
 *    summary: set fevourite service Provider
 *    description: set fevourite service Provider
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id
 *     - in: path
 *       name: token
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the ServiceId 
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.get('/set-fev/:id/:token',verifyToken,Id,controller.verify,controller.set_helper);

/**
 * @swagger
 * /trainee2021/book-service/payment/{id}:
 *   post:
 *    summary: Payment
 *    description: Payment
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the id
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Payment'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.post('/payment/:id',Id,verifyToken,Payment,controller.verify,controller.payment);

export = router;