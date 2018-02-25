function userLogin (req, res) {
  if (req.user) {
    res.status(200).json({msg: 'Login success'});
  } else {
    res.status(400).json({msg: 'Login failed'});
  }
}

module.exports = userLogin;
