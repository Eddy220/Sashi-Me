'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      },
    },
    business_id: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'user_id'})
    Review.belongsTo(models.Business, { foreignkey: 'business_id'})
  };
  return Review;
};
