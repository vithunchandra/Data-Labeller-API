'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_types', {
      type_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      type_name: Sequelize.STRING,
      price_char: Sequelize.INTEGER,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task_types');
  }
};