'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    password: { 
      type:DataTypes.STRING, 
      set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 8));
    }}
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  Admin.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }
  return Admin;
};