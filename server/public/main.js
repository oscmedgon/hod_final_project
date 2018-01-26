
if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.host !== 'qa.harbingersofdevastation.com') window.location.protocol = 'https:'

$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
})
console.log('Welcome to harbingers of Devastation')
$('.register-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value.toLowerCase(),
    password: e.target[1].value,
    email: e.target[2].value
  }
  const url = '/api_register'
  const method = 'POST'
  const {username, password} = data
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      const data = {
        username: username,
        password: password
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
    }, response => {
      toastr['error']('Error al crear el usuario, es posible que el usuario ya exista.')
    })
})

$('.login-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value.toLowerCase(),
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

  $('.input-file').on('change', function (e) {
    e.preventDefault()
    const id = $(this).parent().data('id')
    let data = new FormData()
    let file = e.target.files[0]
    // add the files to formData object for the data payload
    data.append('file', file)
    const url = `/user/${id}/modify/avatar`
    axios.post(url, data)
      .then(response => {
        toastr['success']('Avatar modificado correctamente')
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
  $('#file').change(function () {
    var filepath = this.value
    var m = filepath.match(/([^\/\\]+)$/)
    var filename = m[1]
    $('#file-upload-label').text('Subiendo... ' + filename)
  })

$('.link-discord').on('click', e => {
  const data = {
    token: e.target.id
  }
  const url = '/api/discord/link'
  const method = 'POST'
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      $('#root').text(response.msg)
    }, response => {
      toastr['error'](response.msg)
      $('#root').text(response.msg)
    })
})
