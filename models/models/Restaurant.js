const mongoose = require('mongoose')
const Schema = mongoose.Schema
const collection = 'restaurants'

const RestaurantSchema = new Schema({
    name: String,
    borough: String,
    cuisine: String,
    address: {
      building : String,
      street : String,
      zipcode : String,
      coord : [Number],
    },
    grades: [{
      date: Date,
      grade: String,
      score: Number
    }],
}, { collection })

module.exports = mongoose.model('Restaurant', RestaurantSchema)