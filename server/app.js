// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const cookieParser = require('cookie-parser');
const tokenParser = require('./config/tokenParser');
const userParser = require('./config/userParser');

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

// Configuring express app
// Setting template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

// Setting time manager
app.locals.moment = moment;
// Setting statics
app.use(express.static(path.join(__dirname, 'public')));

// Parsing body requests
app.use(bodyParser.text({limit: -1}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenParser);
app.use(userParser);

// Calling routes
app.use(routesClient);
app.use(routesAuth);
app.use(routesApi);

module.exports = app;
