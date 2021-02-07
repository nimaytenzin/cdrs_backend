'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class footpath extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  footpath.init({
    fid: DataTypes.INTEGER,
    lap_id: DataTypes.INTEGER,
    d_status: DataTypes.STRING,
    width: DataTypes.FLOAT,
    lighting: DataTypes.STRING,
    friendliness: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'footpath',
  });
  return footpath;
};