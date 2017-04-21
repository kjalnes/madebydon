const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

module.exports = conn;
