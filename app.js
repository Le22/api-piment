const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
// const saucesRoutes = require('./routes/sauces');

const path = require('path');

mongoose.connect('',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussi !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
// app.use('/api/sauces', saucesRoutes);

module.exports = app;
