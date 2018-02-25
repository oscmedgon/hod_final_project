const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const jwt = require('jsonwebtoken');
const { SECRET, API_BASE } = process.env;

function mailActivation (req, res, account) {
  const userAcount = account || req.user;
  const {username, email, _id} = userAcount;
  const token = jwt.sign({username, email, _id}, SECRET);
  const request = mailjet
  .post('send')
  .request({
    'FromEmail': 'postmaster@harbingersofdevastation.com',
    'FromName': 'Harbingers of devastation',
    'Subject': 'Tu cuenta se ha creado con éxito',
    'MJ-TemplateID': '312709',
    'MJ-TemplateLanguage': 'true',
    'Vars': {
      'ACTIVATION-LINK': `${API_BASE}/activate/${token}`,
      'USERNAME': username
    },
    'Recipients': [
      {
        'Email': email
      }
    ]
  });
  request
  .then(result => {
    res.status(200).json({ msg: `Se ha enviado un correo de activación al siguiente email ${userAcount.email}` });
  })
  .catch(err => {
    console.log(err.statusCode);
  });
}

module.exports = mailActivation;
