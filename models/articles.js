const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Users = mongoose.model('User')
const collection = 'articles'

const ArticleSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'Users' },
  image: String,
  title: String,
  body: String,
  featured: Boolean,
  date_of_creation: String

}, { collection })

module.exports = mongoose.model('Article', ArticleSchema)
