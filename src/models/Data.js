"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    static associate(models) {
      Data.belongsTo(models.Task, {foreignKey: "task_id", otherKey: "task_id"});

      Data.hasMany(models.Label, {foreignKey: "data_id", otherKey: "data_id"});
    }
  }
  Data.init(
    {
      data_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      data_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      closeDate: {
        type: DataTypes.DATE,
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
      modelName: "Data",
      tableName: "data"
    }
  );
  return Data;
};
