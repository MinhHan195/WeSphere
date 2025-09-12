'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('limits', {
      limit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      limiter_username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        }
      },
      limited_username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        }
      }
    }, {
      uniqueKeys: {
        limits_unique: {
          fields: ['limiter_username', 'limited_username']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('limits');
  }
};