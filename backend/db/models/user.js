'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    about_me: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Business, { foreignKey: 'owner_id'})
    User.hasMany(models.Review, { foreignKey: 'user_id'})
  };
  return User;
};
