const app = require('express').Router();
const models = require('../models').models;

module.exports = app;

app.get('/:orderId', (req, res, next) => {
    // models.Order.findOne(
    models.Order.findAll(
        {
            where: { id: req.params.orderId },
            include: [
                {
                    model: models.OrderLine,
                    include: [{ model: models.Product }]
                }
                ,
                {
                    model: models.Address,
                    as: 'shipping'
                },
                {
                    model: models.Address,
                    as: 'billing'
                }
            ]
        })
        .then(order => {
            res.send(order);
        })
        .catch(next);
});


app.post('/:orderId', (req, res, next) => {
    models.OrderLine.findOne(
        {
            where: {
                orderId: req.params.orderId,
                productId: req.body.product.id
            }
        })
        .then(orderline => {
            if (orderline) {
                //Update the qty
                if(req.body.overwriteQty) {
                    orderline.qty = req.body.qty;
                } else {
                    orderline.qty += req.body.qty;
                }

                return orderline.save();
            } else {
                // Insert
                return models.OrderLine.create(
                    {
                        qty: req.body.qty,
                        productId: req.body.product.id,
                        orderId: req.params.orderId
                    });
            }
        })
        .then((created) => {
            res.send(created);
        })
        .catch(next);
});

app.delete('/:orderId/:productId', (req, res, next) => {
    console.log('DELETE', req.params.orderId, req.params.productId);
    models.OrderLine.destroy({
        where:
        {
            productId: req.params.productId,
            orderId: req.params.orderId
        }
    })
        .then((num) => {
            console.log('deleted = ', num);
            res.sendStatus(200);
        })
        .catch(next);
});

// post shipping address
app.post(`/:orderId/shipping`, (req, res,next) => {
    models.Address.create(req.body.userInfo)
    .then( address => {
        return models.Order.findById(req.params.orderId)
            .then( order => {
                order.shippingId = address.id
                order.save();
                res.send([ order ]);
            })
    })
    .catch(next)
});


// post billing address
app.post('/:orderId/billing', (req, res,next) => {
    models.Address.create(req.body.userInfo)
    .then( address => {
        return models.Order.findById(req.params.orderId)
            .then( order => {
                order.billingId = address.id
                order.save();
                res.send([ order ]);
            })
    })
    .catch(next)
});


// post payment
app.post('/:orderId/payment', (req, res,next) => {
    let order;

    models.Order.findAll({
        where: { id: req.params.orderId },
        include: [
            {
                model: models.OrderLine,
                include: [{ model: models.Product }]
            }
            ,
            {
                model: models.Address,
                as: 'shipping'
            },
            {
                model: models.Address,
                as: 'billing'
            }
        ]
    })
    .then(_order => {
        // console.log('order exist', _order);
        order = _order;

        //sk = secret key
        const stripe = require('stripe')('sk_test_R10qlCsOK5ECIlbM6geYGHIR')

        // returns a promise
        return stripe.charges.create({
            amount: 200.00,
            currency: 'usd',
            description: 'we be shoppin',
            source: req.body.token
        })
    })
    .then( charge => {
        console.log('stripe call success', charge);
        // Update the order status and the order
        // console.log('order.status before save', order[0].status)
        order[0].status = 'complete';
        order[0].confirmationId = charge.id
        order[0].amount = charge.amount

        // order.confirmationId = charge.id
        // here the stripe number an others matching records

        console.log('order.status after save', order[0].status)

        return order[0].save()
    })
    .then( _order => {
        order = _order;
        // console.log('ready to send the order',_order);
        // create new empty order for user
        return models.Order.create({ userId: _order.userId })
    })
    .then( newOrder => {
        console.log('newOrder', newOrder)
        res.send({order: order, newOrder: newOrder });
    })
    .catch(err => records.sendStatus(500));
});


