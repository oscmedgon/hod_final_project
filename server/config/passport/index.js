const passport = require('passport')

const User = require('../../models/User')
// const sessionStrategy = require('./strategies/session')
passport.serializeUser(function (user, done) {
  console.log('serializing user: ')
  console.log(user)
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log('no im not serial')
    done(err, user)
  })
})
passport.use(User.createStrategy())
// passport.use(sessionStrategy)

module.exports = passport
