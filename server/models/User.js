const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'users'
const passportLocalMongoose = require('passport-local-mongoose')
const Article = require('./Article')

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
  articles: [{ type: Schema.ObjectId, ref: 'Article' }]
}, { collection })

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)