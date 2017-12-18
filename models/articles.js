const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'users'

const ArticleSchema = new Schema({
  author: String,
  image: String,
  title: String,
  body: String,
  featured: Boolean,
  date_of_creation: String

}, { collection })

module.exports = mongoose.model('User', ArticleSchema)
