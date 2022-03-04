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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.user = exports.verifyToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.cookies.helperland || req.headers["x-access-token"];
    if (!token) {
        return res.status(401).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "djcniwewcdjlwdncjwoc");
        req.user = decoded;
    }
    catch (err) {
        return res.status(404).send("Invalid Token");
    }
    return next();
};
exports.verifyToken = verifyToken;
function user(data) {
    const decode = (0, jwt_decode_1.default)(data, { header: true });
    return decode.userId;
}
exports.user = user;
function encrypt(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(data, 10);
    });
}
exports.encrypt = encrypt;
function decrypt(data, data1) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(data, data1);
    });
}
exports.decrypt = decrypt;
