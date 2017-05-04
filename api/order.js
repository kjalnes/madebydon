const app = require('express').Router();
const models = require('../models').models;


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





module.exports = app;
