// Dependencies
  var opbeat = require('opbeat').start()
  const express = require('express')
  const session = require('express-session')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const moment = require('moment')
  const passport = require('./config/passport')
  const path = require('path')

  // Loading router
  const routesAuth = require('./routes/auth')
  const routesClient = require('./routes/client')
  const routesApi = require('./routes/api')

  // Express inicialization
  const app = express()

  // Configuring express app
  // Setting template engine
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))

  // Setting time manager
  app.locals.moment = moment
  // Configuring stadistics serverver
  app.use(opbeat.middleware.express())
  // Setting statics
  app.use(express.static(path.join(__dirname, 'public')))

  // Parsing body requests
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(session({ secret: process.env.SECRET }))
  app.use(passport.initialize())
  app.use(passport.session())

  // Calling routes
  app.use(routesClient)
  app.use(routesAuth)
  app.use(routesApi)

  module.exports = app
