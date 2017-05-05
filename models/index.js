const conn = require('./db');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const OrderLine = require('./OrderLine');
const Address = require('./Address');

Order.belongsTo(User); // creates userId
User.hasMany(Order);

OrderLine.belongsTo(Order); // creates orderId
OrderLine.belongsTo(Product); // creates productId
Order.hasMany(OrderLine); // allow me to include on findAll
Product.hasMany(OrderLine);

Order.belongsTo(Address, { as: 'shipping' });
Order.belongsTo(Address, { as: 'billing' });





const sync = () => conn.sync({ force: true });

const seed = () => {

  const products = [
    { name: 'Minimalist Folding Bag', price: 139, imgURL: 'style_1.jpg' },
    { name: 'Minimalist Leather Backpack', price: 189, imgURL: 'style_2.jpg' },
    { name: 'Geometry Shoulder Bag', price: 139, imgURL: 'style_3.jpg' },
    { name: 'Minimalist Envelope Handbag', price: 89, imgURL: 'style_4.jpg' },
    { name: 'LARGE SHOULDER BAG LONG STRAP', price: 279, imgURL: 'style_4.jpg' },
    { name: 'Medium Shoulder Bag Long Strap', price: 159, imgURL: 'style_5.jpg' },
    { name: 'Minimalist Bag Long Strap', price: 89, imgURL: 'style_6.jpg' },
    { name: 'Large Multi Pocket Leather Backpack', price: 279, imgURL: 'style_7.jpg' },
    { name: 'Minimalist Slouchy Leather Backpack', price: 240, imgURL: 'style_8.jpg' }
  ]


  const users = [
    { firstName: 'Mauro', lastName: 'Restuccia', email: 'Mauro', password: 'mcat' },
    { firstName: 'Harish', lastName: 'tadikona', email: 'harish11.tadikonda@gmail.com', password: 'harish29' },
    { firstName: 'Kris', lastName: 'Alnes', email: 'kris', password: 'kdog' }];

  const shippingAddress = { addressLine1: '123 Green ave', addressLine2: 'apt 4', city: 'Brooklyn', state: 'NY', zip: '11211', country: 'USA' };
  const billingAddress = { addressLine1: '60 Berry Street', addressLine2: 'apt 4D', city: 'Brooklyn', state: 'NY', zip: '11211', country: 'USA' };

  return sync()
    .then(() => {
      const productPromises = products.map(product => Product.create(product));
      const userPromises = users.map(user => User.create(user));
      const shippingTest = Address.create(shippingAddress, { as: 'shipping' })
      const billingTest = Address.create(billingAddress, { as: 'billing' })
      return Promise.all([productPromises, userPromises, shippingTest, billingTest])
    })
    .then(() => {
      const orderOne = Order.create({ userId: 3, status: 'pending', shippingId: 1, billingId: 2 });
      const orderTwo = Order.create({ userId: 1, status: 'pending' });
      const orderThree = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2 });
      const orderFour = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2 });
      return Promise.all([orderOne, orderTwo, orderThree, orderFour])
    })
    .then( ([orderOne, orderTwo, orderThree, orderFour]) => {
      const orderLineOne = OrderLine.create({ qty: 3, productId: 3, orderId: orderOne.id });
      const orderLineTwo = OrderLine.create({ qty: 2, productId: 1, orderId: orderOne.id });
      const orderLineThree = OrderLine.create({ qty: 3, productId: 2, orderId: orderThree.id });

      const orderLineFour = OrderLine.create({ qty: 1, productId: 3, orderId: orderFour.id });
      const orderLineFive = OrderLine.create({ qty: 2, productId: 2, orderId: orderFour.id });

      return Promise.all([orderLineOne, orderLineTwo, orderThree, orderLineFour, orderLineFive])
    })
    .catch(err => console.log(err))
};

module.exports = {
  models: {
    Product,
    User,
    Order,
    OrderLine,
    Address
  },
  sync,
  seed
};

