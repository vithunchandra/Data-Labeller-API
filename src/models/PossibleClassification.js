"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PossibleClassification extends Model {
    static associate(models) {
      PossibleClassification.belongsTo(models.Task, {foreignKey: "task_id", otherKey: "task_id"});
    }
  }
  PossibleClassification.init(
    {
      possible_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        
      },
      possible_name: {
        type: DataTypes.STRING,
      },
      task_id: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "PossibleClassification",
      tableName: "possible_classification"
    }
  );
  return PossibleClassification;
};
