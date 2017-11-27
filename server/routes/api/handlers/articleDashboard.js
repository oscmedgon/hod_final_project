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
      console.log(timeSinzePublishing)
      if (timeSinzePublishing.includes('seconds') || timeSinzePublishing.includes('minutes') || timeSinzePublishing.includes('hour') || timeSinzePublishing.includes('hours')) {
        console.log('la cosa va de minutos, segundos y demás')
        return true
      } else if (timeSinzePublishing.includes('day')) {
        console.log('La cosa va de un día')
        if (timeSinzePublishing[0] === 'a') {
          return true
        }
      } else if (timeSinzePublishing.includes('days')) {
        console.log('La cosa va de varios día')
        return (parseInt(timeSinzePublishing[0]) <= 7)
      } else {
        return false
      }
    }).length
    json.totalArticles = articles.length
    json.totalArticlesFeatured = (articles.filter(article => article.featured === true)).length
    json.articleList = articles
    console.log(json.recentArticles)
    res.status(200).json(json)
  })
  )
}

module.exports = articleDashboard
