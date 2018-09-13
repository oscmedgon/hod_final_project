const Coment = require('../../../models/Coment')
const User = require('../../../models/User')


function getComentsForArticle (req, res) {
    const {id} = req.params
    console.log(`FETCHING COMENTS FOR THE ARTICLE ${id}`)
    Coment.find({article: id})
    .then((coments) => User.populate(coments, {path: 'author'}, (error, response) => {
        if (error) {
            res.status(404).json({
                error,
                msg: 'Error en la solicitud, no se han podido encontrar comentarios para el artículo especificado'
            })
        } else {
            console.log(response)
            res.status(200).json({
                data: [
                    ...response
                ],
                msg: 'Éxito buscando el artículo solicitado'
            })
        }
    }))
}

module.exports = getComentsForArticle
