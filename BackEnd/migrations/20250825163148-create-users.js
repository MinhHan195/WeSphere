'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Sequelize tự sinh UUID v4
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(50)
      },
      fullname: {
        type: Sequelize.STRING(50)
      },
      gender: {
        type: Sequelize.STRING(4)
      },
      phone: {
        type: Sequelize.STRING(11)
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};