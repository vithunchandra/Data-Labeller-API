'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('labels', {
      label_id: {
        type: Sequelize.STRING,
        primaryKey: true
      }, data_id: {
        type: Sequelize.STRING,
        references: {
          key: "data_id",
          model: {tableName: "data"}
        }
      }, username: {
        type: Sequelize.STRING,
        references: {
          key: "username",
          model: {tableName: "users"}
        }
      }, label_result: Sequelize.TEXT
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('labels');
  }
};