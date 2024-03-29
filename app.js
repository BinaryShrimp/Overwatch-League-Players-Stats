function printAllPlayer(data) {
    let cardContainer = document.querySelector('.all-player-container');
    cardContainer.innerHTML = '';
    data.map(item => {
        cardContainer.innerHTML += `
        <div class="player-card">
            <div class="team-logo">
                <img src="${item.teams[0].team.logo}" alt="" width="30px" style="margin: 5px;">
            </div>
            <img src="${item.headshot}" alt="" width="200px">
            <h4 class="player-name">${item.name}</h4>
            <h4 class="player-name">${item.teams[0].team.name}</h4>
            <a target='_blank' href="${`https://overwatchleague.com/en-us/players/${item.id}`}"><button class="stats-button">More Stats</button></a>
        </div>
        `
    });
}

async function showAllPlayers() {
    let showplayersAPI = 'https://api.overwatchleague.com/players';
    let request = await fetch(showplayersAPI);
    let data = await request.json();
    printAllPlayer(data.content);
}

function writePlayerNotFound() {
    document.querySelector('.player-titles').innerHTML = '';
    document.querySelector('.player-teams').innerHTML = '';
    return `
    <h4 style="padding: 20px">Player not found. Please check spelling</h4>
    `
}

function writePlayerTeam(playerData) {
    return `
    <img src="${playerData.data.player.teams[0].team.logo}" alt="picture of team" width="100px;" style="padding: 10px">
    <img src="./img/owl logo.png" alt="" width="100px" style="padding: 10px">
    `
}

function writePlayerTitle(playerData) {
    return `
    <h2>${playerData.data.player.name}</h2>
    <h3>${playerData.data.player.teams[0].team.name}</h3>
    `
}

function writePlayerCard(playerStats, playerData) {
    return `
        <img src="${playerData.data.player.headshot}" alt="Image of player" width="200px;">
        <h4 class="player-name">${playerData.data.player.name}</h4>
        <p class="statsP">Eliminations: ${Math.round(playerStats.eliminations_avg_per_10m)} (per 10min)</p>
        <p class="statsP">Final Blows: ${Math.round(playerStats.final_blows_avg_per_10m)} (per 10min)</p>
        <p class="statsP">Deaths: ${Math.round(playerStats.deaths_avg_per_10m)} (per 10min)</p>
        <a target='_blank' href="${`https://overwatchleague.com/en-us/players/${playerStats.playerId}`}"><button class="stats-button">More Stats</button></a>
    `
}

function getPlayerData(playerId, playerStats) {
    let playerApi = 'https://api.overwatchleague.com/players/'+ playerId;
    fetch(playerApi)
    .then(response => response.json())
    .then(responseData => {
        document.querySelector('.player-card').innerHTML = writePlayerCard(playerStats, responseData);
        document.querySelector('.player-titles').innerHTML = writePlayerTitle(responseData);
        document.querySelector('.player-teams').innerHTML = writePlayerTeam(responseData);
    })

}

function getPlayerId(playerData, playerName) {
    for(let i = 0; i < playerData.data.length; i++) {
        if(playerName.toLowerCase() == playerData.data[i].name.toLowerCase()) {
            let playerId = playerData.data[i].playerId;
            let playerStats = playerData.data[i];
            getPlayerData(playerId, playerStats);
            break;
        }
        else if(i == (playerData.data.length - 1)) {
            document.querySelector('.player-card').innerHTML = writePlayerNotFound();
        }
    }
}

function fetchData(playerName) {
    let playerIdApi = 'https://api.overwatchleague.com/stats/players';
    fetch(playerIdApi)
    .then(response => response.json())
    .then(responseData => {
        getPlayerId(responseData, playerName);
    })
}

// function to get searched player name
function watchForm() {
    document.querySelector('.search-button').addEventListener('click', function(){
        let searchField = document.querySelector('.search-box').value;
        document.querySelector('.search-box').value = '';
        console.log(searchField);
        fetchData(searchField);
    });
}


watchForm();
showAllPlayers();