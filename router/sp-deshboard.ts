import express from "express";
import { HelperController } from "../Helper/helperController";
import { HelperRepo } from "../Helper/helperrepo";
import { HelperService } from "../Helper/helperService";
import { verifyToken } from "../User/encrypt";


const repo:HelperRepo  = new HelperRepo();
const service:HelperService = new HelperService(repo);
const controller:HelperController = new HelperController(service);
const router: express.Router = express.Router();

router.get('/sp-new-service-requests',verifyToken,controller.new_Request);
router.get('/sp-new-service-requests/Accept/:id',verifyToken,controller.Accept_Service);

export =  router;