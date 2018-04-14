const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collection = 'users';
const Article = require('./Article');

const UserSchema = new Schema({
  firebase_id: String,
  username: String,
  name: String,
  email: { type: String, unique: true, dropDups: true },
  active: Boolean,
  discord: {
    username: String,
    status: Boolean,
    id: String
  },
  password: String,
  description: String,
  state: String,
  avatar: String,
  date_of_creation: String,
  website: String,
  user_type: Number,
  articles: [{ type: Schema.ObjectId, ref: 'Article' }]
}, { collection });

module.exports = mongoose.model('User', UserSchema);
