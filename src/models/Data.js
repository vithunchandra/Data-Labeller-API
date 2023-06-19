"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data.init(
    {
      data_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      task_id: {
        type: DataTypes.STRING,
        references: {
          key: "task_id",
          model: "Task",
        },
      },
      data_text: DataTypes.TEXT,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Data",
      timestamps: false,
      tableName: 'data'
    }
  );
  return Data;
};
