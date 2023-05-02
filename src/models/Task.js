"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.hasMany(models.PossibleClassification, {
        foreignKey: "task_id",
        otherKey: "task_id",
      });
      Task.belongsTo(models.TaskType, {
        foreignKey: "type_id",
        otherKey: "type_id",
      });
      Task.belongsTo(models.User, {
        foreignKey: "username",
        otherKey: "username",
      });
      Task.hasMany(models.UserBlacklist, {
        foreignKey: "task_id",
        otherKey: "task_id",
      });
    }
  }
  Task.init(
    {
      task_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      type_id: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      minimal_credibility: {
        type: DataTypes.INTEGER,
      },
      max_labeller: {
        type: DataTypes.INTEGER,
      },
      closeDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      // paranoid: true,
      timestamps: false,
      name: {
        singular: "Task",
        plural: "Task",
      },
    }
  );
  return Task;
};
