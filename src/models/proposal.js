'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proposals  extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  proposals.init({
    fid: DataTypes.INTEGER,
    lap_id: DataTypes.INTEGER,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'proposals',
  });
  return proposals;
};