// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const cookieParser = require('cookie-parser');
const tokenParser = require('./config/tokenParser');
const userParser = require('./config/userParser');
const cors = require('cors')

const firebase = require('firebase');

firebase.initializeApp({
  apiKey: process.env.FB_apiKey,
  authDomain: process.env.FB_authDomain,
  databaseURL: process.env.FB_databaseURL,
  projectId: process.env.FB_projectId,
  storageBucket: process.env.FB_storageBucket,
  messagingSenderId: process.env.FB_messagingSenderId
});

// Loading router
const routesAuth = require('./routes/auth');
const routesClient = require('./routes/client');
const routesApi = require('./routes/api');

// Express inicialization
const app = express();

// Configuring cors
app.use(cors());

// Configuring express app
// Setting template engine

// Setting time manager
app.locals.moment = moment;
// Setting statics
app.use(express.static(path.join(__dirname, 'public')));

// Parsing body requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenParser);
app.use(userParser);

// Calling routes
app.use('/api', routesClient);
app.use('/api', routesAuth);
app.use('/api', routesApi);

module.exports = app;
