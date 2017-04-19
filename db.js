const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: conn.Sequelize.STRING
});

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }));
      return Promise.all(promises);
    });
};

module.exports = {
  models: {
    Product
  },
  sync,
  seed
};
