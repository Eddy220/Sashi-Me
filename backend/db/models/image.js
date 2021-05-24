'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image_URL: DataTypes.STRING,
    business_id: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Business, { foreignKey: 'business_id'})
  };
  return Image;
};
