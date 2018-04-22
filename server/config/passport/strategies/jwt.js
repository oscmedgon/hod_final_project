const User = require('../../../models/User')

const secretOrKey = process.env.SECRET
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

const options = { jwtFromRequest, secretOrKey }
