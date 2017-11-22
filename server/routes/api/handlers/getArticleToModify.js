const Article = require('../../../models/Article')

function getArticleToModify (req, res) {
  const {id} = req.params
  Article.findById(id)
  .then(article => res.status(200).json(article),
      response => { res.status(400).json({ msg: `Error finding article with id ${id}` }) }
      )
}

module.exports = getArticleToModify
