const conn = require('./db');

const Product = conn.define('product', {
  name: conn.Sequelize.STRING,
  price: conn.Sequelize.FLOAT,
  description: conn.Sequelize.TEXT,
  productDetails: conn.Sequelize.TEXT,
  imgURL: conn.Sequelize.STRING
});

module.exports = Product;
