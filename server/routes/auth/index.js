const express = require('express');
const router = express.Router();
// const capchaCheck = require('./handlers/capchaCheck')

const userLogin = require('./handlers/userLogin');
const adminLogin = require('./handlers/adminLogin');
const registerUser = require('./handlers/registerUser');
const adminCheck = require('./handlers/adminCheck');

router.post('/api_register', registerUser);
router.post('/api_login', userLogin);
router.post('/api/admin/login', adminLogin);
router.post('/api/admin/check', adminCheck);

module.exports = router;
