const conn = require('./db');

const Order = conn.define('order', {
    status: {
        type: conn.Sequelize.ENUM('complete', 'pending'),
        defaultValue: 'pending'
    },
    confirmationId: {
        type: conn.Sequelize.STRING,
        defaultValue: 'ch_1AG9jlG9HL9FNXzQRYZ9KpdZ'
    },
    amount: {
        type: conn.Sequelize.STRING,
        defaultValue: '0'
    }
});

module.exports = Order;
