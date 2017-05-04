const app = require('express').Router();
const models = require('../models').models;
const jwt = require('jwt-simple');
const secret = process.env.SECRET || 'foo';

module.exports = app;

// user login
app.post('/', (req, res, next)=> {
  models.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then( user => {
    if(user){
      const token = jwt.encode({id: user.id}, secret);
      return res.send({ token });
    }
    return res.sendStatus(401);
  })
  .catch(next);
});


// GET should get the users cart somehow....
app.get('/:token', (req, res, next) => {
    try{
        const token = jwt.decode(req.params.token, secret);
        // console.log('token', token)
        models.User.findOne({
          where: { id: token.id },
          include: [{
            model: models.Order,
            where: {
              userId: token.id,
              status: 'pending'
            }
          }]
        })
        .then( user => {
            if(!user) {
                return res.sendStatus(401)
            }
            res.send(user)
        })
    }
    catch(err) {
        res.sendStatus(500)
    }
});
