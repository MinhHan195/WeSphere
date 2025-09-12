'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movie.init({
    id: {
      type: DataTypes.UUID, // hoặc kiểu bạn dùng
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // nếu muốn tự động sinh UUID
    },
    title: DataTypes.STRING(50),
    category: DataTypes.STRING(30),
    actor: DataTypes.STRING(30),
    duration: DataTypes.TIME,
    poster: DataTypes.STRING(1024),
    publicId: DataTypes.STRING(50),
    description: DataTypes.STRING(2048)
  }, {
    sequelize,
    modelName: 'movie',
    timestamps: false
  });
  return movie;
};