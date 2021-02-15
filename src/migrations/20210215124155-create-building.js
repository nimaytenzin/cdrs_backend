'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('buildings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      structure_id: {
        type: Sequelize.INTEGER
      },
      lap_id: {
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      use: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      attic: {
        type: Sequelize.STRING
      },
      jamthog: {
        type: Sequelize.STRING
      },
      basement: {
        type: Sequelize.STRING
      },
      stilts: {
        type: Sequelize.STRING
      },
      facade: {
        type: Sequelize.STRING
      },
      b_wall: {
        type: Sequelize.STRING
      },
      balcony: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      parking: {
        type: Sequelize.INTEGER
      },
      res_units: {
        type: Sequelize.INTEGER
      },
      com_units: {
        type: Sequelize.STRING
      },
      off_units: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('buildings');
  }
};