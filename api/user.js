const app = require('express').Router();
const models = require('../models').models;

module.exports = app;


/* CREATE user and CREATE empty order */
app.post('/', (req, res, next)=> {
    // this assumes the user does not exist already
    models.User.create(req.body.userInfo)
    .then( user => {
        return models.Order.create({ status: 'pending', userId: user.id })
        .then( order => {
            let orderlines = req.body.cart.cartItems.map( line => {
                return models.OrderLine.create({
                    qty: line.qty,
                    productId: line.productId,
                    orderId: order.id })
            })
            return Promise.all(orderlines)
        })
        .then( () => {
            console.log('user, order and orderlines created')
            res.send(user)
        })
    })
    .catch(next)
});
