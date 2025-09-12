'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    static associate(models) {
      follows.belongsTo(models.accounts, { foreignKey: 'follower_username', targetKey: 'username' });
      follows.belongsTo(models.accounts, { foreignKey: 'following_username', targetKey: 'username' });
    }
  }
  follows.init({
    follower_username: DataTypes.STRING(30),
    following_username: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'follows',
    timestamps: false
  });
  return follows;
};