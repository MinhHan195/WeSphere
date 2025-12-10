'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    static associate(models) {
      follows.belongsTo(models.users, { as: 'follower', foreignKey: 'follower_userId', targetKey: 'userId' });
      follows.belongsTo(models.users, { as: 'following', foreignKey: 'following_userId', targetKey: 'userId' });
    }
  }
  follows.init({
    follower_userId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    following_userId: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'follows',
    timestamps: false
  });
  return follows;
};