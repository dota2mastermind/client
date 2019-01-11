function registerProcess() {
  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: {
          name: $("#register_name").val(),
          email: $("#register_email").val(),
          password: $("#register_password").val()
      }
  })
      .then((response) => {
          localStorage.setItem('access_token', response.token)
          $("#register_name").val('')
          $("#register_email").val('')
          $("#register_password").val('')
      })
      .catch((response) => {
          console.log(response)
      })
}
function loginProcess() {
  $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
          email: $("#login_email").val(),
          password: $("#login_password").val()
      }
  })
      .then((response) => {
          localStorage.setItem('access_token', response.token)
          $("#login_email").val('')
          $("#login_password").val('')
      })
      .catch(({response}) => {
          console.log(response)
      })
}
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/users/google',
          data: {
          id_token
      }
  })
      .done(response => {
          localStorage.setItem('access_token', response.token)
          cekLogin()
          console.log(response)
      })
      .fail(response => {
          console.error(response)
      })
}
function loginForm() {
  $("#navbar").hide()
  $("#register").hide()
  $("#login").show()
}
function logout() {
  localStorage.removeItem('access_token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  cekLogin()
}
function cekLogin() {
  let status = localStorage.getItem('access_token') ? true : false
  if (status) {
      $("#navbar").show()
      $("#register").hide()
      $("#login").hide()
  } else {
      $("#navbar").hide()
      $("#register").show()
      $("#login").hide()
  }
}
$("document").ready(() => {
  cekLogin()
})