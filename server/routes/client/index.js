const express = require('express')
const getFeturedArticles = require('./handlers/getFeturedArticles')
const getCategoryArticles = require('./handlers/getCategoryArticles')
const getArticle = require('./handlers/getArticle')
const getUserProfile = require('./handlers/getUserProfile')
const getModifyForm = require('./handlers/getModifyForm')
const getAdministration = require('./handlers/getAdministration')

const router = express.Router()

router.get('/', getFeturedArticles)
router.get('/articles/:category', getCategoryArticles)
router.get('/article/:id', getArticle)
router.get('/user/:id', getUserProfile)
router.get('/user/:id/modify', getModifyForm)
router.get('/administration*$', getAdministration)
router.get('/administration/*$', getAdministration)
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/')
  } else {
    res.render('login', {title: 'Iniciar sesión'})
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router
