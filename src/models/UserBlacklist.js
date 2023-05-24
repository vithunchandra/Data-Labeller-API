'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBlacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBlacklist.init({
    ban_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: DataTypes.STRING,
    task_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserBlacklist',
    tableName: 'user_blacklists',
    timestamps: false
  });
  return UserBlacklist;
};