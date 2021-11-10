// Modulo con las funciones principales comunes a varias secciones
import { PlayerStats, MatchInfo } from "./clases.js"
import { _keys, _range} from "./handle.js"

export function checkUpdates(forceUpdate = false){
    /**
     * Verifica cuando fue la ultima actualizacion con la api y en caso de que no haya o 
     * hayan pasado mas de 7 dias se actualiza. La api es una demo gratuita y tiene un limite de
     * requests por hora (creo que son 50) para no tener problemas con esto almaceno la informacion
     * en el local storage
     */
    const lastUpdate = localStorage.getItem('lastUpdate')
    const lDate = new Date(lastUpdate)
    const today = new Date();
    const daysUpdated = (today-lDate)/(1000*60*60*24)
    if ((lastUpdate == null) || (daysUpdated > 7) || (forceUpdate)){
        const finishedOK = makeRequest('FINISHED')
        const scheduledOK = makeRequest('SCHEDULED')
        if (finishedOK && scheduledOK){
            localStorage.setItem('lastUpdate', today)
        }
        else{
            alert('Error al acceder a los datos, recargue la pagina')
        }
    }
    else {
        console.log('No se actualizo')
        console.log(`La ultima actualizacion fue hace ${daysUpdated} dias`)
    }
}

export function makeRequest(status) {
    /**
     * Hace la request a la api con los partidos y los almacena en el local storage
     */
    const settings = {
        "url": "https://api.football-data.org/v2/competitions/PL/matches?status=" + status,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "X-Auth-Token": "af0115608b594c80ae3965097ddfdf98"
        },
      };
    $.ajax(settings).done(function (response) {
        const matchesAPI = response.matches
        const ret = {}
        let results = []
        let aux = 'MD' + matchesAPI[0].matchday
        let MD
        for(const match of matchesAPI){
            MD = 'MD' + match.matchday
            if (MD != aux){
                ret[aux] = results
                results = []
                aux = MD
            }
            const homeTeam = match.homeTeam.name
            const awayTeam = match.awayTeam.name
            const scoreHT  = match.score.fullTime.homeTeam
            const scoreAT  = match.score.fullTime.awayTeam
            const match_info = new MatchInfo(homeTeam, scoreHT, awayTeam, scoreAT)
            results.push(match_info)
            
        }
        ret[MD] = results
        console.log(ret)

        console.log('a guardar:')
        console.log(JSON.stringify(ret))
        localStorage.setItem(status, JSON.stringify(ret))
        console.log('guardado los completados')
    })
    return true
}

export function loadPlayersOptions(){
    /**
     * Carga las opciones de la etiqueta select en base a los jugadores guardados en el local storage
     */
    const playersLS = localStorage.getItem('players')
    if (playersLS){
        const players = JSON.parse(playersLS)
        for (const player of players){
            $('#playerSelector').append(`<option value="${player['name']}">${player['name']}</option>`)
        }
        console.log('Jugadores cargados')
    }
    else{
        console.log('No hay jugadores guardados')
    }
}

export function clearMDOptions(){
    /**
     * Limpia las opciones del selector de fecha
     */
    $('#matchdaySelector').empty()
    $('#matchdaySelector').append('<option value="0">...</option>')
}

export function getPlayerSavedMatches(player){
    /**
     * Busca en el LS si el jugador elegido tiene fechas guardadas
     */
    const playersLS = localStorage.getItem('players')
    const players = JSON.parse(playersLS)
    for (const p of players){
        if (p.name == player){
            return _keys(p.results)
        }
    }
    return []
}

export function parsePlayer(rawPlayer){
    /**
     * Parsea un obj a la clase PlayerStats para poder usar sus metodos
     */
    const player = new PlayerStats(rawPlayer.name)
    player.addPoints(rawPlayer.points)
    for (let key of _keys(rawPlayer.results)){
        player.addResults(key, rawPlayer.results[key])
    }
    return player
}