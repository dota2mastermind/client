const url = 'http://localhost:3000/dota'
var teamsData = []
var playersData = []

function getTeams() {
  axios.get(`${url}/teams`)
    .then(function (response) {
      teamsData = response.data
      $("#content").html("")
      response.data.forEach(function (team) {
        $("#content").append(
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
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function getPlayers() {
  axios.get(`${url}/players`)
    .then(function (response) {
      playersData = response.data
      $("#content").html("")
      response.data.forEach(function (player) {
        $("#content").append(
          `
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <center><img src="${player.avatarfull}" style="height:200px;width:200px" class="card-img-top" alt="${player.personaname}"><center>
                <div class="card-body">
                    <h5 class="card-title">${player.personaname}</h5>
                    <p class="card-text">Country Code: ${player.loccountrycode}, <br>Last match: ${player.last_match_time}, <br>Team: ${player.team_name}.</p>
                    <a href="#" onclick="getPlayerDetail(${player.account_id})" class="btn btn-primary">Get Detail Player</a>
                </div>
            </div>
        </div>
        `
        )
      })
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function getTeamDetail(teamId) {
  axios.get(`${url}/teams/${teamId}`)
    .then(function (response) {
      const team = response.data
      videoList(`team=${team.name}`)
      $("#home").hide()
      $("#detail").html("")
      $("#detail").append(
        `
      <hr>
      <h5>${team.name}</h5>
      <hr>
      <div class="row" id="teamdetail">
      <div class="col-md-4">
          <div class="card" style="width: 18rem;">
              <div class="card" style="width: 18rem;">
                  <center><img src="${team.logo_url}" style="height:200px;width:200px" class="card-img-top" alt="${team.name}"></center>
                  <div class="card-body">
                      <h5 class="card-title">${team.name}</h5>
                      <p class="card-text">
                        Rating: ${team.rating},<br>
                        Wins: ${team.wins},<br>
                        Loses: ${team.losses}
                      </p>
                  </div>
              </div>
          </div>
      </div>
      <div>
      `
      )
    })
    .catch(function (error) {
      console.log(error.message);
    });

  axios.get(`${url}/teams/${teamId}/players`)
    .then(function (response) {
      const players = response.data
      players.forEach(function (player) {
        if (player.is_current_team_member) {

          axios.get(`${url}/players/${player.account_id}`)
            .then(function (playerDetail) {
              console.log(playerDetail);
              const playerData = playerDetail.data
              $("#teamdetail").append(
                `
                <div class="col-md-4">
                  <div class="card" style="width: 16rem;">
                    <div class="card-body">
                      <h5 class="card-title">${playerData.profile.name}</h5>
                      <img src="${playerData.profile.avatarfull}" style="height:200px;width:200px" class="card-img-top" alt="${playerData.profile.name}">
                        <p class="card-text">
                          Is current team member
                        </p>
                        <a href="#" onclick="getPlayerDetail(${playerData.profile.account_id})" class="btn btn-primary">Player Details</a>
                      </div>
                    </div>
                </div>
                `
              )
            })
            .catch(function (error) {
              console.log(error.message);
            })
        }
      })
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function getPlayerDetail(account_id) {
  axios.get(`${url}/players/${account_id}`)
    .then(function (response) {
      const player = response.data
      videoList(`player=${player.profile.name}`)
      $("#home").hide()
      $("#detail").html("")
      $("#detail").append(
        `
        <hr>
        <h5>${player.profile.name}</h5>
        <hr>
        <div class="row" id="teamdetail">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                    <center><img src="${player.profile.avatarfull}" style="height:200px;width:200px" class="card-img-top" alt="${player.profile.name}"></center>
                    <div class="card-body">
                        <h5 class="card-title">${player.profile.name}</h5>
                        <p class="card-text">
                          Estimated MMR: ${player.mmr_estimate.estimate},<br>
                          Cheese: ${player.profile.cheese},<br>
                          <a href="${player.profile.profileurl}" class="btn btn-primary">Steam Profile</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div>
        
        `
      )
    })
    .catch(function (error) {
      console.log(error.message);
    })
}

function getHeroes() {
  axios.get('http://localhost:3000/heroes')
    .then((result) => {
      console.log(result);
      $("#content").html('')
      result.data.forEach(hero => {
        $("#content").append(
          `
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <center><img src="${hero.img}" style="height:200px;width:200px" class="card-img-top"><center>
                <div class="card-body">
                    <h5 class="card-title">${hero.name}</h5>
                    <p class="card-text">
                    <p>primaryattribut:${hero.primary_attr}</p>
                    <p>attack_type:${hero.attack_type}</p>
                    </p>
                </div>
            </div>
        </div>
        `
        )

      })


    }).catch((err) => {

    });

}