'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  plot.init({
    fid: DataTypes.INTEGER,
    lap_id: DataTypes.INTEGER,
    plot_id: DataTypes.STRING,
    d_status: DataTypes.STRING,
    plot_use: DataTypes.STRING,
    max_height: DataTypes.STRING,
    setback_e: DataTypes.STRING,
    parking: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plot',
  });
  return plot;
};