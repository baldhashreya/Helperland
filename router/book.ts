import { BookController } from "../book/book_controller";
import { BookRepository } from "../book/book_repositry";
import { BookService } from "../book/book_service";
import { Postel,Plan, Add_address,Id,Token, Payment } from "../book/book.model";
import express from "express";
import { verifyToken } from "../User/encrypt";


const router: express.Router = express.Router();



const repo: BookRepository = new BookRepository();
const service: BookService= new BookService(repo);
const controller: BookController = new BookController(service);

router.post('/book-service',Postel,verifyToken,controller.ckeckAvailability);
router.post('/plan/:id',Plan,verifyToken,controller.Schedule_Plan);
router.get('/details/:id',Id,verifyToken,controller.Address_details);
router.post('/add_user/:id',Id,Add_address,verifyToken,controller.add_address);
router.get('/add_user/:token/:id',Token,Id,verifyToken,controller.set_address);
router.post('/payment/:id',Id,verifyToken,Payment,controller.payment);
export = router;