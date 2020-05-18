'use strict';
module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Market.associate = function(models) {
    // associations can be defined here
    Market.belongsTo(models.Category)
    Market.hasMany(models.Image, {
      foreignKey: 'marketId',
      onDelete: 'CASCADE'
    });
  };
  return Market;
};