import express from "express";
import { ContactUsRepository } from "../Admin/repository";
import { ContactUsService } from "../Admin/service";
import { Post_valid , Get_valid,Put_valid} from "../Admin/validate";
import { ContactUsController } from "../Admin/controller";

const router: express.Router = express.Router();


const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);


router.post('/createcontactus',Post_valid,controller.createContactUs);

router.get('/getcontactus',controller.getContactUs);

router.get('/getcontactus/:id',Get_valid,controller.getContactUsById);

router.put('/updatecontactus/:id',Get_valid,Put_valid,controller.updateContactUs);

router.delete('/deletecontactus/:id',Get_valid,controller.deleteContactUs)


export = router;
