"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      saldo: DataTypes.BIGINT.UNSIGNED,
      credibility: DataTypes.INTEGER,
      profile_picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
