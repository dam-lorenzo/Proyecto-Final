import { PlayerStats, MatchInfo } from "./clases.js"
import { checkUpdates, loadPlayersOptions, clearMDOptions, getPlayerSavedMatches, parsePlayer} from "./main.js"
import { _keys, remove, isNum, isIn } from "./handle.js"

$(document).ready(function(){
    checkUpdates();
    loadPlayersOptions();
    $('#playerSelector').change(function(){
        if ($(this).val() == 'add'){
            loadMDOptions($(this).val())
            $('#playerName').show();
        }
        else if ($(this).val() == 'chose') {
            clearMDOptions()
            $('#playerName').hide();
        }
        else{
            $('#playerName').hide();
            loadMDOptions($(this).val())
        }
        $('#TableToComplete').hide();
        $('#addButton').hide();
    })
    $('#matchdaySelector').change(function(){
        if ($(this).val() != 0){
            loadTable($(this).val())
            $('#TableToComplete').show();
            $('#addButton').show();
        }
        else {
            $('#TableToComplete').hide();
            $('#addButton').hide();
        }
    })
    $('#addButton').click(function(){
        submitResults()
    })
    $('#refreshAPI').click(function(){
        checkUpdates(true)
    })
})


function loadMDOptions(player){
    /**
     * Carga las opciones de la etiqueta select de las fechas en base a las fechas restantes
     * y a las fechas cargadas por el jugador elegido. Si el jugador es nuevo carga todas las fechas
     * disponibles
     */
    clearMDOptions()
    let savedMD
    if (player != 'add'){
        savedMD = getPlayerSavedMatches(player)
    }
    else{
        savedMD =[]
    }    
    const matchesLS = localStorage.getItem('SCHEDULED')
    if (matchesLS){
        const matches = JSON.parse(matchesLS)
        for (const number of _keys(matches)){
            if (savedMD.indexOf(number) == -1 ){
                $('#matchdaySelector').append(`<option value="${number}">${number.replace('MD','')}</option>`)
            }
        }
        console.log('Partidos cargados')
    }
    else{
        console.log('No hay partidos guardados')
    }
}

function loadTable(mdN) {
    /**
     * Carga la tabla para el matchday (mdN) elegido
     */
    const matchesLC = localStorage.getItem('SCHEDULED')
    const matches = JSON.parse(matchesLC)
    $('#tableBody').empty()
    if (isIn(_keys(matches), mdN)){
        let pos = 1
        for (const match of matches[mdN]){
            $('#tableBody').append(
                `<tr>
                    <th scope="row">${pos}</th>
                    <td id="homeTeam${pos}">${match['homeTeam']}</td>
                    <td><input id="resultMatch${pos}" class="carga_result form-control text-center input-sm" maxlength="5" style="height:24px;max-width:55px;" placeholder="0-0"></td>
                    <td id="awayTeam${pos}">${match['awayTeam']}</td>
                </tr>`
            )
            pos = pos + 1
        }
    }
    console.log('Tabla cargada')
}

function submitResults() {
    /**
     * Valida la informacion cargada por el usuario, y si esta todo bien lo guarda en local storage
     */
    const matchDay = $('#matchdaySelector').val()
    const playerOP = $('#playerSelector').val()
    const playersLS = localStorage.getItem('players')
    let players
    if (playersLS){
        players = JSON.parse(playersLS)
    }
    else{
        players = []
    }
    let player
    // Busco la opcion de jugador que ingreso el usuario o la creo si se agrego un jugador
    if (playerOP == 'add'){
        player = new PlayerStats($('#playerName').val())
        players.push(player)    
    }
    else {
        for (const p of players){
            if (p.name == playerOP){
                player = p
                break
            }
        }
        remove(players, player)
        player = parsePlayer(player)
        players.push(player)
    }
    const results = []
    for(let pos=1; pos<11; pos++){
        const homeTeam = $(`#homeTeam${pos}`).text()
        const awayTeam = $(`#awayTeam${pos}`).text()
        const result = $(`#resultMatch${pos}`).val()
        const scoreHT = parseInt(result.split('-')[0])
        const scoreAT = parseInt(result.split('-')[1])
        if(isNum(scoreHT) && isNum(scoreAT)){
            results.push(new MatchInfo(homeTeam, scoreHT, awayTeam, scoreAT))
        }
        else{
            errorInTable(pos)
            return
        }
    }
    console.log(results)
    console.log(player)
    player.addResults(matchDay, results)
    console.log(players)
    localStorage.setItem('players', JSON.stringify(players))
    console.log('Resultados guardados')
    location.reload()
}

function errorInTable(pos){
    alert(`Ingrese bien el resultado en ${pos} \nLos numeros deben estar separados por '-'`)
}
