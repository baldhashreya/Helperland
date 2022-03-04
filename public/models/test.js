"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Test extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Test.init({
//     TestName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Test',
//   });
//   return Test;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModelAttributes = exports.Test = void 0;
const sequelize_1 = require("sequelize");
class Test extends sequelize_1.Model {
}
exports.Test = Test;
exports.TestModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    TestName: {
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
