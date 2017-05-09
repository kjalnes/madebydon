const conn = require('./db');

const User = conn.define('user', {
    firstName: {
        type: conn.Sequelize.STRING,
        validate: {
            requiresContent: function (value) {
                if (value === "" || value === null) {
                    throw new Error('Validation error');
                }
            }
        }
    },

    lastName: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Address' }
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        validate: {
            isEmail: true,
            notEmpty: { msg: 'Please complete Email' }
        }
    },
    password: {
        type: conn.Sequelize.STRING,
        validate: {
            notEmpty: { msg: 'Please complete Password' }
        }
    },
}, {
        indexes: [{ unique: true, fields: ['email'] }]
    });

module.exports = User;
