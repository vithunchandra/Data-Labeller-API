"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {foreignKey: "username", otherKey: "username"});
      
      User.hasMany(models.Label, {foreignKey: "username", otherKey: "username"});
      
      User.hasMany(models.UserBlacklist, {foreignKey: "username", otherKey: "username"});
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      credibility: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "user",
      tableName: "users"
    }
  );
  return User;
};
