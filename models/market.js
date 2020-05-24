'use strict';
module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    name: {type : DataTypes.STRING},
    description: DataTypes.STRING,
    latitude: {
      type: DataTypes.DECIMAL,
      get() {
        return Number(this.getDataValue('latitude'));
      }
    },
    longitude:{
      type: DataTypes.DECIMAL,
      get() {
        return Number(this.getDataValue('longitude'));
      }
    },
    address: DataTypes.STRING
  }, {});
  Market.associate = function(models) {
    // associations can be defined here
    Market.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    }),
    Market.hasMany(models.Image, {
      foreignKey: 'marketId',
      onDelete: 'CASCADE',
    });
  };
  return Market;
};