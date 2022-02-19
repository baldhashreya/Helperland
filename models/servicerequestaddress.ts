// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequestAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequestAddress.init({
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostalCode: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ServiceRequestAddress',
//   });
//   return ServiceRequestAddress;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequestAddress extends Model{
  id !: number;

  AddressLine1 ?: string;

  AddressLine2 ?: string;

  City ?: string;

  State ?: string;

  PostalCode ?: string;

  Mobile ?: string;

  Email ?: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const ServiceRequestAddressModelAttributes: ModelAttributes = {

  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },

    AddressLine1: {
      type : DataTypes.STRING
    },
    AddressLine2: {
      type : DataTypes.STRING
    },
    City: {
      type : DataTypes.STRING
    },
    State: {
      type : DataTypes.STRING
    },
    PostalCode: {
      type : DataTypes.STRING
    },
    Mobile: {
      type : DataTypes.STRING
    },
    Email: {
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