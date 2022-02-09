'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      MobileNumber: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.INTEGER
      },
      Date_Of_Birth: {
        type: Sequelize.DATE
      },
      Website:{
        type:Sequelize.STRING
      },
      User_Profile_Picture: {
        type: Sequelize.STRING
      },
      Zipcode: {
        type: Sequelize.STRING
      },
      WorkWithPets: {
        type: Sequelize.BOOLEAN
      },
      LanguagedId:{
        type: Sequelize.INTEGER
      },
      RoleId :{
        type:Sequelize.INTEGER
      },
      Status :{
        type : Sequelize.INTEGER
      },
      CreateDate :{
        type: Sequelize.DATE
      },
      ModifiedDate :{
        type: Sequelize.DATE
      },
      IsApprove :{
        type:Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};