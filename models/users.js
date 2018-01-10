const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'users'

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  description: String,
  state: String,
  avatar: String,
  discord: {
    id: String,
    username: String,
    status: Boolean
  },
  date_of_creation: String,
  website: String,
  user_type: Number,
  articles: []
}, { collection })

module.exports = mongoose.model('User', UserSchema)

// Update database with new changes template
// db.<-collection->.update(
//   {},
//   {
//     $set:
//     {NEW INFO TO DATABASE}
//   },
//    {multi: true})
