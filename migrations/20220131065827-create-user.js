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
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobilenumber: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      website:{
        type:Sequelize.STRING
      },
      user_profile_picture: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      workwithpets: {
        type: Sequelize.BOOLEAN
      },
      languagedId:{
        type: Sequelize.INTEGER
      },
      roleid :{
        type:Sequelize.INTEGER
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