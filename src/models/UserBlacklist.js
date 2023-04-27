"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBlacklist extends Model {
    static associate(models) {
      UserBlacklist.belongsTo(models.Task, {foreignKey: "task_id", otherKey: "task_id"});
      
      UserBlacklist.belongsTo(models.User, {foreignKey: "username", otherKey: "username"});
    }
  }
  UserBlacklist.init(
    {
      ban_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      task_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "UserBlacklist",
      tableName: "user_blacklists"
    }
  );
  return UserBlacklist;
};
