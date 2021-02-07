'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  lap.init({
    lap_name: DataTypes.STRING,
    thromde_id: DataTypes.INTEGER,
    thromde_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lap',
  });
  return lap;
};