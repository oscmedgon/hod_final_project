const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  let username
  console.log(req.user)
  if (req.user && req.user.username) {
    username = req.user.username
  } else {
    username = null
  }
  res.render('index', {username})
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
