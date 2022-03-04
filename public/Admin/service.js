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
exports.ContactUsService = void 0;
class ContactUsService {
    constructor(contactusRepository) {
        this.contactusRepository = contactusRepository;
        this.contactusRepository = contactusRepository;
    }
    createContactUs(contactus) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactusRepository.createContactUs(contactus);
        });
    }
    getContactUsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactusRepository.getContactUsById(id);
        });
    }
    getContactUs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactusRepository.getContactUs();
        });
    }
    updateContactUS(contactus, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactusRepository.updateContactUs(contactus, id);
        });
    }
    deleteContactUs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactusRepository.deleteContactUs(id);
        });
    }
}
exports.ContactUsService = ContactUsService;
