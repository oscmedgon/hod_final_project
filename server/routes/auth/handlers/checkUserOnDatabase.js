const User = require('../../../models/User');

function checkUserOnDatabase (email) {
  return User.find({email: email})
    .then(response => {
      if (response.length === 1) {
        return response[0];
      }
    });
}

module.exports = checkUserOnDatabase;
