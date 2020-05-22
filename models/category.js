'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {type:DataTypes.STRING, unique: true}
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};