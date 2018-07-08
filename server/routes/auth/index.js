const express = require('express');
const router = express.Router();
// const capchaCheck = require('./handlers/capchaCheck')

const userLogin = require('./handlers/userLogin');
const adminLogin = require('./handlers/adminLogin');
const registerUser = require('./handlers/registerUser');
const adminCheck = require('./handlers/adminCheck');
const userData = require('./handlers/userData')

router.post('/auth/login', userLogin);
router.post('/auth/register', registerUser);
router.get('/auth/active_user', userData)

router.post('/api/admin/login', adminLogin);
router.post('/api/admin/check', adminCheck);

module.exports = router;
