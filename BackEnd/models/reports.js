'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      exports.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
    }
  }
  exports.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: DataTypes.STRING(2048),
    userId: DataTypes.UUID,
    media: DataTypes.STRING(1024),
    publicId: DataTypes.STRING(50),
    timeCreate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'reports',
    timestamps: false
  });
  return exports;
};