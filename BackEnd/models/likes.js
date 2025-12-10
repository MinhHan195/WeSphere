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
      likes.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
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
    userId: DataTypes.UUID,
    feed_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'likes',
    timestamps: false
  });
  return likes;
};