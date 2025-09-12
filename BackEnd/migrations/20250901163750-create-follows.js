'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      follower_username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        primaryKey: true,
        references: {
          model: 'accounts',
          key: 'username'
        }
      },
      following_username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        primaryKey: true,
        references: {
          model: 'accounts',
          key: 'username'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};