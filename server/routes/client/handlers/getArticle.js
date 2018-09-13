const Article = require('../../../models/Article')
const User = require('../../../models/User')


function getArticle (req, res) {
    const userData = req.user
    const {id} = req.params
    Article.find({_id: id})
    .then(article => User.populate(article, {path: 'author'}, function (err, article) {
        console.log(`FETCH ARTICLE BY ID ${id} OK` )
        console.log(article)
        res.status(200).json({
            data: {
                ...article[0]._doc
            },
            msg: 'Éxito buscando el artículo solicitado'
        })
    }))
    .catch((error) => {
        res.status(404).json({
            error,
            msg: 'Error en la solicitud, el artículo que buscas no existe'
        })
    })
}

module.exports = getArticle
