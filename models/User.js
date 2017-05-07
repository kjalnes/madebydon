const conn = require('./db');

const User = conn.define('user', {
    firstName: {
        type: conn.Sequelize.STRING,
        validate: {
            requiresContent: function(value) {
                if(value === "" || value === null) {
                    throw new Error('Validation error')
                }
            }
        }
    },

    lastName: conn.Sequelize.STRING,
    email: conn.Sequelize.STRING,
    password: conn.Sequelize.STRING,
});

module.exports = User;
