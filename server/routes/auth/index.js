const express = require('express')
const userLogin = require('./handlers/userLogin')
const registerUser = require('./handlers/registerUser')
const router = express.Router()
const passport = require('../../config/passport')
// const capchaCheck = require('./handlers/capchaCheck')

router.post('/api_register', registerUser)
router.post('/api_login', passport.authenticate('local'), userLogin)

module.exports = router
