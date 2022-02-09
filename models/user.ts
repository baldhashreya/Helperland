
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Users extends Model {
  id!: number;
  FirstName?: string;
  LastName?: string;
  email?: string;
  Password!: string;
  MobileNumber?:string;
  Gender?:number;
  Date_Of_Birth?:Date;
  Website?:string;
  User_Profile_Picture?:string;
  Zipcode?:string;
  WorkWithPets?:boolean;
  LanguagedId?:number;
  RoleId?:number;
  CreateDate?:Date;
  ModifiedDate?:Date;
  Status?:number;
  IsApprove?:boolean;
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
  FirstName: {
    type: DataTypes.STRING
  },
  LastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  Password :{
    type :DataTypes.STRING
  },
  MobileNumber:{
    type: DataTypes.STRING,
    unique: true
  },
  Gender :{
    type :DataTypes.INTEGER
  },
  Date_Of_Birth:{
    type:DataTypes.DATE
  },
  Website:{
    type:DataTypes.STRING
  },
  User_Profile_Picture:{
    type:DataTypes.STRING
  },
  Zipcode:{
    type:DataTypes.STRING
  },
  WorkWithPets:{
    type:DataTypes.BOOLEAN
  },
  LanguagedId: {
    type:DataTypes.INTEGER
  },
  RoleId:{
    type:DataTypes.INTEGER
  },
  Status :{
    type:DataTypes.INTEGER
  },
  IsApprove :{
    type: DataTypes.BOOLEAN
  },
  CreateDate :{
    type: DataTypes.DATE
  },
  ModifiedDate :{
    type: DataTypes.DATE
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