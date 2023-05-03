"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PossibleClassification extends Model {
    static associate(models) {
      PossibleClassification.belongsTo(models.Task, {
        foreignKey: "task_id",
        otherKey: "task_id",
      });
    }
  }
  PossibleClassification.init(
    {
      possible_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      task_id: {
        type: DataTypes.STRING,
      },
      possible_name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "PossibleClassification",
      tableName: "possible_classifications",
      timestamps: false,
      // paranoid: true,
      name: {
        singular: "PossibleClassification",
        plural: "PossibleClassification",
      },
    }
  );
  return PossibleClassification;
};
