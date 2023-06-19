'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    history_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
    timestamps: false,
    tableName: 'histories'
  });
  return History;
};