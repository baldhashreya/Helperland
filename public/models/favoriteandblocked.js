"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FavoriteAndBlocked extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FavoriteAndBlocked.init({
//     TargetUserId: DataTypes.INTEGER,
//     IsFavorite: DataTypes.BOOLEAN,
//     IsBlocked: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'FavoriteAndBlocked',
//   });
//   return FavoriteAndBlocked;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteAndBlockedModelAttributes = exports.FavoriteAndBlocked = void 0;
const sequelize_1 = require("sequelize");
class FavoriteAndBlocked extends sequelize_1.Model {
}
exports.FavoriteAndBlocked = FavoriteAndBlocked;
exports.FavoriteAndBlockedModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    IsFavorite: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN
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
