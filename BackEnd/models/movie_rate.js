'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie_rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie_rate.belongsTo(models.movie, { foreignKey: 'movie_id', targetKey: 'id' });
      movie_rate.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'userId' });
    }
  }
  movie_rate.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    rate: DataTypes.INTEGER,
    movie_id: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'movie_rate',
    timestamps: false
  });
  return movie_rate;
};