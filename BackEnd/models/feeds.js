'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feeds.belongsTo(models.accounts, { foreignKey: 'username', targetKey: 'username' });
      feeds.hasMany(models.likes, { foreignKey: 'feed_id', sourceKey: 'id' });
    }
  }
  feeds.init({
    id: {
      type: DataTypes.UUID, // hoặc kiểu bạn dùng
      defaultValue: DataTypes.UUIDV4, // nếu muốn tự động sinh UUID
      primaryKey: true
    },
    content: DataTypes.STRING(2048),
    tag: DataTypes.STRING(30),
    privateMode: DataTypes.STRING(15),
    username: DataTypes.STRING(30),
    commentOfPost: DataTypes.UUID,
    active: DataTypes.BOOLEAN,
    timeCreate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'feeds',
    timestamps: false
  });
  return feeds;
};