const conn = require('./db');

const Order = conn.define('order', {
    status: {
        type: conn.Sequelize.ENUM('complete', 'pending'),
        defaultValue: 'pending'
    }
});

module.exports = Order;
