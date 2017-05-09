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
    { name: 'Minimalist Folding Bag',
      price: 139, imgURL: 'style_1.jpg',
      description: `Small minimalist folding bag with zipper accessing both sides of the inside. Slinky strap with knots. Can be worn both ways.
Black full grain cow hide with brown suede interior.`,
productDetails: `Style # 008<br/>
Style type: Shoulder Bag<br/>
Size: W: 8” (20cm) / H: 5.5” (14cm)<br/>
Length of Shoulder Strap: 48” (122cm)<br/>
Type of Closure: Zipper<br/>
Material 100% Leather<br/>
Color: Black<br/>
Interior: Brown Suede` },
    { name: 'Minimalist Leather Backpack',
      price: 189,
      imgURL: 'style_2.jpg',
      description: `Minimalist backpack with long slinky straps.
Vertical full size zipper pocket in front and horizontal full size zipper pocket in the back.
Black cow hide with brown suede interior.
`,
      productDetails: `Style # 001<br/>
Style type: Backpack<br/>
Size: W: 12” (31cm) / H:12” (31cm)<br/>
Length of Shoulder Straps: 38”(97cm)<br/>
Type of Closure: Zipper<br/>
Outer Pockets : 2 Zipper (front and back)<br/>
Material 100% Leather<br/>
Color: Black<br/>
Interior: Brown Suede`},
    { name: 'Geometry Shoulder Bag',
      price: 139,
      imgURL: 'style_3.jpg',
      description: `Don calls this the geometric hippy bag. Everyone had this in the 70s, but no one had the zipper figured out. Two snap button adjusts the size. Strap also adjustable.
Black cow hide with brown suede interior.`,
      productDetails: `Style # 007<br/>
Style type: Shoulder Bag / Hand Bag<br/>
Size:W:11.8”(30cm) / H:11.8”(30cm)<br/>
Length of Shoulder Strap:43.7 max ”(max 111cm)<br/>
Body Weight:<br/>
Type of Closure: Zipper / 2 snap buttons<br/>
Material 100% Leather<br/>
Color Black<br/>
Interior Brown`},
    { name: 'Minimalist Envelope Handbag',
      price: 89,
      imgURL: 'style_4.jpg',
      description: `Minimalist envelope bag. Folds to a clutch. One suede interior zipper pocket.
Black full grain cow hide.`,
      productDetails: `Style # 006<br/>
Style type: Clutch / Hand Bag<br/>
Size:W:9.8”(25cm) / H:11.8”(30cm)<br/>
Body Weight:<br/>
Type of Closure: Snap button front<br/>
Inner Pockets : 1 Zipper<br/>
Material 100% Leather<br/>
Color Black` },
    { name: 'LARGE SHOULDER BAG',
      price: 279,
      imgURL: 'style_4.jpg',
      description: `The large bag. Don says you can fill it with bricks and it won’t fall apart. The strap piece goes all the way from buckle to the bottom of the bag.
Black cow hide with brown suede interior.`,
      productDetails: `Style # 005<br/>
Style type: Shoulder Bag<br/>
Width: 19” (48cm)<br/>
Height: 14” (35cm)<br/>
Depth: 4.5" (11xm)<br/>
Length of Shoulder Strap: 52.7” max (134cm)<br/>
Type of Closure: Twist button front<br/>
Inner Pockets : 2 Zipper<br/>
Outer Pockets: 1 Zipper (back)<br/>
Material: 100% Leather<br/>
Color: Black<br/>
Interior: Brown` },
    { name: 'Medium Shoulder Bag',
      price: 159,
      imgURL: 'style_5.jpg',
      description: `Shoulder bag with adjustable strap buckle. Simple and functional with one inner zipper pocket and two small open pockets on the inside.
Black cow hide with brown suede interior.`,
      productDetails: `Style # 004<br/>
Style type: Shoulder Bag<br/>
Size:W: 12.9” (33cm) / H:10.2”(26cm)<br/>
Length of Shoulder Strap: 43” max (109cm max)<br/>
Type of Closure: Fold over flap<br/>
Inner Pockets: 1 Zipper / 2 open pockets<br/>
Material: 100% Leather<br/>
Color: Black` },
    { name: 'Minimalist Bag Long Strap',
      price: 89,
      imgURL: 'style_6.jpg',
      description: `Minimalist long strap bag, no fuss. One small zipper pocket on the inside. Zipper closure.
Black cow hide with brown leather interior.`,
      productDetails: `Style # 003<br/>
Style type: Shoulder Bag<br/>
Size:W: 9.4” (24cm) / H:11.4”(29cm)<br/>
Length of Shoulder Strap: 52.7”(134cm)<br/>
Body Weight:<br/>
Type of Closure: Zipper<br/>
Inner Pockets : 1 Zipper<br/>
Material 100% Leather<br/>
Color Black` },
    { name: 'Multi Pocket Backpack',
      price: 279,
      imgURL: 'style_7.jpg',
      description: `Large multi pocket backpack with adjustable straps. Zipper pocket in back, two zipper pockets in the front and two on the inside.
Black cow hide with brown suede interior.`,
      productDetails: `Style # 002<br/>
Style type: Backpack<br/>
Size: W:16.5”(42cm) / H:19.3”(49cm)<br/>
Length of Shoulder Straps: 37.3” max (95cm max)<br/>
Body Weight:<br/>
Type of Closure: zipper and twist buttons<br/>
Inner Pockets :1 Zipper<br/>
Outer Pockets : 3 Zipper and 2 open side pockets<br/>
Material 100% Leather<br/>
Color: Black<br/>
Interior: Brown`  },
];


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
      const orderOne = Order.create({ userId: 3, status: 'pending', shippingId: 1, billingId: 2
 });
      const orderTwo = Order.create({ userId: 1, status: 'pending' });
      const orderThree = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2, confirmationId: 'ch_1AG9jlG9HL9FNXzQRYZ9KpdZ' });
      const orderFour = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2, confirmationId: 'ch_1AG9jlG9HL9FNXzQRYZ9KpdZ' });
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

