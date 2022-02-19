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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ZipCode extends Model{
    id !: number;
  
    ZipcodeValue ?: string;
  
    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const ZipCodeModelAttributes: ModelAttributes = {
  
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
  
    ZipcodeValue: {
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