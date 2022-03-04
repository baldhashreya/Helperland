"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ZipCode extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ZipCode.init({
//     ZipcodeValue: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ZipCode',
//   });
//   return ZipCode;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipCodeModelAttributes = exports.ZipCode = void 0;
const sequelize_1 = require("sequelize");
class ZipCode extends sequelize_1.Model {
}
exports.ZipCode = ZipCode;
exports.ZipCodeModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    ZipcodeValue: {
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
