// Load enviroment
require('dotenv').load()
const {URL_DB} = process.env

// Setting server port
const port = process.env.PORT || 8080

// Loading database settings
const db = require('./server/config/db')
db.openUri(URL_DB)

// Inicializating express server
const app = require('./server/app')

// Starting express server
app.listen(port)
console.log(`Listening on PORT ${port}...`)
