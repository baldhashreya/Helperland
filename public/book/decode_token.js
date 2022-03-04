"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
function decode(data) {
    const token = data;
    return (0, jwt_decode_1.default)(token);
}
exports.decode = decode;
