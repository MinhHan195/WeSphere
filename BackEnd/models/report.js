'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      report.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
    }
  }
  report.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: DataTypes.STRING(2048),
    userId: DataTypes.UUID,
    media: DataTypes.STRING(1024),
    publicId: DataTypes.STRING(50),
    timeCreate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'report',
    timestamps: false
  });
  return report;
};