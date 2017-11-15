const Articles = require('../../../models/Article')
const getUserData = require('./getUserData')

function getCategoryArticles (req, res) {
  const userData = getUserData(req.user)
  const {category} = req.params
  Articles.find({category: category})
    .limit(5)
    .then(articles => res.render('index', {sectionTitle: category, userData, featuredArticle: articles[0], articles: articles.slice(1)}))
}

module.exports = getCategoryArticles
