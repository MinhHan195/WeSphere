'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feeds', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Sequelize tự sinh UUID v4
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(2048),
        allowNull: true
      },
      tag: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      privateMode: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        }
      },
      commentOfPost: {
        type: Sequelize.UUID,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      timeCreate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('feeds');
  }
};