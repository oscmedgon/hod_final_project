const Article = require('../../../models/Article')

function modifyArticle (req, res) {
  const {id} = req.params

  const data = req.body

  Article.findByIdAndUpdate(id, data)
  .then(response => { res.status(200).json({msg: `Article ${id} succesfuly modified`}) },
        response => { res.status(400).json({msg: `An error ocurred, article ${id} not modified`}) }

)
}

module.exports = modifyArticle
