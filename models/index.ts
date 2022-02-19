
import {  Sequelize } from 'sequelize';
import { CityModelAttributes } from './city';
import {  ContactUsModelAttributes } from "./contactus";
import { FavoriteAndBlockedModelAttributes } from './favoriteandblocked';
import { RatingModelAttributes } from './rating';
import { Request_ZipCodesModelAttributes } from './request_zipcode';
import { ServiceRequestModelAttributes } from './servicerequest';
import { ServiceRequestAddressModelAttributes } from './servicerequestaddress';
import { ServiceRequestExtraModelAttributes } from './servicerequestextra';
import { StateModelAttributes } from './state';
import { TestModelAttributes } from './test';
import {  UserModelAttributes } from './user';
import {  UserAddressModelAttributes } from './useraddress';
import { ZipCodeModelAttributes } from './zipcode';
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };



export const ContactUsDefineModel = sequelize.define(
    'ContactUs',
    {
      ...ContactUsModelAttributes
    },
    {
      tableName: 'ContactUs'
    }
    
);

export const Request_ZipCodesDefineModel = sequelize.define(
  'Request_ZipCodes',
  {
    ...Request_ZipCodesModelAttributes
  },
  {
    tableName: 'Request_ZipCodes'
  }
  
);


export const UserDefineModel = sequelize.define(
   'Users',
   {
     ...UserModelAttributes
   },
   {
     tableName:'Users'
   }

); 

export const UserAddressDefineModel = sequelize.define(
  'UserAddress',
  {
    ...UserAddressModelAttributes
  },
  {
    tableName:'UserAddress'
  }
);

export const FavoriteAndBlockedDefineModel = sequelize.define(
  'FavoriteAndBlocked',
  {
    ...FavoriteAndBlockedModelAttributes
  },
  {
    tableName:'FavoriteAndBlocked'
  }
);

// export const CityDefineModel = sequelize.define(
//   'City',
//   {
//     ...CityModelAttributes
//   },
//   {
//     tableName:'City'
//   }
// );

// export const StateDefineModel = sequelize.define(
//   'State',
//   {
//     ...StateModelAttributes
//   },
//   {
//     tableName:'State'
//   }
// );

export const ServiceRequestDefineModel = sequelize.define(
  'ServiceRequest',
  {
    ...ServiceRequestModelAttributes
  },
  {
    tableName:'ServiceRequest'
  }
);

// export const RatingDefineModel = sequelize.define(
//   'Rating',
//   {
//     ...RatingModelAttributes
//   },
//   {
//     tableName:'Rating'
//   }
// );

export const ServiceRequestAddressDefineModel = sequelize.define(
  'ServiceRequestAddress',
  {
    ...ServiceRequestAddressModelAttributes
  },
  {
    tableName:'ServiceRequestAddress'
  }
);

export const ServiceRequestExtraDefineModel = sequelize.define(
  'ServiceRequestExtra',
  {
    ...ServiceRequestExtraModelAttributes
  },
  {
    tableName:'ServiceRequestExtra'
  }
);

// export const TestDefineModel = sequelize.define(
//   'Test',
//   {
//     ...TestModelAttributes
//   },
//   {
//     tableName:'Test'
//   }
// );

// export const ZipCodeDefineModel = sequelize.define(
//   'ZipCode',
//   {
//     ...ZipCodeModelAttributes
//   },
//   {
//     tableName:'ZipCode'
//   }
// );

UserDefineModel.hasMany(UserAddressDefineModel);
UserAddressDefineModel.belongsTo(UserDefineModel);

// UserAddressDefineModel.belongsTo(UserDefineModel,{
//   foreignKey:'userid',
//   as:'useraddress'
// );

UserDefineModel.hasMany(FavoriteAndBlockedDefineModel);

FavoriteAndBlockedDefineModel.belongsTo(UserDefineModel);

// StateDefineModel.hasMany(CityDefineModel,{
//   sourceKey:'id',
//   foreignKey:'stateId',
//   as:'state'
// });

// CityDefineModel.belongsTo(StateDefineModel,{
//   foreignKey:'stateId',
//   as:'city'
// });

// ServiceRequestDefineModel.hasOne(RatingDefineModel,{
//   sourceKey:'id',
//   foreignKey:'serviceRequestid',
//   as:'ServiceRating'
// });

// RatingDefineModel.belongsTo(ServiceRequestDefineModel,{
//   foreignKey:'serviceRequestid',
//   as:'rating'
// });

UserDefineModel.hasMany(ServiceRequestDefineModel);
ServiceRequestDefineModel.belongsTo(UserDefineModel);

// ServiceRequestDefineModel.hasMany(ServiceRequestAddressDefineModel,{
//   sourceKey:'id',
//   foreignKey:'ServiceRequestId',
//   as:'ServiceRequest'
// });

// ServiceRequestAddressDefineModel.belongsTo(ServiceRequestDefineModel,{
//   foreignKey:'ServiceRequestId',
//   as:'ServiceRequestAddress'
// });


ServiceRequestDefineModel.hasOne(ServiceRequestExtraDefineModel);
ServiceRequestExtraDefineModel.belongsTo(ServiceRequestDefineModel);


// CityDefineModel.hasOne(ZipCodeDefineModel,{
//   sourceKey:'id',
//   foreignKey:'CityId',
//   as:'City'
// });

// ZipCodeDefineModel.belongsTo(CityDefineModel,{
//   foreignKey:'CityId',
//   as:'ZipCode'
// });

// UserDefineModel.hasMany(RatingDefineModel,{
//   sourceKey:'id',
//   foreignKey:'RatingFrom',
//   as:'ratingfrom'
// });

// UserDefineModel.hasMany(RatingDefineModel,{
//   sourceKey:'id',
//   foreignKey:'RatingTo',
//   as:'ratingto'
// });

// UserDefineModel.hasMany(FavoriteAndBlockedDefineModel,{
//   sourceKey:'id',
//   foreignKey:'TargetUserId',
//   as:'targetuser'
// });

// UserDefineModel.hasMany(ServiceRequestDefineModel,{
//   sourceKey:'id',
//   foreignKey:'ServiceProviderId',
//   as:'serviceprovider'
// });
// UserDefineModel.hasMany(ServiceRequestDefineModel,{
//   sourceKey:'id',
//   foreignKey:'UserId',
//   as:'User'
// });







