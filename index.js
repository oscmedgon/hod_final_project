const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
require('dotenv').load()
const app = express()
var port = process.env.PORT || 8080
const routes = require('./routes')

app.set('view engine', 'pug')
app.locals.moment = moment

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

app.listen(port)
console.log(`Listening on PORT ${port}...`)
