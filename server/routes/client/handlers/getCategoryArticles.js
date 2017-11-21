const Articles = require('../../../models/Article')
const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getCategoryArticles (req, res) {
  const userData = getUserData(req.user)
  const {category} = req.params
  Articles.find({category: category})
  .sort({date_of_creation: -1})
  .limit(5)
  .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
    if (err) res.redirect('/')
    res.render('index', {sectionTitle: articles[0].category, userData, featuredArticle: articles[0], articles: articles.slice(1)})
  })
  )
}

module.exports = getCategoryArticles
