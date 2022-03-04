import { Udashbord } from "../User_Dashbord/Udashbord_controller";
import { Udashbord_repo } from "../User_Dashbord/udashbord_repo";
import { Udashbord_service } from "../User_Dashbord/Udashbord_service";
import express from "express";
import { verifyToken } from "../User/encrypt";
import { Cancel, Details, Id, Pass, RateUp, ReSchedule, Update_address } from "../User_Dashbord/udashbord_model";
const router: express.Router = express.Router();

const repo: Udashbord_repo = new Udashbord_repo();
const service: Udashbord_service= new Udashbord_service(repo);
const controller: Udashbord = new Udashbord(service);



router.get('/servicerequest',verifyToken,controller.dashboard);
router.get('/servicerequest/service-details/:id',verifyToken,Id,controller.ServiceDetails);
router.post('/servicerequest/reschedule/:id',verifyToken,Id,ReSchedule,controller.reSchedule);
router.post('/servicerequest/cancel/:id',verifyToken,Id,Cancel,controller.CancelService);
router.get('/service-history',verifyToken,controller.Service_History);
router.get('/service-history/export',verifyToken,controller.Export);
router.post('/service-history/RateUp/:id',verifyToken,Id,RateUp,controller.RateUp);
router.get('/my-account',verifyToken,controller.mysetting);
router.post('/my-account/edit',verifyToken,Details,controller.change_details);
router.get('/my-account/address',verifyToken,controller.address);
router.post('/my-account/add-address',verifyToken,controller.add_user_address);
router.post('/my-account/change-address/:id',verifyToken,Id,Update_address,controller.update_address);
router.get('/my-account/delete-address/:id',verifyToken,Id,controller.Delete_address);
router.post('/my-account/change-password',verifyToken,Pass,controller.PassWord)
router.get('/favourite-pros',verifyToken,controller.favourite);
router.get('/favourite-pros/favourite/:id',verifyToken,Id,controller.Favourite);
router.get('/favourite-pros/Unfavourite/:id',verifyToken,Id,controller.UnFavourite);
router.get('/favourite-pros/UnBlock/:id',verifyToken,Id,controller.unblock);
router.get('/favourite-pros/Block/:id',verifyToken,Id,controller.Block);
export  = router;