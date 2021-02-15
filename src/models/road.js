'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class road extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  road.init({
    fid: DataTypes.INTEGER,
    lap_id: DataTypes.INTEGER,
    d_status: DataTypes.STRING,
    t_flow:DataTypes.STRING,
    row: DataTypes.FLOAT,
    lanes: DataTypes.INTEGER,
    carriage_width: DataTypes.FLOAT,
    median: DataTypes.FLOAT,
    parking_left: DataTypes.INTEGER,
    parking_right: DataTypes.INTEGER,
    path_left: DataTypes.FLOAT,
    path_right: DataTypes.FLOAT,
    light_left: DataTypes.INTEGER,
    light_right: DataTypes.INTEGER,
    drains_left: DataTypes.FLOAT,
    drains_right: DataTypes.FLOAT,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'road',
  });
  return road;
};