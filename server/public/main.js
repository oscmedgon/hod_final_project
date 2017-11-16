$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
})
console.log('Welcome to harbingers of Devastation')
$('.register-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value,
    password: e.target[1].value,
    email: e.target[2].value
  }
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

  $('.imageUpload').on('submit', function (e) {
    e.preventDefault()
    const id = $(this).data('id')
    const data = {
      avatar: e.target[0].value
    }
    const url = `/user/${id}/modify/avatar`
    const method = 'POST'
    $.ajax({ url, method, data })
      .then(response => {
        toastr['success'](response.msg)
        window.location.reload()
      }, response => {
        toastr['error']('Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde.')
      })
    })

    $('.userDataModify').on('submit', function (e) {
      e.preventDefault()
      const id = $(this).data('id')
      const data = {
        name: e.target[0].value,
        description: e.target[1].value,
        website: e.target[2].value
      }
      const url = `/user/${id}/modify/data`
      const method = 'POST'
      $.ajax({ url, method, data })
        .then(response => {
          toastr['success'](response.msg)
          window.location.reload()
        }, response => {
          toastr['error']('Ha habido un problema al actualizar su información, es posible que el usuario ya esté en uso..')
        })
      })
