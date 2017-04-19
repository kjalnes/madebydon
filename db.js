const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  firstName: conn.Sequelize.STRING,
  lastName: conn.Sequelize.STRING,
  email: conn.Sequelize.STRING,
  password: conn.Sequelize.STRING,
});

const Product = conn.define('product', {
  name: conn.Sequelize.STRING,
  price: conn.Sequelize.FLOAT,
  description: conn.Sequelize.TEXT,
  imgURL: conn.Sequelize.STRING
});

const Order = conn.define('order', {
      status: conn.Sequelize.ENUM('complete', 'pending')
});

// relationships
Order.belongsTo(User); // creates userId
User.hasMany(Order);



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
      email: 'mrestuccia@mac.com',
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
      email: 'kris.alnes@gmail.com',
      password: 'kdog'
    }];



  return sync()
    .then(()=> {
      const productPromises = products.map( product => Product.create(product));
      const userPromises = users.map( user => User.create(user));
      // Order.create({ userId: 4, status: 'pending' });
      Order.create({ userId: 2, status: 'pending' });
      return Promise.all(promises);
    });
};

module.exports = {
  models: {
    Product,
    User
  },
  sync,
  seed
};
