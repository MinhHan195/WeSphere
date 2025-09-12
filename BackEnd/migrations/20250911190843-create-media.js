'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media', {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feed_id: {
        type: Sequelize.UUID,
        references: {
          model: 'feed',
          key: 'id'
        },
        allowNull: false
      },
      publicId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      url: {
        type: Sequelize.STRING(1024),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(5),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('media');
  }
};