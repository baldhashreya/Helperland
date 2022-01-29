import express from "express";
import { celebrate } from 'celebrate';
const router: express.Router = express.Router();
import { ContactUsRepository } from "./seeders/repository";
import { ContactUsData } from "./seeders/model";
import { ContactUsService } from "./seeders/service";
import { ContactUsController } from "./seeders/controller";

const { update, get, add } = ContactUsData;

const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);


router.use('/contactus',celebrate(add),controller.createContactUs);

export = router;