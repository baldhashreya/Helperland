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
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Rating extends Model{
    id !: number;
  
    

    Ratings ?: number;
  
    Comments ?: string;

    RatingDate ?: Date;

    OnTimeArrival ?: number;

    Friendlly ?: number;

    QualityOfService ?: number;

    createdAt!: Date;
  
    updatedAt!: Date;
  }
  
  export const RatingModelAttributes: ModelAttributes = {
  
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },

    Ratings: {
        type : DataTypes.DECIMAL
    },
    Comments: {
        type : DataTypes.STRING
    },
    RatingDate: {
        type : DataTypes.DATE
    },
    OnTimeArrival: {
        type : DataTypes.DECIMAL
    },
    Friendlly: {
        type : DataTypes.DECIMAL
    },
    QualityOfService: {
        type : DataTypes.DECIMAL
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