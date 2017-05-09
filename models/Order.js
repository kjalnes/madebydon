const conn = require('./db');

const Order = conn.define('order', {
    status: {
        type: conn.Sequelize.ENUM('complete', 'pending'),
        defaultValue: 'pending'
    },
    confirmationId: {
        type: conn.Sequelize.STRING
    },
    amount: {
        type: conn.Sequelize.FLOAT,
        defaultValue: 0
    },
    shippingCost: {
        type: conn.Sequelize.FLOAT,
        defaultValue: 12.99
    },
    tax: {
        type: conn.Sequelize.FLOAT,
        defaultValue: 0
    },
    total: {
        type: conn.Sequelize.FLOAT,
        defaultValue: 0
    }
});

module.exports = Order;
