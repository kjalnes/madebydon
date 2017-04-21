const conn = require('./db');

const OrderLine = conn.define('orderline', {
      qty: conn.Sequelize.INTEGER
});

module.exports = OrderLine;
