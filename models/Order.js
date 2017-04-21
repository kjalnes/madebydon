const conn = require('./db');

const Order = conn.define('order', {
      status: conn.Sequelize.ENUM('complete', 'pending')
});

module.exports = Order;
