// import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const authRoutes = require('./routes/auth');
const saucesRoutes = require('./routes/sauces');

// import traitement image
const path = require('path');

// env
const dotenv = require("dotenv");
dotenv.config();

// url mongoDB
const MONGODB = process.env.MONGODB;

// connexion MongoDB
mongoose.connect(MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussi !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// server
const app = express();

// config image
app.use('/images', express.static(path.join(__dirname, 'images')));

// config auth server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/sauces', saucesRoutes);

// export app
module.exports = app;
