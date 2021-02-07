'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class building extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  building.init({
    structure_id: DataTypes.INTEGER,
    lap_id: DataTypes.INTEGER,
    owner: DataTypes.STRING,
    contact: DataTypes.STRING,
    year: DataTypes.STRING,
    status: DataTypes.STRING,
    use: DataTypes.STRING,
    height: DataTypes.STRING,
    attic: DataTypes.STRING,
    jamthog: DataTypes.STRING,
    basement: DataTypes.STRING,
    stilts: DataTypes.STRING,
    facade: DataTypes.STRING,
    b_wall: DataTypes.STRING,
    balcony: DataTypes.STRING,
    color: DataTypes.STRING,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'building',
  });
  return building;
};