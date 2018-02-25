const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
// const capchaCheck = require('./handlers/capchaCheck')

const userLogin = require('./handlers/userLogin');
const adminLogin = require('./handlers/adminLogin');
const registerUser = require('./handlers/registerUser');
const mailActivation = require('./handlers/mailActivation');

router.post('/api_register', registerUser);
router.post('/api_login', passport.authenticate('local'), userLogin);
router.post('/api/admin/login', passport.authenticate('local'), adminLogin);
router.post('/api/test/mail', mailActivation);

module.exports = router
