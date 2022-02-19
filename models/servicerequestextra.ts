// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestExtra extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestExtra.init({
//     ServiceExtraId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestExtra',
//   });
//   return ServiceRequestExtra;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequestExtra extends Model{
    id !: number;
  
    ServiceExtraId ?: string;
  
    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const ServiceRequestExtraModelAttributes: ModelAttributes = {
  
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
  
    ServiceExtraId: {
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