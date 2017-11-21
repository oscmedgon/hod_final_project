const Article = require('../../../models/Article')
const User = require('../../../models/User')

function articleDashboard (req, res) {
  Article.find()
  .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
    if (err) res.redirect('/')
    const json = {}
    json.totalArticles = articles.length
    json.totalArticlesFeatured = (articles.filter(article => article.featured === true)).length
    json.articleList = articles
    res.status(200).json(json)
  })
  )
}

module.exports = articleDashboard
