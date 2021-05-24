'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    business_website: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.belongsTo(models.User, { foreignKey: 'owner_id'})
    Business.hasMany(models.Review, { foreignKey: 'business_id'})
    Business.hasMany(models.Image, { foreignKey: 'business_id'})
    // Business.belongsToMany(models.User, { foreignKey: 'owner_id'})
  };
  return Business;
};
