'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likes.belongsTo(models.accounts, { foreignKey: 'username', targetKey: 'username' });
      likes.belongsTo(models.feeds, {
        foreignKey: 'feed_id', targetKey: 'id'
      });
    }
  }
  likes.init({
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: DataTypes.STRING(30),
    feed_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'likes',
    timestamps: false
  });
  return likes;
};