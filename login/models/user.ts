// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     mobilenumber: DataTypes.STRING,
//     gender: DataTypes.INTEGER,
//     date_of_birth: DataTypes.DATE,
//     user_profile_picture: DataTypes.STRING,
//     zipcode: DataTypes.STRING,
//     workwithpets: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Users extends Model {
  id!: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  mobilenumber?:string;
  gender?:number;
  date_of_birth?:Date;
  website?:string;
  user_profile_picture?:string;
  zipcode?:string;
  workwithpets?:boolean;
  languagedId?:number;
  roleid?:number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const UserModelAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password :{
    type :DataTypes.STRING
  },
  mobilenumber:{
    type: DataTypes.STRING,
    unique: true
  },
  gender :{
    type :DataTypes.INTEGER
  },
  date_of_birth:{
    type:DataTypes.DATE
  },
  website:{
    type:DataTypes.STRING
  },
  user_profile_picture:{
    type:DataTypes.STRING
  },
  zipcode:{
    type:DataTypes.STRING
  },
  workwithpets:{
    type:DataTypes.BOOLEAN
  },
  languagedId: {
    type:DataTypes.INTEGER
  },
  roleid:{
    type:DataTypes.INTEGER
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