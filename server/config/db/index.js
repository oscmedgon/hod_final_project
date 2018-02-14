const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('connected', function () {
  console.log('Connected to DB...')
})
db.on('error', err => console.log(`Mongoose default connection error: ${err}`))
db.on('disconnected', () => console.log('Mongoose default connection disconnected'))

// // -------------------------DB UPDATE TO NEW FEATURES USE IN COMMAND LINE
// db.users.update(
//   {},
//   {
//     $set:
//     {active: false}
//   },
//    {multi: true})
//    // ------------------------END OF UPDATE

module.exports = db
