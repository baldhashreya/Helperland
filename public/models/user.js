"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.Users = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
;
exports.UserModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING
    },
    MobileNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    Gender: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Date_Of_Birth: {
        type: sequelize_1.DataTypes.DATE
    },
    NationalityId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    User_Profile_Picture: {
        type: sequelize_1.DataTypes.STRING
    },
    Zipcode: {
        type: sequelize_1.DataTypes.STRING
    },
    WorkWithPets: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    LanguageId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    RoleId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    IsApprove: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    CreateDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ModifiedDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
