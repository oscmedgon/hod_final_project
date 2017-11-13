const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Articles = mongoose.model('Article')
const collection = 'users'

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  description: String,
  state: String,
  avatar: String,
  date_of_creation: String,
  website: String,
  user_type: Number,
  articles: [{ type: Schema.ObjectId, ref: 'Articles' }]
}, { collection })

module.exports = mongoose.model('User', UserSchema)
