const app = require('express').Router();
const models = require('../models').models;

module.exports = app;

app.post('/', (req, res, next)=> {
    console.log('create user', req.body)
    models.User.create(req.body)
    .then( user => res.send(user))
    .catch(next)
});
