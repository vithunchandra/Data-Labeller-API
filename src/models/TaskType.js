"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskType extends Model {
    static associate(models) {
      TaskType.hasMany(models.Task, {
        foreignKey: "type_id",
        otherKey: "type_id",
      });
    }
  }
  TaskType.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING,
      },
      price_char: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "TaskType",
      tableName: "task_types",
      // paranoid: true,
      timestamps: false,
      name: {
        singular: "TaskType",
        plural: "TaskType",
      },
    }
  );
  return TaskType;
};
