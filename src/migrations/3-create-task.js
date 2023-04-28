'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      task_id: {
        type: Sequelize.STRING,
        primaryKey: true
      }, type_id: {
        type: Sequelize.STRING,
        references: {
          key: "type_id",
          model: {tableName: "task_types"}
        }
      }, username: {
        type: Sequelize.STRING,
        references: {
          key: "username",
          model: {tableName: "users"}
        }
      },
      max_labeller: Sequelize.INTEGER,
      status: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};