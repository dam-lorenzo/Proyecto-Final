import { checkUpdates, parsePlayer} from "./main.js"
import {_keys, isIn} from "./handle.js"
import {testing_players} from "./testing.js"

$(document).ready(function(){
    // testing_players() // descomentar, cargar la pagina, y volver a comentar para que no se pisen los datos del LS
    checkUpdates();
    refreshPoints()
    loadPositions()
    $('#refreshButton').click(function(){
        refreshPoints()
        loadPositions()
    })
    $('#refreshAPI').click(function(){
        checkUpdates(true)
        location.reload()
    })
})

function loadPositions(){
    /**
     * Genera la tabla de posiciones con todos los jugadores disponibles
     */
    const allPlayers = loadPlayers()
    $('#tableBody').empty()
    const pointsList = []
    for (const player of allPlayers) {
        if (!(isIn(pointsList, player.points))){
            pointsList.push(player.points)
        }
    }
    pointsList.sort(function(a, b){return b-a})
    let count = 1
    console.log(allPlayers)
    console.log(pointsList)
    for (const points of pointsList) {
        console.log('work')
        for (const item of allPlayers){
            console.log('work2')
            if (item.points == points){
                console.log('work3')
                $('#tableBody').append(`<tr>
                                            <th scope="row">${count}</th>
                                            <td>${item['name']}</td>
                                            <td>${item['points']}</td>
                                        </tr>`)
                count += 1
            }
        }
    }
    console.log('Ready')
}

function loadPlayers(){
    /**
     * carga los jugadores del local storage parseados a la clase playerStats
     */
    const allPlayersLS = localStorage.getItem('players')
    const allPlayers = JSON.parse(allPlayersLS)
    const players = []
    if (allPlayers){
        for (const player of allPlayers) {
            const player_parsed = parsePlayer(player)
            player_parsed.updateLastMD(player.lastMD)
            players.push(player_parsed)
        }
    }
    return players
}

function refreshPoints(){
    /**
     * Revisa todos los jugadores de LS para actualizar
     * sus puntos en funcion de los partidos que ya se hayan jugado
     */
    const allPlayers = loadPlayers()
    
    for (const player of allPlayers){
        calculate_points(player)
    }
    console.log(allPlayers)
    const allPlayersLS = JSON.stringify(allPlayers)
    localStorage.setItem('players', allPlayersLS)
}

function calculate_points(player){
    /**
     * Actualiza los puntos del jugador puntual
     */
    const allMatchesLS = localStorage.getItem('FINISHED')
    const allMatches = JSON.parse(allMatchesLS)
    for (const MD of _keys(player.results)){
        if ((isIn(_keys(allMatches), MD)) && (MD > player.lastMD)){
            for (const playerMatch of player.results[MD]){
                for (const matchResult of allMatches[MD]){
                    if ((matchResult.homeTeam == playerMatch.homeTeam) && (matchResult.awayTeam == playerMatch.awayTeam)){
                        if ((matchResult.scoreHT == playerMatch.scoreHT) && ((matchResult.scoreAT == playerMatch.scoreAT))){
                            player.addPoints(3)
                            break
                        }
                        else if ((matchResult.scoreHT < matchResult.scoreAT) && ((playerMatch.scoreHT < playerMatch.scoreAT))){
                            player.addPoints(1)
                            break
                        }
                        else if ((matchResult.scoreHT > matchResult.scoreAT) && ((playerMatch.scoreHT > playerMatch.scoreAT))){
                            player.addPoints(1)
                            break
                        }
                        else if ((matchResult.scoreHT == matchResult.scoreAT) && ((playerMatch.scoreHT == playerMatch.scoreAT))){
                            player.addPoints(1)
                            break
                        }
                    }
                }
            }
            player.lastMD = MD
        }
    }
}