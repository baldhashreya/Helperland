"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipCodeDefineModel = exports.TestDefineModel = exports.ServiceRequestExtraDefineModel = exports.ServiceRequestAddressDefineModel = exports.RatingDefineModel = exports.ServiceRequestDefineModel = exports.StateDefineModel = exports.CityDefineModel = exports.FavoriteAndBlockedDefineModel = exports.UserAddressDefineModel = exports.UserDefineModel = exports.ContactUsDefineModel = exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const city_1 = require("./city");
const contactus_1 = require("./contactus");
const favoriteandblocked_1 = require("./favoriteandblocked");
const rating_1 = require("./rating");
const servicerequest_1 = require("./servicerequest");
const servicerequestaddress_1 = require("./servicerequestaddress");
const servicerequestextra_1 = require("./servicerequestextra");
const state_1 = require("./state");
const test_1 = require("./test");
const user_1 = require("./user");
const useraddress_1 = require("./useraddress");
const zipcode_1 = require("./zipcode");
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
exports.ContactUsDefineModel = sequelize.define('ContactUs', Object.assign({}, contactus_1.ContactUsModelAttributes), {
    tableName: 'ContactUs'
});
exports.UserDefineModel = sequelize.define('Users', Object.assign({}, user_1.UserModelAttributes), {
    tableName: 'Users'
});
exports.UserAddressDefineModel = sequelize.define('UserAddress', Object.assign({}, useraddress_1.UserAddressModelAttributes), {
    tableName: 'UserAddress'
});
exports.FavoriteAndBlockedDefineModel = sequelize.define('FavoriteAndBlocked', Object.assign({}, favoriteandblocked_1.FavoriteAndBlockedModelAttributes), {
    tableName: 'FavoriteAndBlocked'
});
exports.CityDefineModel = sequelize.define('City', Object.assign({}, city_1.CityModelAttributes), {
    tableName: 'City'
});
exports.StateDefineModel = sequelize.define('State', Object.assign({}, state_1.StateModelAttributes), {
    tableName: 'State'
});
exports.ServiceRequestDefineModel = sequelize.define('ServiceRequest', Object.assign({}, servicerequest_1.ServiceRequestModelAttributes), {
    tableName: 'ServiceRequest'
});
exports.RatingDefineModel = sequelize.define('Rating', Object.assign({}, rating_1.RatingModelAttributes), {
    tableName: 'Rating'
});
exports.ServiceRequestAddressDefineModel = sequelize.define('ServiceRequestAddress', Object.assign({}, servicerequestaddress_1.ServiceRequestAddressModelAttributes), {
    tableName: 'ServiceRequestAddress'
});
exports.ServiceRequestExtraDefineModel = sequelize.define('ServiceRequestExtra', Object.assign({}, servicerequestextra_1.ServiceRequestExtraModelAttributes), {
    tableName: 'ServiceRequestExtra'
});
exports.TestDefineModel = sequelize.define('Test', Object.assign({}, test_1.TestModelAttributes), {
    tableName: 'Test'
});
exports.ZipCodeDefineModel = sequelize.define('ZipCode', Object.assign({}, zipcode_1.ZipCodeModelAttributes), {
    tableName: 'ZipCode'
});
exports.UserDefineModel.hasMany(exports.UserAddressDefineModel, {
    sourceKey: 'id',
    foreignKey: 'userid',
    as: 'UserAddress'
});
exports.UserAddressDefineModel.belongsTo(exports.UserDefineModel, {
    foreignKey: 'userid',
    as: 'useraddress'
});
exports.UserDefineModel.hasMany(exports.FavoriteAndBlockedDefineModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'UserFavorite'
});
exports.FavoriteAndBlockedDefineModel.belongsTo(exports.UserDefineModel, {
    foreignKey: 'userId',
    as: 'favorite'
});
exports.StateDefineModel.hasMany(exports.CityDefineModel, {
    sourceKey: 'id',
    foreignKey: 'stateId',
    as: 'state'
});
exports.CityDefineModel.belongsTo(exports.StateDefineModel, {
    foreignKey: 'stateId',
    as: 'city'
});
exports.ServiceRequestDefineModel.hasOne(exports.RatingDefineModel, {
    sourceKey: 'id',
    foreignKey: 'serviceRequestid',
    as: 'ServiceRating'
});
exports.RatingDefineModel.belongsTo(exports.ServiceRequestDefineModel, {
    foreignKey: 'serviceRequestid',
    as: 'rating'
});
exports.UserDefineModel.hasMany(exports.ServiceRequestDefineModel, {
    sourceKey: 'id',
    foreignKey: 'Userid',
    as: 'UserRequest'
});
exports.ServiceRequestDefineModel.hasMany(exports.ServiceRequestAddressDefineModel, {
    sourceKey: 'id',
    foreignKey: 'ServiceRequestId',
    as: 'ServiceRequest'
});
exports.ServiceRequestAddressDefineModel.belongsTo(exports.ServiceRequestDefineModel, {
    foreignKey: 'ServiceRequestId',
    as: 'ServiceRequestAddress'
});
exports.ServiceRequestDefineModel.hasMany(exports.ServiceRequestExtraDefineModel, {
    sourceKey: 'id',
    foreignKey: 'ServiceRequestid',
    as: 'Servicerequest'
});
exports.CityDefineModel.hasOne(exports.ZipCodeDefineModel, {
    sourceKey: 'id',
    foreignKey: 'CityId',
    as: 'City'
});
exports.ZipCodeDefineModel.belongsTo(exports.CityDefineModel, {
    foreignKey: 'CityId',
    as: 'ZipCode'
});
exports.UserDefineModel.hasMany(exports.RatingDefineModel, {
    sourceKey: 'id',
    foreignKey: 'RatingFrom',
    as: 'ratingfrom'
});
exports.UserDefineModel.hasMany(exports.RatingDefineModel, {
    sourceKey: 'id',
    foreignKey: 'RatingTo',
    as: 'ratingto'
});
exports.UserDefineModel.hasMany(exports.FavoriteAndBlockedDefineModel, {
    sourceKey: 'id',
    foreignKey: 'TargetUserId',
    as: 'targetuser'
});
exports.UserDefineModel.hasMany(exports.ServiceRequestDefineModel, {
    sourceKey: 'id',
    foreignKey: 'ServiceProviderId',
    as: 'serviceprovider'
});
exports.UserDefineModel.hasMany(exports.ServiceRequestDefineModel, {
    sourceKey: 'id',
    foreignKey: 'UserId',
    as: 'User'
});
