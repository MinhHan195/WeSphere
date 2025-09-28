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
      limits.belongsTo(models.accounts, { as: 'limiter', foreignKey: 'limiter_username', targetKey: 'username' });
      limits.belongsTo(models.accounts, { as: 'limited', foreignKey: 'limited_username', targetKey: 'username' });
    }
  }
  limits.init({
    limit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    limiter_username: DataTypes.STRING(30),
    limited_username: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'limits',
    timestamps: false
  });
  return limits;
};