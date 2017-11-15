const Articles = require('../../../models/Article')
const getUserData = require('./getUserData')

function getArticle (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  Articles.find({_id: id})
    .then(article => res.render('article', {userData, article: article[0]}))
}

module.exports = getArticle
