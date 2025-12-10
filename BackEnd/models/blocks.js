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
      blocks.belongsTo(models.users, {
        as: 'blocker',
        foreignKey: 'blocker_id',
        targetKey: 'userId'
      });
      blocks.belongsTo(models.users, {
        as: 'blocked',
        foreignKey: 'blocked_id',
        targetKey: 'userId'
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
    blocker_id: DataTypes.UUID,
    blocked_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'blocks',
    timestamps: false
  });
  return blocks;
};