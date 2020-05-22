'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Market, {
      foreignKey: 'marketId',
      onDelete: 'CASCADE',
    })
  };
  return Image;
};