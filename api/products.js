const app = require('express').Router();
const models = require('../models').models;

module.exports = app;


app.get('/', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products))
    .catch(next);
});

app.get('/:id', (req, res, next)=> {
  models.Product.findById(req.params.id)
    .then( product => res.send(product))
    .catch(next);
});

app.delete('/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});
