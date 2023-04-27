"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    static associate(models) {
      Label.belongsTo(models.User, {foreignKey: "username", otherKey: "username"});
      
      Label.belongsTo(models.Data, {foreignKey: "data_id", otherKey: "data_id"});
    }
  }
  Label.init(
    {
      label_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      label_result: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Label",
      tableName: "labels",
    }
  );
  return Label;
};
