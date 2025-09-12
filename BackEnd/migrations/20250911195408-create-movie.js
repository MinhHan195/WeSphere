'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movie', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Sequelize tự sinh UUID v4
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING(2048),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      actor: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      duration: {
        type: Sequelize.TIME,
        allowNull: false
      },
      poster: {
        type: Sequelize.STRING(1024),
        allowNull: false
      },
      publicId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movie');
  }
};