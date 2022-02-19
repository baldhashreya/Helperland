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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class City extends Model{
  id !: number;

  CityName?: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const CityModelAttributes: ModelAttributes = {

  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  CityName: {
    type :DataTypes.STRING
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