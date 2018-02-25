const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'coments'
const Article = require('./Article')
const User = require('./User')

const ArticleSchema = new Schema({
  author: {type: Schema.ObjectId, ref: 'User'},
  article: {type: Schema.ObjectId, ref: 'Article'},
  title: String,
  body: String,
  likes: Number,
  dislikes: Number,
  date_of_creation: String,
  date_pretty: String

}, { collection })

module.exports = mongoose.model('Coment', ArticleSchema)
