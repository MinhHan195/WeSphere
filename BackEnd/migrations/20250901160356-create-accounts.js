'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        primaryKey: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(1024)
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      privateMode: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      onlineMode: {
        allowNull: false,
        type: Sequelize.STRING(10),
        defaultValue: 'everyone'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING(1024),
      },
      publicId: {
        allowNull: true,
        type: Sequelize.STRING(40),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isOnline: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};