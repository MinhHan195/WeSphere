'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      media.belongsTo(models.feed, { foreignKey: 'feed_id', targetKey: 'id' });
    }
  }
  media.init({
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    feed_id: DataTypes.UUID,
    publicId: DataTypes.STRING(50),
    url: DataTypes.STRING(1024),
    type: DataTypes.STRING(5)
  }, {
    sequelize,
    modelName: 'media',
    timestamps: false
  });
  return media;
};