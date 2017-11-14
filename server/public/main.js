$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow');
})
console.log('Welcome to harbingers of Devastation')
$('.register-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value,
    password: e.target[1].value,
    email: e.target[2].value
  }
  console.log(data)
  const url = '/api_register'
  const method = 'POST'
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      window.location.reload()
    }, response => {
      toastr['error']('Error al crear el usuario, es posible que el usuario ya exista.')
    })
})

$('.login-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value,
    password: e.target[1].value
  }
  console.log(data)
  const url = '/api_login'
  const method = 'POST'
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      window.location.pathname = '/'
    }, response => {
      toastr['error']('El usuario o la contraseña son incorrectos.')
    })
  })
