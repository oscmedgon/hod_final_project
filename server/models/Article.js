const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const collection = 'articles'

const ArticleSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'User' },
  image: String,
  title: String,
  body: String,
  featured: Boolean,
  date_of_creation: String

}, { collection })

module.exports = mongoose.model('Article', ArticleSchema)
