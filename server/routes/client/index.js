const express = require('express')
const getFeturedArticles = require('./handlers/getFeturedArticles')
const getCategoryArticles = require('./handlers/getCategoryArticles')
const getArticle = require('./handlers/getArticle')

const router = express.Router()

router.get('/', getFeturedArticles)
router.get('/articles/:category', getCategoryArticles)
router.get('/article/:id', getArticle)

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/')
  } else {
    res.render('login')
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router
