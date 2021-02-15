'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fid: {
        type: Sequelize.INTEGER
      },
      lap_id: {
        type: Sequelize.INTEGER
      },
      plot_id: {
        type: Sequelize.STRING
      },
      d_status: {
        type: Sequelize.STRING
      },
      plot_use: {
        type: Sequelize.STRING
      },
      max_height: {
        type: Sequelize.STRING
      },
      setback_e: {
        type: Sequelize.STRING
      },
      parking: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plots');
  }
};