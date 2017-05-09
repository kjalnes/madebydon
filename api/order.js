const app = require('express').Router();
const models = require('../models').models;

module.exports = app;

app.get('/:orderId', (req, res, next) => {
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
                if (req.body.overwriteQty) {
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
app.post(`/:orderId/shipping`, (req, res, next) => {
    models.Address.create(req.body.userInfo)
        .then(address => {
            return models.Order.findOne({ where: { id: req.params.orderId }})
                .then(order => {
                    order.shippingId = address.id
                    order.save();
                    res.send([order]);
                });
        })
        .catch(next);
});


// post billing address
app.post('/:orderId/billing', (req, res, next) => {
    models.Address.create(req.body.userInfo)
        .then(address => {
            return models.Order.findById(req.params.orderId)
                .then(order => {
                    order.billingId = address.id
                    order.save();
                    res.send([order]);
                })
        })
        .catch(next)
});


// post payment
app.post('/:orderId/payment', (req, res, next) => {
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
            order = _order;
            let amount = order[0].orderlines.reduce( (total, line) => {
                return total+= (line.product.price * line.qty)
            },0)

            //sk = secret key
            const stripe = require('stripe')('sk_test_R10qlCsOK5ECIlbM6geYGHIR')

            // returns a promise
            return stripe.charges.create({
                amount: amount,
                currency: 'usd',
                description: 'we be shoppin',
                source: req.body.token
            })
        })
        .then(charge => {
            console.log('stripe call success amount', charge.amount);
            // console.log(order[0])
            // Update the order status and the order
            order[0].status = 'complete';
            order[0].confirmationId = charge.id
            order[0].amount = charge.amount
            order[0].tax = charge.amount * 0.08875
            order[0].total = charge.amount + order[0].tax + order[0].shippingCost
            // here the stripe number an others matching records

            console.log('order.status after save', order[0].status)

            return order[0].save()
        })
        .then(_order => {
            order = _order;
            // console.log('ready to send the order',_order);
            // create new empty order for user
            return models.Order.create({ userId: _order.userId })
        })
        .then(newOrder => {
            console.log('newOrder', newOrder);
            // Order confirmation via email
            // sendEmail();

            res.send({ order: order, newOrder: newOrder });
        })
        .catch(err => res.status(500).send(err));
});


function sendEmail() {
    console.log('sendemail');
    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email('thanks@madebydon.com');
    var toEmail = new helper.Email('mrestuccia@mac.com');
    var subject = 'Sending with SendGrid is Fun';
    var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
}
