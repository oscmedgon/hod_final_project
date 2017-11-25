const Articles = require('../../../models/Article')
const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getCategoryArticles (req, res) {
  const limit = 5
  const page = parseInt(req.query.page) || 1
  const skip = (page * limit) - limit
  const userData = getUserData(req.user)
  const {category} = req.params
  Articles.find({category: category})
  .sort({date_of_creation: -1})
  .limit(5)
  .skip(skip)
  .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
    articles.map(article => {
      article.body = article.body.split('<p>&nbsp;</p>')[0]
      return article
    })
    if (err) res.redirect('/')
    res.render('index', {baseUrl: `/articles/${category}?page=`, page: page, sectionTitle: articles[0].category, userData, featuredArticle: articles[0], articles: articles.slice(1)})
  })
  )
}

module.exports = getCategoryArticles
