const conn = require('./db');

const Address = conn.define('address', {
    addressLine1: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Address' }
        }
    },
    addressLine2: conn.Sequelize.STRING,
    city: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete City' }
        }
    },
    state: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete State' }
        }
    },
    zip: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Zip code' }
        }
    },
    country: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Country' }
        }
    }
});

module.exports = Address;
