"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
class BookService {
    constructor(BookRepository) {
        this.BookRepository = BookRepository;
        this.BookRepository = BookRepository;
    }
    checkPostelCode(postel_code) {
        return this.BookRepository.checkPostelCode(postel_code);
    }
    createServiceRequest(servicerequest) {
        return this.BookRepository.createServiceRequest(servicerequest);
    }
    updateServiceRequest(servicerequest, id) {
        return this.BookRepository.updateServiceRequest(servicerequest, id);
    }
}
exports.BookService = BookService;
