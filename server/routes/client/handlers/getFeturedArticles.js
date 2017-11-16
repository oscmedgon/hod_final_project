const Articles = require('../../../models/Article')
const getUserData = require('./getUserData')
function getFeturedArticles (req, res) {
  const userData = getUserData(req.user)
  Articles.find({featured: true})
    .limit(5)
    .then(articles => res.render('index', {sectionTitle: 'destacados', userData, featuredArticle: articles[0], articles: articles.slice(1)}))
}

module.exports = getFeturedArticles
