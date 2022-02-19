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

import { Model, DataTypes, ModelAttributes } from 'sequelize';



export class FavoriteAndBlocked extends Model{
  id !: number;

  IsFavorite?: boolean;

  IsBlocked?:boolean;

  createdAt!: Date;

  updatedAt!: Date;
}

export const FavoriteAndBlockedModelAttributes: ModelAttributes = {

  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  IsFavorite: {
    type : DataTypes.BOOLEAN
  },
  IsBlocked: {
    type : DataTypes.BOOLEAN
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}