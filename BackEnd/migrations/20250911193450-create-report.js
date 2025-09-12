'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('report', {
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
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId'
        }
      },
      media: {
        type: Sequelize.STRING(1024),
        allowNull: true
      },
      publicId: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      timeCreate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('report');
  }
};