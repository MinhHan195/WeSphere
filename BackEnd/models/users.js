'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.accounts, { foreignKey: 'userId', targetKey: 'userId' })
      users.belongsTo(models.blocks, { foreignKey: 'userId', as: 'blocker', targetKey: 'blocker_id' })
      users.belongsTo(models.blocks, { foreignKey: 'userId', as: 'blocked', targetKey: 'blocked_id' })
    }
  }
  users.init({
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING(50),
    fullname: DataTypes.STRING(50),
    gender: DataTypes.STRING(4),
    phone: DataTypes.STRING(11)

  }, {
    sequelize,
    modelName: 'users',
    timestamps: false
  });
  return users;
};