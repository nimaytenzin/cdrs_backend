'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fid: {
        unique:true,
        type: Sequelize.INTEGER
      },
      lap_id: {
        type: Sequelize.INTEGER
      },
      d_status: {
        type: Sequelize.STRING
      },
      t_flow:{
        type: Sequelize.STRING
      },
      row: {
        type: Sequelize.FLOAT
      },
      lanes: {
        type: Sequelize.INTEGER
      },
      carriage_width: {
        type: Sequelize.FLOAT
      },
      median: {
        type: Sequelize.FLOAT
      },
      parking_left: {
        type: Sequelize.INTEGER
      },
      parking_right: {
        type: Sequelize.INTEGER
      },
      path_left: {
        type: Sequelize.FLOAT
      },
      path_right: {
        type: Sequelize.FLOAT
      },
      light_left: {
        type: Sequelize.INTEGER
      },
      light_right: {
        type: Sequelize.INTEGER
      },
      drains_left: {
        type: Sequelize.FLOAT
      },
      drains_right: {
        type: Sequelize.FLOAT
      },
      remarks: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('roads');
  }
};