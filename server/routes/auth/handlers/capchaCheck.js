const ReCAPTCHA = require('recaptcha2')

const recaptcha = new ReCAPTCHA({
  siteKey: '6LcHsDgUAAAAAH_3Q9ADAGGPrpgTIhQ0DXmw6tGd',
  secretKey: process.env.G_SECRET
})

function capchaCheck (req, res, next) {
  recaptcha.validateRequest(req)
.then(function () {
  // validated and secure
  next()
})
.catch(function (errorCodes) {
  // invalid
  res.status(400).send('Completa el capcha para contunuar')
})
}
module.exports = capchaCheck
