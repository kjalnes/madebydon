const conn = require('./db');

const Address = conn.define('address', {
    addressLine1: conn.Sequelize.STRING,
    addressLine2: conn.Sequelize.STRING,
    city: conn.Sequelize.STRING,
    state: conn.Sequelize.STRING,
    zip: conn.Sequelize.STRING,
    country: conn.Sequelize.STRING,
});

module.exports = Address;
