'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Label.init({
    label_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    data_id: DataTypes.STRING,
    username: DataTypes.STRING,
    label_result: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Label',
    timestamps: false,
    tableName: 'labels'
  });
  return Label;
};