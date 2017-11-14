const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  let userData
  if (req.user && req.user.username) {
    userData = req.user
  } else {
    userData = null
  }
  res.render('index', userData)
}
)
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
