import express from "express";
import { ContactUsRepository } from "../Admin/repository";
import { ContactUsService } from "../Admin/service";
import { Post_valid , Get_valid,Put_valid} from "../Admin/validate";
import { ContactUsController } from "../Admin/controller";

const router: express.Router = express.Router();


const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);


router.post('/contactus',Post_valid,controller.createContactUs);
router.get('/contactus',controller.getContactUs);
router.get('/contactus/:id',Get_valid,controller.getContactUsById);
router.put('/contactus/:id',Get_valid,Put_valid,controller.updateContactUs);
router.delete('/contactus/:id',Get_valid,controller.deleteContactUs)

export = router;