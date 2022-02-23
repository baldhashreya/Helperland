import express from "express";
import { ContactUsRepository } from "../Admin/repository";
import { ContactUsService } from "../Admin/service";
import { Post_valid , Get_valid,Put_valid} from "../Admin/validate";
import { ContactUsController } from "../Admin/controller";

const router: express.Router = express.Router();


const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);

/**
 *@swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    firstName:
 *     type: string
 *     description: first name of the user
 *     example: 'shreya'
 *    lastName:
 *     type: string
 *     description: last name of the user
 *     example: 'baldha'
 *    email:
 *     type: string
 *     description: email of the user
 *     example: 'baldha.shreya027@gmail.com'
 *    subjecttype:
 *     type: string
 *     description: type of object
 *     example: 'inquary'
 *    mobilenumber:
 *     type: string
 *     description: phone number
 *     example: '7487989043'
 *    message:
 *     type: string
 *     description: designation of the employee
 *     example: 'about helperland'
 *    uploadfile:
 *     type: file
 *     description: The file to upload
 *  SendEmail:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email
 *     example: 'baldha.shreya027@gmail.com'
 */

 /**
 * @swagger
 * /tarinee2021/contact/createcontactus:
 *  post:
 *   summary: Create ContactUs
 *   description: Create User for ContactUs
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: user created succesfully
 *    500:
 *     description: failure in creating user
 */

router.post('/createcontactus',Post_valid,controller.createContactUs);

/**
 * @swagger
 * /tarinee2021/contact/getcontactus:
 *   get:
 *    summary: Show  All ContactUs Data 
 *    description: All  data
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */


router.get('/getcontactus',controller.getContactUs);

/**
 * @swagger
 * /tarinee2021/contact/getcontactus/{id}:
 *   get:
 *    summary: Show ContactUs Data By Id
 *    description:  
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the ContactUs to get
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */
router.get('/getcontactus/:id',Get_valid,controller.getContactUsById);

/**
 * @swagger
 * /tarinee2021/contact/updatecontactus/{id}:
 *   put:
 *    summary: Update ContactUs
 *    consumes:
 *     - application/json
 *    produes:
 *     - application/json
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       require: true
 *       description: id of the ContactUs.
 *       example: 2
 *     - in: body
 *       name: body
 *       require: true
 *       description: Body of ContactUs
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */
router.put('/updatecontactus/:id',Get_valid,Put_valid,controller.updateContactUs);

/**
 * @swagger
 * /tarinee2021/contact/deletecontactus/{id}:
 *   delete:
 *    summary: Delete ContactUs
 *    description: Delete ContactUs
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       require: true
 *       description: id of the Contactus.
 *       example: 2
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.delete('/deletecontactus/:id',Get_valid,controller.deleteContactUs)



export = router;
