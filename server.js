const express = require('express');
const path = require('path');
const db = require('./db');


const app = express();
app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api', require('./routes'));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.seed();
