const Article = require('../../../models/Article')

function getArticlesByCategory (req, res) {
  const category = req.params.category
  Article.find({category: category})
  .sort({date_of_creation: -1})
  .then(articles => res.status(200).json(articles))
}

module.exports = getArticlesByCategory
