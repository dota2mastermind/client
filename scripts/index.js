

function registerForm() {
    $("#navbar").hide()
    $("#register").show()
    $("#login").hide()
    $("#carousel").hide()
}

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
        .catch(({ response }) => {
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
    $("#carousel").hide()
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
        $("#carousel").hide()
    } else {
        $("#navbar").hide()
        $("#register").hide()
        $("#login").hide()
        $("#carousel").show()
    }
}
function search() {
    event.preventDefault()
    let dataFilter = teamsData.filter(team => team.name == $("#searchInput").val())
    dataFilter.forEach(function (team) {
        $("#content").html(
            `
          <div class="col-md-4">
              <div class="card" style="width: 18rem;">
                  <center><img src="${team.logo_url}" style="height:200px;width:200px" class="card-img-top" alt="${team.name}"><center>
                  <div class="card-body">
                      <h5 class="card-title">${team.name}</h5>
                      <p class="card-text">
                        Rating: ${team.rating},<br>
                        Wins: ${team.wins},<br>
                        Loses: ${team.losses}
                      </p>
                      <a href="#" onclick="getTeamDetail(${team.team_id})" class="btn btn-primary">Details</a>
                  </div>
              </div>
          </div>
          `
        )
    })
}
function videoList(param) {
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/youtube/q?${param}+dota2`,
    })
        .done(({ items }) => {
            let component = ''
            items.forEach((item, i) => {
                if (item.id.videoId && i <= 3) {
                    component += `<div class="col-md-3">
                    <div class="card" style="width: 17rem;">
                        <div class="card-body">
                                <iframe id="existing-iframe-example"
                width="220" height="250"
                src="https://www.youtube.com/embed/${item.id.videoId}?enablejsapi=1"
                frameborder="0"
                style="border: solid 4px #37474F"></iframe>
                        </div>
                        <p>${item.snippet.title}</p>
                    </div>
                </div>`
                }
                $("#related").show()
                $("#videos").html(component)
            })
        })
        .fail(err => {
            console.log(err)
        })
}
function renderTeam() {
    getTeams()
    $("#home").show()
    event.preventDefault()
    let component = ''
    teamsData.forEach(function (team) {
        component += `
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <center><img src="${team.logo_url}" style="height:200px;width:200px" class="card-img-top" alt="${team.name}"><center>
                <div class="card-body">
                    <h5 class="card-title">${team.name}</h5>
                    <p class="card-text">
                      Rating: ${team.rating},<br>
                      Wins: ${team.wins},<br>
                      Loses: ${team.losses}
                    </p>
                    <a href="#" onclick="getTeamDetail(${team.team_id})" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `
    })
    $("#content").html(component)
}
function renderPlayer() {
    getPlayers()
    $("#home").show()
    event.preventDefault()
    let component = ``
    playersData.forEach(function (team) {
        component += `

        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <center><img src="${team.logo_url}" style="height:200px;width:200px" class="card-img-top" alt="${team.name}"><center>
                <div class="card-body">
                    <h5 class="card-title">${team.name}</h5>
                    <p class="card-text">
                      Rating: ${team.rating},<br>
                      Wins: ${team.wins},<br>
                      Loses: ${team.losses}
                    </p>
                    <a href="#" onclick="getTeamDetail(${team.team_id})" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `
    })
    $("#content").html(component)
}
$("document").ready(() => {
    cekLogin()
    $("#register").hide()
    $("#login").hide()
    $("#related").hide()
})

