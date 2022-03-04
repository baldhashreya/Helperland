"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestModelAttributes = exports.ServiceRequest = void 0;
const sequelize_1 = require("sequelize");
class ServiceRequest extends sequelize_1.Model {
}
exports.ServiceRequest = ServiceRequest;
exports.ServiceRequestModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    ServiceId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceStartDate: {
        type: sequelize_1.DataTypes.STRING
    },
    ArrivalTime: {
        type: sequelize_1.DataTypes.STRING
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING
    },
    ServiceHouslyRate: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ServiceHours: {
        type: sequelize_1.DataTypes.FLOAT
    },
    ExtraHours: {
        type: sequelize_1.DataTypes.FLOAT
    },
    SubTotal: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Discount: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    TotalCost: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING
    },
    PaymentTrasactionRefNo: {
        type: sequelize_1.DataTypes.STRING
    },
    PaymentDue: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    JobStatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    SPAcceptedDate: {
        type: sequelize_1.DataTypes.DATE
    },
    HasPets: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    CreateDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ModifiedDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    RefundedAmount: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Distance: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    HasIssue: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    PaymentDone: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
