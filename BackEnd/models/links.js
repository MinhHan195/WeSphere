'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      links.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
    }
  }
  links.init({
    link_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: DataTypes.UUID,
    title: DataTypes.STRING(20),
    url: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'links',
    timestamps: false
  });
  return links;
};