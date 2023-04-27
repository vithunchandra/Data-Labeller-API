"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.TaskType, {foreignKey: "type_id", otherKey: "type_id"});

      Task.belongsTo(models.User, {foreignKey: "username", otherKey: "username"});

      Task.hasMany(models.PossibleClassification, {foreignKey: "task_id", otherKey: "task_id"});            
      
      Task.hasMany(models.UserBlacklist, {foreignKey: "task_id", otherKey: "task_id"});

      Task.hasMany(models.Data, {foreignKey: 'task_id', otherKey: 'task_id'});
    }
  }
  Task.init(
    {
      task_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      minimal_credibility: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_labeller: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Task",
      tableName: "tasks"
    }
  );
  return Task;
};
