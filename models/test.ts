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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Test extends Model{
    id !: number;
  
    TestName ?: string;

    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const TestModelAttributes: ModelAttributes = {
  
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },

    TestName: {
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