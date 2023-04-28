'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PossibleClassification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PossibleClassification.init({
    possible_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PossibleClassification',
  });
  return PossibleClassification;
};