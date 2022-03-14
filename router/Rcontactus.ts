import express from "express";
import { ContactUsRepository } from "../Admin/repository";
import { ContactUsService } from "../Admin/service";
import { Post_valid , Get_valid,Put_valid} from "../Admin/validate";
import { ContactUsController } from "../Admin/controller";

import multer from 'multer';

const stroage = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null,'upload/')
    },
    filename: function(req,file,cd){
        cd(null,file.originalname);
    }
})

const upload = multer({
    storage:stroage,
    fileFilter: function(req,file,cd){
        if(file.mimetype === 'application/pdf' || file.mimetype === 'application/docs'){
            cd(null,true);
        }
        else{
            cd(null,false);
        }
    } 
});
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
 *     example: 'Shreya'
 *    lastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Baldha'
 *    email:
 *     type: string
 *     description: email of the user
 *     example: 'shreyanaldha0@gamil.com'
 *    subjectType:
 *     type: string
 *     description: type of object
 *     example: 'General'
 *    mobilenumber:
 *     type: integer
 *     description: phone number
 *     example: '7487989043'
 *    message:
 *     type: string
 *     description: designation of the employee
 *     example: 'about helperland'
 *    uploadfile:
 *     type: file
 *     description: The file to upload
 */

//ContectUs routes

/**
 * @swagger
 * /tarinee2021/contact/createcontactus:
 *  post:
 *   summary: create user
 *   description: create user for contact
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: succesfully
 *    500:
 *     description: failure 
 */
router.post('/createcontactus',upload.single('uploadfile'),controller.createContactUs);

/**
 * @swagger
 * /tarinee2021/contact/getcontactus:
 *   get:
 *    summary: show ContactUs
 *    description: All ContactUs data
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
 *    summary: show ContactUs Data By Id
 *    description:  ContactUs Data By Id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: Numeric ID of the ContactUs
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
 *    summary: update ContactUs
 *    consumes:
 *     multipart/form-data:
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       require: true
 *       description: id of the ContactUs.
 *       example: 2
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.put('/updatecontactus/:id',upload.single('uploadfile'),controller.updateContactUs);


/**
 * @swagger
 * /tarinee2021/contact/deletecontactus/{id}:
 *   delete:
 *    summary: delete ContactUs
 *    description: delete ContactUs
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       require: true
 *       description: id of the ContactUs.
 *       example: 2
 *    responses:
 *     200:
 *      description: sucess
 *     500:
 *      description: failure
 */

router.delete('/deletecontactus/:id',Get_valid,controller.deleteContactUs)


export = router;