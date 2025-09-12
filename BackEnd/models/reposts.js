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
      reposts.belongsTo(models.accounts, { foreignKey: 'username', targetKey: 'username' });
      reposts.belongsTo(models.feed, { foreignKey: 'feedId', targetKey: 'id' });
    }
  }
  reposts.init({
    repost_id: {
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
    modelName: 'reposts',
    timestamps: false
  });
  return reposts;
};