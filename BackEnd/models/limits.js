'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class limits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      limits.belongsTo(models.users, { as: 'limiter', foreignKey: 'limiter_userId', targetKey: 'userId' });
      limits.belongsTo(models.users, { as: 'limited', foreignKey: 'limited_userId', targetKey: 'userId' });
    }
  }
  limits.init({
    limit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    limiter_userId: DataTypes.UUID,
    limited_userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'limits',
    timestamps: false
  });
  return limits;
};