'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      follower_userId: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      following_userId: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'userId'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};