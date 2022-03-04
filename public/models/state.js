"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class State extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   State.init({
//     StateName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'State',
//   });
//   return State;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateModelAttributes = exports.State = void 0;
const sequelize_1 = require("sequelize");
class State extends sequelize_1.Model {
}
exports.State = State;
exports.StateModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    StateName: {
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
