'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      link_id: {
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
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(500)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};