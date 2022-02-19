import { UserDefineModel,
    ContactUsDefineModel, 
    ServiceRequestDefineModel,
    ServiceRequestExtraDefineModel, 
    UserAddressDefineModel,
    Request_ZipCodesDefineModel,
    FavoriteAndBlockedDefineModel} from "./index";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };


export interface DBRequest_ZipCodes{
    sequelize: Sequelize;
    Request_ZipCodes : any;
}

export interface DBUserContact{
    sequelize: Sequelize;
    Users : any;
}

export interface DBServiceRequest{
    sequelize: Sequelize;
    ServiceRequest : any;
}
export interface DbContect {
    sequelize: Sequelize;
    ContactUs: (any);
}

export interface DbServiceRequestExtra {
    sequelize: Sequelize;
    ServiceRequestExtra: (any);
}

export interface DbUserAddress {
    sequelize : Sequelize;
    UserAddress : any;
}

export interface DbFavoriteAndBlocked {
    sequelize : Sequelize;
    FavoriteAndBlocked : any;
}

  
export const dbRequest_ZipCodes: DBRequest_ZipCodes = {
    sequelize: sequelize,
    Request_ZipCodes: Request_ZipCodesDefineModel
}

export const dbContact: DbContect = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel
}


export const dbUser: DBUserContact = {
    sequelize: sequelize,
    Users : UserDefineModel,
}

export const dbFavoriteAndBlocked: DbFavoriteAndBlocked = {
    sequelize: sequelize,
    FavoriteAndBlocked : FavoriteAndBlockedDefineModel,
}

export const dbServiceRequest: DBServiceRequest = {
    sequelize: sequelize,
    ServiceRequest : ServiceRequestDefineModel,
}

export const dbServiceRequestExtra: DbServiceRequestExtra = {
    sequelize: sequelize,
    ServiceRequestExtra : ServiceRequestExtraDefineModel
}

export const dbUserAddress : DbUserAddress = {
    sequelize : sequelize,
    UserAddress : UserAddressDefineModel
}