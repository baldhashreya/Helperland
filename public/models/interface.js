"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceRequest = exports.dbUser = exports.dbContact = exports.sequelize = exports.Sequelize = void 0;
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
exports.dbContact = {
    sequelize: sequelize,
    ContactUs: index_1.ContactUsDefineModel
};
exports.dbUser = {
    sequelize: sequelize,
    Users: index_1.UserDefineModel,
};
exports.dbServiceRequest = {
    sequelize: sequelize,
    ServiceRequest: index_1.ServiceRequestDefineModel,
};
