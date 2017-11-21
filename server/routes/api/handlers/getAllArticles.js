const Article = require('../../../models/Article')

function getAllArticles (req, res) {
  Article.find()
  .select()
  .then(articles => res.status(200).json(articles))
}

module.exports = getAllArticles
