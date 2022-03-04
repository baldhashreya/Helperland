"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModelAttributes = exports.Rating = void 0;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Rating.init({
//     RatingForm: DataTypes.INTEGER,
//     RatingTo: DataTypes.INTEGER,
//     Ratings: DataTypes.DECIMAL,
//     Comments: DataTypes.STRING,
//     RatingDate: DataTypes.DATE,
//     OnTimeArrival: DataTypes.DECIMAL,
//     Friendlly: DataTypes.DECIMAL,
//     QualityOfService: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Rating',
//   });
//   return Rating;
// };
const sequelize_1 = require("sequelize");
class Rating extends sequelize_1.Model {
}
exports.Rating = Rating;
exports.RatingModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Ratings: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING
    },
    RatingDate: {
        type: sequelize_1.DataTypes.DATE
    },
    OnTimeArrival: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    Friendlly: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    QualityOfService: {
        type: sequelize_1.DataTypes.DECIMAL
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
