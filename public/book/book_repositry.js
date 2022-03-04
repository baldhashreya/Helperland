"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const interface_1 = require("../models/interface");
class BookRepository {
    checkPostelCode(postel_code) {
        return interface_1.dbUser.Users.findAll({ where: { Zipcode: postel_code } });
    }
    createServiceRequest(ServiceRequest) {
        return interface_1.dbServiceRequest.ServiceRequest.create(ServiceRequest);
    }
    updateServiceRequest(ServiceRequest, id) {
        return interface_1.dbServiceRequest.ServiceRequest.update(ServiceRequest, id);
    }
}
exports.BookRepository = BookRepository;
