// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequest extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequest.init({
//     ServiceId: DataTypes.INTEGER,
//     ServiceStartDate: DataTypes.DATE,
//     ZipCode: DataTypes.STRING,
//     ServiceHouslyRate: DataTypes.DECIMAL,
//     ServiceHours: DataTypes.FLOAT,
//     ExtraHours: DataTypes.FLOAT,
//     SubTotal: DataTypes.DECIMAL,
//     Discount: DataTypes.DECIMAL,
//     TotalCost: DataTypes.DECIMAL,
//     Comments: DataTypes.STRING,
//     PaymentTrasactionRefNo: DataTypes.STRING,
//     PaymentDue: DataTypes.BOOLEAN,
//     JobStatus: DataTypes.BOOLEAN,
//     SPAcceptedDate: DataTypes.DATE,
//     HasPets: DataTypes.BOOLEAN,
//     Status: DataTypes.INTEGER,
//     CreateDate: DataTypes.DATE,
//     ModifiedDate: DataTypes.DATE,
//     ModifiedBy: DataTypes.INTEGER,
//     RefundedAmount: DataTypes.DECIMAL,
//     Distance: DataTypes.DECIMAL,
//     HasIssue: DataTypes.BOOLEAN,
//     PaymentDone: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'ServiceRequest',
//   });
//   return ServiceRequest;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequest extends Model{
    id !: number;

    ServiceId ?: number;
  
    ServiceStartDate ?: string;

    ArrivalTime ?: string;

    ZipCode !: string;

    ServiceHouslyRate ?: number;

    ServiceHours !: number;

    ExtraHours !: number;

    SubTotal ?: number;

    Discount ?: string;

    TotalCost ?: number;

    Comments ?: string;

    PaymentTrasactionRefNo ?: string;

    PaymentDue ?: boolean;

    JobStatus ?: boolean;

    SPAcceptedDate ?: Date;

    HasPets ?: boolean;

    Status ?: number;

    CreateDate ?: Date; 

    ModifiedDate ?: Date;

    ModifiedBy ?: number;

    RefundedAmount ?: number;

    Distance ?: number;

    HasIssue ?: boolean;

    PaymentDone ?: boolean;
  
    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const ServiceRequestModelAttributes: ModelAttributes = {
  
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ServiceId: {
        type : DataTypes.INTEGER
    },
    ServiceStartDate: {
        type : DataTypes.STRING
    },
    ArrivalTime :{
        type : DataTypes.STRING
    },
    ZipCode: {
        type :  DataTypes.STRING
    },
    ServiceHouslyRate: {
        type : DataTypes.DECIMAL
    },
    ServiceHours: {
        type : DataTypes.FLOAT
    },
    ExtraHours: {
        type : DataTypes.FLOAT
    },
    SubTotal: {
        type : DataTypes.DECIMAL
    },
    Discount: {
        type : DataTypes.STRING
    },
    TotalCost: {
        type : DataTypes.DECIMAL
    },
    Comments: {
        type : DataTypes.STRING
    },
    PaymentTrasactionRefNo: {
        type : DataTypes.STRING
    },
    PaymentDue: {
        type : DataTypes.BOOLEAN
    },
    JobStatus: {
        type : DataTypes.BOOLEAN
    },
    SPAcceptedDate: {
        type : DataTypes.DATE
    },
    HasPets: {
        type : DataTypes.BOOLEAN
    },
    Status: {
        type : DataTypes.INTEGER
    },
    CreateDate: {
        type : DataTypes.DATE
    },
    ModifiedDate: {
        type : DataTypes.DATE
    },
    ModifiedBy: {
        type : DataTypes.INTEGER
    },
    RefundedAmount: {
        type : DataTypes.DECIMAL
    },
    Distance: {
        type : DataTypes.DECIMAL
    },
    HasIssue: {
        type : DataTypes.BOOLEAN
    },
    PaymentDone: {
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