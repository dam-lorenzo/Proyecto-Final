export class PlayerStats {
    /**
     * Guarda toda la informacion de cada jugador, tambien tiene los metodos
     * necesarios para que la pagina funcione 
     */
    constructor(name){
        this.name = name
        this.points = 0
        this.lastMD = 'MD0' //se usa cuando se calculan los puntos
        this.results = {}
    }

    addPoints(newPoints){
        this.points += newPoints
    }

    addResults(keyMD, listResults){
        this.results[keyMD] = listResults
    }

    updateLastMD(newLastMD){
        this.lastMD = newLastMD
    }
}

export class MatchInfo {
    /**
     *  Clase para almacenar los resultados
     */
    constructor(homeTeam, scoreHT, awayTeam, scoreAT) {
        this.homeTeam = homeTeam
        this.scoreHT  = scoreHT
        this.awayTeam = awayTeam
        this.scoreAT  = scoreAT
    }
}