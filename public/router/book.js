"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const book_controller_1 = require("../book/book_controller");
const book_repositry_1 = require("../book/book_repositry");
const book_service_1 = require("../book/book_service");
const book_model_1 = require("../book/book.model");
const express_1 = __importDefault(require("express"));
const encrypt_1 = require("../User/encrypt");
const router = express_1.default.Router();
const repo = new book_repositry_1.BookRepository();
const service = new book_service_1.BookService(repo);
const controller = new book_controller_1.BookController(service);
router.post('/book-service', book_model_1.Postel, encrypt_1.verifyToken, controller.ckeckAvailability);
router.post('/plan', book_model_1.Plan, controller.Schedule_Plan);
module.exports = router;
