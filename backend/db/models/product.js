'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.NUMERIC,
    imgPath: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Review, { foreignKey: 'product_id' })
    Product.hasMany(models.Cart, { foreignKey: 'product_id' })
    Product.belongsTo(models.Category, { foreignKey: 'category_id'})
  };
  return Product;
};