// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const passport = require('./config/passport')
const path = require('path')

// Loading router
// const routesAuth = require('./routes/auth')
const routesClient = require('./routes/client')
const routesApi = require('./routes/api')

// Express inicialization
const app = express()

// Setting template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Setting time manager
app.locals.moment = moment

// Setting statics
app.use(express.static(path.join(__dirname, 'public')))

// Parsing body requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Calling routes
app.use(routesClient)
// app.use(routesAuth)
app.use(routesApi)

module.exports = app
