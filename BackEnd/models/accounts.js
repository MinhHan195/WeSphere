'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      accounts.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  accounts.init({
    username: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false
    },
    password: DataTypes.STRING(1024),
    bio: DataTypes.STRING(100),
    privateMode: DataTypes.BOOLEAN,
    onlineMode: DataTypes.STRING(10),
    userId: DataTypes.UUID,
    avatar: DataTypes.STRING(1024),
    publicId: DataTypes.STRING(40),
    accessToken: DataTypes.STRING(1024),
    active: DataTypes.BOOLEAN,
    isOnline: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'accounts',
    timestamps: false
  });
  return accounts;
};  