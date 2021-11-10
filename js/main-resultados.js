import { checkUpdates, loadPlayersOptions, clearMDOptions, getPlayerSavedMatches} from "./main.js"
import { _keys } from "./handle.js"

$(document).ready(function(){
    checkUpdates();
    loadPlayersOptions();
    $('#playerSelector').change(function(){
        if ($(this).val() == 'add'){
            loadMDOptionsResults($(this).val())
            $('#playerName').show();
        }
        else if ($(this).val() == 'chose') {
            clearMDOptions()
            $('#playerName').hide();
        }
        else{
            loadMDOptionsResults($(this).val())
        }
        $('#TableToComplete').hide();
    })
    $('#searchButton').click(function(){
        loadResultsTable($('#playerSelector').val(), $('#matchdaySelector').val())
    })
    $('#refreshAPI').click(function(){
        checkUpdates(true)
    })
})

function loadMDOptionsResults(player){
    /**
     * Carga las opciones de la etiqueta select de las fechas en base a las fechas restantes
     * y a las fechas cargadas por el jugador elegido. Si el jugador es nuevo carga todas las fechas
     * disponibles
     */
    clearMDOptions()
    const savedMD = getPlayerSavedMatches(player)
    for (const MD of savedMD){
        $('#matchdaySelector').append(`<option value="${MD}">${MD.replace('MD','')}</option>`)
    }
    console.log('Partidos cargados')
}


function loadResultsTable(playerSelected, mdN) {
    /**
     * Carga la tabla para el jugador y matchday (mdN) elegidos
     */
    const allPlayersLS = localStorage.getItem('players')
    const allPlayers = JSON.parse(allPlayersLS)
    for(const player of allPlayers){
        if (player['name'] == playerSelected){
            $('#tableBody').empty()
            let pos = 1
            for (const match of player['results'][mdN]){
                $('#tableBody').append(
                    `<tr>
                        <th scope="row">${pos}</th>
                        <td>${match['homeTeam']}</td>
                        <td>${match['scoreHT']}-${match['scoreAT']}</td>
                        <td>${match['awayTeam']}</td>
                    </tr>`
                )
                pos += 1
            }
        }
    }
    $('#resultTable').show()
    console.log('Tabla cargada')
}