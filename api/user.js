const app = require('express').Router();
const models = require('../models').models;

module.exports = app;


/* CREATE user and CREATE empty order */
app.post('/', (req, res, next)=> {
    //  assumes the user does not exist in db already
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

// /api/user/:userId/orders

// get all completed orders from user
app.get('/:userId/orders', (req, res, next) => {
    models.Order.findAll({ where: {
            userId: req.params.userId,
            status: 'complete'
        },
        include: [
            {
                model: models.OrderLine,
                include: [ models.Product ]
            },
            {
                model: models.Address,
                as: 'billing'
            },
            {
                model: models.Address,
                as: 'shipping'
            }
        ]
    })
    .then( orders => {
        console.log('user has completed orders amount', orders.length)
        res.send(orders)
    })
    .catch(next)
});
