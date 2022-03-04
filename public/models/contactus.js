"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ContactUs extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUs.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     mobilenumber: DataTypes.STRING,
//     message: DataTypes.STRING,
//     uploadfile: DataTypes.STRING,
//     subjecttype: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ContactUs',
//   });
//   return ContactUs;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModelAttributes = exports.ContactUs = void 0;
const sequelize_1 = require("sequelize");
class ContactUs extends sequelize_1.Model {
}
exports.ContactUs = ContactUs;
;
exports.ContactUsModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    mobilenumber: {
        type: sequelize_1.DataTypes.STRING
    },
    subject: {
        type: sequelize_1.DataTypes.STRING
    },
    uploadfile: {
        type: sequelize_1.DataTypes.STRING
    },
    message: {
        type: sequelize_1.DataTypes.STRING
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING
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
