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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class State extends Model{
  id !: number;

  StateName ?: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const StateModelAttributes: ModelAttributes = {

  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },

  StateName: {
    type : DataTypes.STRING 
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