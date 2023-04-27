"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskType extends Model {
    static associate(models) {
      TaskType.hasMany(models.Task, {foreignKey: "type_id", otherKey: "type_id"});
    }
  }
  TaskType.init(
    {
      type_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price_char: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "TaskType",
      tableName: "task_types"
    }
  );
  return TaskType;
};
