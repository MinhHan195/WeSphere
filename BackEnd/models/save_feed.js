'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class save_feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      save_feed.belongsTo(models.accounts, { foreignKey: 'username', targetKey: 'username' });
      save_feed.belongsTo(models.feed, { foreignKey: 'feedId', targetKey: 'id' });
    }
  }
  save_feed.init({
    save_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: DataTypes.STRING(30),
    feedId: DataTypes.UUID,
    timeCreate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'save_feed',
    timestamps: false
  });
  return save_feed;
};