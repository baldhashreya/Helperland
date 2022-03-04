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
exports.BookController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const encrypt_1 = require("../User/encrypt");
let totalpayment = 0;
var extra = [
    { 'id': 'a', "name": "Clean cabinet interiors" },
    { 'id': 'b', "name": "Cleaning the refrigerator" },
    { 'id': 'c', "name": "Cleaning the oven" },
    { 'id': 'd', "name": "Washing and drying laundry" },
    { 'id': 'e', "name": "Cleaning windows" }
];
var extrahour = " ";
class BookController {
    constructor(BookService) {
        this.BookService = BookService;
        this.ckeckAvailability = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.BookService
                .checkPostelCode(req.body.postelcode)
                .then((user) => {
                if (user == null || user.length === 0) {
                    return res.status(404).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
                }
                else {
                    for (var i = 0; i < user.length; i++) {
                        var t = user.find(o => (o.IsApprove == true && o.RoleId == 3));
                        if (t != undefined) {
                            const link = "http://localhost:7000/user/plan";
                            return res.status(200).json({ link });
                        }
                        else {
                            return res.status(404).json("We are not providing service in this area. We'll notify you if any helper would start working near your area");
                        }
                    }
                }
            })
                .catch((err) => {
                console.log(err);
                return res.status(500).json('Error');
            });
        });
        this.Schedule_Plan = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const date = req.body.ServiceStartDate;
            const time = parseFloat(req.body.ArrivalTime);
            const hours = parseFloat(req.body.ServiceHours);
            let Extra = req.body.ExtraHours;
            const length = (req.body.ExtraHours).length;
            const data = length / 2;
            req.body.ExtraHours = data;
            const total = data + hours;
            const service = Extra.reduce((a, b) => (a[b] = '30 min', a), {});
            for (var i = 0; i < Extra.length; i++) {
                var j = Extra[i];
                var d = extra.find(o => o.name == j);
                if (d != undefined) {
                    extrahour += d.id;
                }
            }
            totalpayment = total * 2 * 9;
            const bill = {
                "Date": date,
                "Arrival Time": time,
                "Basic": hours + "  hours",
                "Benifits": service,
                "total hours ": total + "  hours",
                "Total payment": totalpayment
            };
            const userid = (0, jsonwebtoken_1.decode)(req.cookies.helperland);
            console.log("userid" + userid);
            return this.BookService
                .createServiceRequest(req.body)
                .then((serviceReuest) => __awaiter(this, void 0, void 0, function* () {
                console.log(serviceReuest);
                const data = yield (0, encrypt_1.user)(req.cookies.helperland);
                serviceReuest
                    .update({ SubTotal: total })
                    .then(result => {
                    console.log(result);
                })
                    .catch((err) => {
                    console.log(err);
                });
                return res.status(200).json(bill);
            }))
                .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
        });
        this.BookService = BookService;
    }
}
exports.BookController = BookController;
