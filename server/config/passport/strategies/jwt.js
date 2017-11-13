const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../../../models/User')

const { SECRET: secretOrKey } = process.env
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const options = { jwtFromRequest, secretOrKey }

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  User.findById(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

module.exports = jwtStrategy
