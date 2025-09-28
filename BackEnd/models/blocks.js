'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      blocks.belongsTo(models.accounts, {
        as: 'blocker',
        foreignKey: 'blocker_username',
        targetKey: 'username'
      });
      blocks.belongsTo(models.accounts, {
        as: 'blocked',
        foreignKey: 'blocked_username',
        targetKey: 'username'
      });
    }
  }
  blocks.init({
    block_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    blocker_username: DataTypes.STRING(30),
    blocked_username: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'blocks',
    timestamps: false
  });
  return blocks;
};