const Coment = require('../../../models/Coment')
const moment = require('moment')

function newComent (req, res) {
  const { title, article } = req.body
  const body = req.body.body.split('\n').join('<br />')
  console.log(body)
  const date_of_creation = Date.now()
  const date_pretty = moment().format('DD-MM-YYYY, HH:mm:ss')
  const author = req.user._id
  const coment = new Coment({author, article, likes: 0, dislikes: 0, title, body, date_of_creation, date_pretty})
  coment.save(coment, err => {
    if (err) res.status(400).json({msg: 'Error creating coment'})
    else res.status(200).json({msg: 'Coment succesfully created!'})
  })
}

module.exports = newComent
