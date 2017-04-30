const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, { logging: false});

module.exports = conn;
