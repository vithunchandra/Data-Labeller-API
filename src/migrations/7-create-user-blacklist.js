'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_blacklists', {
      ban_id: {
        type: Sequelize.STRING,
        primaryKey: true
      }, username: {
        type: Sequelize.STRING,
        references: {
          key: "username",
          model: {tableName: "users"}
        }
      }, task_id: {
        type: Sequelize.STRING,
        references: {
          key: "task_id",
          model: {tableName: "tasks"}
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserBlacklists');
  }
};