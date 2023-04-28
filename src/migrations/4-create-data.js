'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data', {
      data_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      task_id: {
        type: Sequelize.STRING,
        references: {
          key: "task_id",
          model: {
            tableName: 'tasks'
          }
        }
      },
      data_text: Sequelize.TEXT,
      price: Sequelize.INTEGER,
      closeDate: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data');
  }
};