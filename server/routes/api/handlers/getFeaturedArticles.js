const Article = require('../../../models/Article')

function getFeaturedArticles (req, res) {
  Article.find({featured: true}, {limit: 5, sort: {date_of_creation: -1}})
  .then(articles => res.status(200).json(articles))
}

module.exports = getFeaturedArticles
