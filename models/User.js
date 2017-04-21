const conn = require('./db');

const User = conn.define('user', {
  firstName: conn.Sequelize.STRING,
  lastName: conn.Sequelize.STRING,
  email: conn.Sequelize.STRING,
  password: conn.Sequelize.STRING,
});

module.exports = User;
