const Coment = require('../../../models/Coment');
const moment = require('moment');

function newComent (req, res) {
    console.log(req.user)
    const { title, article } = req.body;
    const body = req.body.body.split('\n').join('<br />');
    const date_of_creation = Date.now();
    const date_pretty = moment().format('DD-MM-YYYY, HH:mm:ss');
    const author = req.user._id;
    const coment = new Coment({author, article, likes: 0, dislikes: 0, title, body, date_of_creation, date_pretty});
    coment.save(coment)
    .then((response) => {
        res.status(200).json({
            data: response,
            msg: 'Comentario publicado correctamente'
        })
    })
    .catch((err) => {
        res.status(400).json({msg: 'Error al publicar el comentario',error: err});
    })
}

module.exports = newComent;
