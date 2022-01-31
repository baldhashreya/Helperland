import express from "express";
import { celebrate } from 'celebrate';
const router: express.Router = express.Router();
import { ContactUsRepository } from "../Admin/repository";
import { ContactUsData } from "../Admin/model";
import { ContactUsService } from "../Admin/service";
import { ContactUsController } from "../Admin/controller";

const { update, get, add } = ContactUsData;

const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);


router.post('/contactus',celebrate(add),controller.createContactUs);

export = router;