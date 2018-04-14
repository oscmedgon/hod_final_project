// Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
const passport = require('./config/passport');
const path = require('path');

const firebase = require('firebase');
const serviceAccount = require('../private/qa-hod-firebase-adminsdk-wqzon-a3d7b7b3b0.json');

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

// Configuring express app
// Setting template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Setting time manager
app.locals.moment = moment;
// Setting statics
app.use(express.static(path.join(__dirname, 'public')));

// Parsing body requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Calling routes
app.use(routesClient);
app.use(routesAuth);
app.use(routesApi);

module.exports = app;
