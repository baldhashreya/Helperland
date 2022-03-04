"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const repository_1 = require("../Admin/repository");
const service_1 = require("../Admin/service");
const validate_1 = require("../Admin/validate");
const controller_1 = require("../Admin/controller");
const router = express_1.default.Router();
const repo = new repository_1.ContactUsRepository();
const service = new service_1.ContactUsService(repo);
const controller = new controller_1.ContactUsController(service);
router.post('/contactus', validate_1.Post_valid, controller.createContactUs);
router.get('/contactus', controller.getContactUs);
router.get('/contactus/:id', validate_1.Get_valid, controller.getContactUsById);
router.put('/contactus/:id', validate_1.Get_valid, validate_1.Put_valid, controller.updateContactUs);
router.delete('/contactus/:id', validate_1.Get_valid, controller.deleteContactUs);
module.exports = router;
