"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class City extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   City.init({
//     CityName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'City',
//   });
//   return City;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModelAttributes = exports.City = void 0;
const sequelize_1 = require("sequelize");
class City extends sequelize_1.Model {
}
exports.City = City;
exports.CityModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    CityName: {
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
