const express = require('express')
const userModifyAvatar = require('./handlers/userModifyAvatar')
const userModifyData = require('./handlers/userModifyData')

const router = express.Router()

router.post('/user/:id/modify/avatar', userModifyAvatar)
router.post('/user/:id/modify/data', userModifyData)

module.exports = router
