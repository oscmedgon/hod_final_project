const express = require('express')
const registerUser = require('./handlers/registerUser')
const router = express.Router()
const passport = require('../../config/passport')

router.post('/api_register', registerUser)

module.exports = router
