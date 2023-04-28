'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: Sequelize.STRING,
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      role: Sequelize.STRING,
      saldo: Sequelize.BIGINT.UNSIGNED,
      credibility: {
        type: Sequelize.INTEGER,
        defaultValue: 50
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};