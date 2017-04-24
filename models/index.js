const conn = require('./db');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const OrderLine = require('./OrderLine');


Order.belongsTo(User); // creates userId
User.hasMany(Order);

OrderLine.belongsTo(Order); // creates orderId
OrderLine.belongsTo(Product); // creates productId
Order.hasMany(OrderLine); // allow me to include on findAll
Product.hasMany(OrderLine);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = [
      {
        name:'football',
        price: 24,
        description: 'its a ball',
        imgURL: ''
      },
      {
        name:'bat',
        price: 44,
        description: 'its for homeruns',
        imgURL: ''
      },
      {
        name:'basketball',
        price: 28,
        description: 'its also a ball',
        imgURL: ''
      }];

  const users = [
    {
      firstName: 'Mauro',
      lastName: 'Restuccia',
      email: 'mauro',
      password: '1234'
    },
    {
      firstName: 'Harish',
      lastName: 'tadikona',
      email: 'harish11.tadikonda@gmail.com',
      password: 'harish29'
    },
    {
      firstName: 'Kris',
      lastName: 'Alnes',
      email: 'kris',
      password: 'kdog'
    }];

  return sync()
    .then(()=> {
      const productPromises = products.map( product => Product.create(product));
      const userPromises = users.map( user => User.create(user));
      Order.create({ userId: 3, status: 'pending' });
      Order.create({ userId: 1, status: 'pending' });
      return Promise.all([productPromises, userPromises])
    })
    .then( () => {
          OrderLine.create({ qty: 3, productId: 3, orderId: 1 })
          OrderLine.create({ qty: 2, productId: 1, orderId: 1 })
    })
    .catch( e => console.log(e))
};

module.exports = {
  models: {
    Product,
    User,
    Order,
    OrderLine
  },
  sync,
  seed
};

