const Article = require('../../../models/Article')
const User = require('../../../models/User')
const moment = require('moment')

function articleDashboard (req, res) {
  Article.find()
  .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
    if (err) res.redirect('/')
    const json = {}
    json.recentArticles = articles.filter(article => {
      let timeSinzePublishing = moment(article.date_of_creation).fromNow().split(' ')
      if (timeSinzePublishing.includes('seconds') || timeSinzePublishing.includes('minutes') || timeSinzePublishing.includes('hour') || timeSinzePublishing.includes('hours')) {
        return true
      } else if (timeSinzePublishing.includes('day')) {
        if (timeSinzePublishing[0] === 'a') {
          return true
        }
      } else if (timeSinzePublishing.includes('days')) {
        return (parseInt(timeSinzePublishing[0]) <= 7)
      } else {
        return false
      }
    }).length
    json.totalArticles = articles.length
    json.totalArticlesFeatured = (articles.filter(article => article.featured === true)).length
    json.articleList = articles
    res.status(200).json(json)
  })
  )
}

module.exports = articleDashboard
