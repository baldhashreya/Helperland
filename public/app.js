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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const Rcontactus_1 = __importDefault(require("./router/Rcontactus"));
const User_1 = __importDefault(require("./router/User"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const book_1 = __importDefault(require("./router/book"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/admin', Rcontactus_1.default);
app.use('/', User_1.default);
app.use('/user', book_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server Start at ${process.env.PORT}`);
    models_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Database Connected");
        try {
            yield models_1.sequelize.sync();
        }
        catch (error) {
            console.log(error);
        }
    })).catch((e) => {
        console.log(e.message);
    });
});
