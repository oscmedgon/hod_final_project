const Article = require('../../../models/Article')
const Coment = require('../../../models/Coment')
const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getArticle (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  Article.find({_id: id})
    .then(article => User.populate(article, {path: 'author'}, function (err, article) {
      if (err) res.redirect('/')
      Coment.find({article: id})
      .then(coments => User.populate(coments, {path: 'author'}, function (err, coments) {
        if (err) res.redirect('/')
        console.log(coments)
        res.render('article', {userData, coments: coments, article: article[0]})
      }))
    }))
}

module.exports = getArticle
