const app = require('express').Router();
const models = require('../models').models;

module.exports = app;


/* CREATE user and CREATE empty order */
app.post('/', (req, res, next)=> {
    // maybe we should check if user already exist before creating ?
    models.User.create(req.body.userInfo)
    .then( user => {
        let orderlines;
        return models.Order.create({ status: 'pending', userId: user.id })
        .then( order => {
            orderlines = req.body.cart.cartItems.map( line => {
                return models.OrderLine.create({ qty: line.qty, productId: line.productId, orderId: order.id })
            })
        })
        .then( () => Promise.all(orderlines))
        .then( () => {
            console.log('order and orderlines created')
            res.send(user)
        })
    })
    .catch(next)
});


//req.body.cart { cartItems: [ { orderId: 0, qty: 3, product: [Object], productId: 3 } ] }
