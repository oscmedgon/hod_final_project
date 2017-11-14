const request = require('request')

function capchaCheck (req, res, next) {
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  console.log(`Request------------------------`)
  console.log(req)
  console.log(`BOdy------------------------`)
  console.log(req.body)
  if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.status(400).json({'responseCode': 1, 'responseDesc': 'Completa el capcha para continuar'})
  }
  // Put your secret key here.
  var secretKey = '6LcHsDgUAAAAAI0AjPT70KWK9YQfK3noJT6zZMsS'
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + req.body['g-recaptcha-response'] + '&remoteip=' + req.connection.remoteAddress
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body)
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      return res.status(400).json({'responseCode': 1, 'responseDesc': 'Error al verificar el capcha'})
    }
    next()
  })
}

module.exports = capchaCheck
