'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('possible_classifications', {
      possible_id: {
        type: Sequelize.STRING,
        primaryKey: true
      }, task_id: {
        type: Sequelize.STRING,
        references: {
          key: "task_id",
          model: {tableName: "tasks"}
        }
      },
      possible_name: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('possible_classifications');
  }
};