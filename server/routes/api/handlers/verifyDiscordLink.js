const Article = require('../../../models/Article')

function removeArticle (req, res) {
  const { id } = req.params

  Article.findByIdAndRemove(id)
  .then(res.status(200).json({msg: 'Article succesfully created!'}),
        res.status(400).json({msg: 'Error creating article'})
      )
}

module.exports = removeArticle
