const User = require('../../../models/User');
const moment = require('moment');
const mailActivation = require('./mailActivation');

function registerUser (req, res) {
  const { username, password, email } = req.body;
  const name = username;
  const active = false;
  const discord = {
    id: null,
    username: null,
    status: false
  };
  const avatar = 'https://res.cloudinary.com/dm303fk5u/image/upload/v1511966508/silueta_fondo_transparente-min_yjgaol.png';
  const description = '';
  const user_type = 0;
  const date_of_creation = moment().format('DD-MM-YYYY, HH:mm:ss');
  const website = null;
  const account = new User({username, name, email, active, discord, description, avatar, user_type, date_of_creation, website});

  User.register(account, password, err => {
    if (err) res.status(400).json({msg: 'Error creating user'});
    else mailActivation(req, res, account);
  });
}

module.exports = registerUser;
