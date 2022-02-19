// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class UserAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserAddress.init({
//     AddressLine1: DataTypes.STRING,
//     AddressLine2: DataTypes.STRING,
//     City: DataTypes.STRING,
//     State: DataTypes.STRING,
//     PostelCode: DataTypes.STRING,
//     IsDefault: DataTypes.BOOLEAN,
//     IsDelete: DataTypes.BOOLEAN,
//     Mobile: DataTypes.STRING,
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UserAddress',
//   });
//   return UserAddress;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';
import { Users } from './user';

export class UserAddress extends Model{
    id !: number;
  
    AddressLine1 ?: string;

    AddressLine2 ?: string;
    
    City ?: string;
    
    State ?: string;
    
    PostelCode ?: string;
    
    IsDefault ?: boolean;
    
    IsDelete ?: string;
    
    Mobile ?:string;
    
    Email ?: string;

    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const UserAddressModelAttributes: ModelAttributes = {
  
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
    PostelCode: {
        type : DataTypes.STRING
    },
    IsDefault: {
        type : DataTypes.BOOLEAN
    },
    IsDelete: {
        type : DataTypes.BOOLEAN
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

