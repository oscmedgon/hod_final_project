const SessionStrategy = require('passport-session')
const User = require('../../../models/User')

const sessionStrategy = new SessionStrategy(
  function (username, password, sessionId, done) {
    User.findOne({ username: username, sessionId: sessionId }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    })
  }
)

module.exports = sessionStrategy
