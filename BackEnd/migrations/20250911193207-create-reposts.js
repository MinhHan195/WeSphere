'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reposts', {
      repost_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        },
      },
      feedId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'feed',
          key: 'id'
        },
      },
      timeCreate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reposts');
  }
};