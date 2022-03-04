"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsController = void 0;
class ContactUsController {
    constructor(contactusService) {
        this.contactusService = contactusService;
        this.createContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .createContactUs(req.body)
                .then((contactus) => {
                contactus.update({ status: 0 });
                return res.status(200).json({ contactus });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .getContactUs()
                .then((contactus) => {
                return res.status(200).json({ contactus });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContactUsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .getContactUsById(+req.params.id)
                .then((contactus) => {
                if (contactus) {
                    return res.status(200).json({ contactus });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .updateContactUS(req.body, +req.params.id)
                .then((contactus) => {
                return res.status(200).send('update data');
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .deleteContactUs(+req.params.id)
                .then((contactus) => {
                if (contactus > 0) {
                    return res.status(200).json('Delete Data');
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.contactusService = contactusService;
    }
}
exports.ContactUsController = ContactUsController;
