'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blocks', {
      block_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blocker_username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        }
      },
      blocked_username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'username'
        }
      }
    }, {
      uniqueKeys: {
        blocks_unique: {
          fields: ['blocker_username', 'blocked_username']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blocks');
  }
};