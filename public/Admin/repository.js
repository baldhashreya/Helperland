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
exports.ContactUsRepository = void 0;
const interface_1 = require("../models/interface");
class ContactUsRepository {
    createContactUs(contactus) {
        return __awaiter(this, void 0, void 0, function* () {
            return interface_1.dbContact.ContactUs.create(contactus);
        });
    }
    getContactUsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return interface_1.dbContact.ContactUs.findOne({ where: { id: id } });
        });
    }
    getContactUs() {
        return __awaiter(this, void 0, void 0, function* () {
            return interface_1.dbContact.ContactUs.findAll();
        });
    }
    updateContactUs(contactus, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return interface_1.dbContact.ContactUs.update(contactus, { where: { id: id } });
        });
    }
    deleteContactUs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return interface_1.dbContact.ContactUs.destroy({ where: { id: id } });
        });
    }
}
exports.ContactUsRepository = ContactUsRepository;
