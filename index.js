// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Load enviroment
require('dotenv').load()

// Loading database settings
const urlDb = process.env.HOD_DB

// Inicializating express server
const app = express()

// Starting Database connection
mongoose.connect(urlDb, { useMongoClient: true })

// Setting server port
var port = process.env.PORT || 8080

// Loading router
const client = require('./routes/client')
// const api = require('./routes/api')

// Setting template engine
app.set('view engine', 'pug')

// Setting time manager
app.locals.moment = moment

// Setting statics
app.use(express.static('public'))

// Parsing body requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Calling routes
app.use(client)
// app.use(api)

// Starting express server
app.listen(port)
console.log(`Listening on PORT ${port}...`)
