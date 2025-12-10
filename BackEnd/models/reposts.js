'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reposts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reposts.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
      reposts.belongsTo(models.feeds, { foreignKey: 'feedId', targetKey: 'id' });
    }
  }
  reposts.init({
    repost_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: DataTypes.UUID,
    feedId: DataTypes.UUID,
    timeCreate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'reposts',
    timestamps: false
  });
  return reposts;
};