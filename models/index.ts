// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
/// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactUsModelAttributes } from "./contactus";
import { Users , UserModelAttributes } from './user';
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };


type ContactUsModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ContactUs;
};

const ContactUsDefineModel = sequelize.define(
    'ContactUs',
    {
      ...ContactUsModelAttributes
    },
    {
      tableName: 'ContactUs'
    }
)as ContactUsModelStatic;

 const UserDefinrModel = sequelize.define(
   'Users',{
     ...UserModelAttributes
   },{
     tableName:'Users'
   }
 ); 


  export interface DbContext {
    sequelize: Sequelize;
    ContactUs: (ContactUsModelStatic|any);
  }

  export interface DBUserContaxt{
    sequelize: Sequelize;
    Users : any;
  }
  
  export const dbContact: DbContext = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel
  }

  export const dbUser: DBUserContaxt = {
    sequelize: sequelize,
    Users : UserDefinrModel,
  }
  export {ContactUsDefineModel};
  export {UserDefinrModel};
