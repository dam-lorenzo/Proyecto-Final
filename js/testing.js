//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////            TESTING ZONE
////////    esta zona tiene funciones para hacer el testing de la pagina sin tener que esperar
////////    a los resultados reales, no son funciones que se usen en la pagina
////////    pero me facilitaron el desarrollo y creo que pueden facilitar la correcion, por eso las dejo
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function testing_players(){
    /**
     * Genera tres jugadores con resultados aleatoreos para las primeras 3 fechas
     * la idea de la funcion era poder testear que la tabla de posiciones funcione correctamente
     * la deja para que se pueda corregir tambien esta parte y asi no esperar a los resultados reales
     * 
     */
    const players = []
    players.push(generate_test_player('pepe'))
    players.push(generate_test_player('pepe2'))
    players.push(generate_test_player('pepe3'))
    localStorage.setItem('players', JSON.stringify(players))
}

function generate_test_player(name){
    const player = new PlayerStats(name)
    for (let count = 1; count < 4; count++){
        player.addResults(`MD${count}`, results(count))
    }
    return player
}

function results(MDn){
    switch(MDn){
        case 1:
            return [{homeTeam: "Brentford FC", scoreHT: random_number(), awayTeam: "Arsenal FC", scoreAT: random_number()},
                    {homeTeam: "Manchester United FC", scoreHT: random_number(), awayTeam: "Leeds United FC", scoreAT: random_number()},
                    {homeTeam: "Watford FC", scoreHT: random_number(), awayTeam: "Aston Villa FC", scoreAT: random_number()},
                    {homeTeam: "Leicester City FC", scoreHT: random_number(), awayTeam: "Wolverhampton Wanderers FC", scoreAT: random_number()},
                    {homeTeam: "Everton FC", scoreHT: random_number(), awayTeam: "Southampton FC", scoreAT: random_number()},
                    {homeTeam: "Chelsea FC", scoreHT: random_number(), awayTeam: "Crystal Palace FC", scoreAT: random_number()},
                    {homeTeam: "Burnley FC", scoreHT: random_number(), awayTeam: "Brighton & Hove Albion FC", scoreAT: random_number()},
                    {homeTeam: "Norwich City FC", scoreHT: random_number(), awayTeam: "Liverpool FC", scoreAT: random_number()},
                    {homeTeam: "Newcastle United FC", scoreHT: random_number(), awayTeam: "West Ham United FC", scoreAT: random_number()},
                    {homeTeam: "Tottenham Hotspur FC", scoreHT: random_number(), awayTeam: "Manchester City FC", scoreAT: random_number()}]
        
        case 2:
            return [{homeTeam: "Liverpool FC", scoreHT: random_number(), awayTeam: "Burnley FC", scoreAT: random_number()},
                    {homeTeam: "Manchester City FC", scoreHT: random_number(), awayTeam: "Norwich City FC", scoreAT: random_number()},
                    {homeTeam: "Leeds United FC", scoreHT: random_number(), awayTeam: "Everton FC", scoreAT: random_number()},
                    {homeTeam: "Crystal Palace FC", scoreHT: random_number(), awayTeam: "Brentford FC", scoreAT: random_number()},
                    {homeTeam: "Aston Villa FC", scoreHT: random_number(), awayTeam: "Newcastle United FC", scoreAT: random_number()},
                    {homeTeam: "Brighton & Hove Albion FC", scoreHT: random_number(), awayTeam: "Watford FC", scoreAT: random_number()},
                    {homeTeam: "Wolverhampton Wanderers FC", scoreHT: random_number(), awayTeam: "Tottenham Hotspur FC", scoreAT: random_number()},
                    {homeTeam: "Southampton FC", scoreHT: random_number(), awayTeam: "Manchester United FC", scoreAT: random_number()},
                    {homeTeam: "Arsenal FC", scoreHT: random_number(), awayTeam: "Chelsea FC", scoreAT: random_number()},
                    {homeTeam: "West Ham United FC", scoreHT: random_number(), awayTeam: "Leicester City FC", scoreAT: random_number()}]
        case 3:
            return [{homeTeam: "Manchester City FC", scoreHT: random_number(), awayTeam: "Arsenal FC", scoreAT: random_number()},
                    {homeTeam: "West Ham United FC", scoreHT: random_number(), awayTeam: "Crystal Palace FC", scoreAT: random_number()},
                    {homeTeam: "Norwich City FC", scoreHT: random_number(), awayTeam: "Leicester City FC", scoreAT: random_number()},
                    {homeTeam: "Newcastle United FC", scoreHT: random_number(), awayTeam: "Southampton FC", scoreAT: random_number()},
                    {homeTeam: "Brighton & Hove Albion FC", scoreHT: random_number(), awayTeam: "Everton FC", scoreAT: random_number()},
                    {homeTeam: "Aston Villa FC", scoreHT: random_number(), awayTeam: "Brentford FC", scoreAT: random_number()},
                    {homeTeam: "Liverpool FC", scoreHT: random_number(), awayTeam: "Chelsea FC", scoreAT: random_number()},
                    {homeTeam: "Tottenham Hotspur FC", scoreHT: random_number(), awayTeam: "Watford FC", scoreAT: random_number()},
                    {homeTeam: "Burnley FC", scoreHT: random_number(), awayTeam: "Leeds United FC", scoreAT: random_number()},
                    {homeTeam: "Wolverhampton Wanderers FC", scoreHT: random_number(), awayTeam: "Manchester United FC", scoreAT: random_number()}]
    }
}

function random_number() {
    const max = 5
    const min = 0
    return Math.floor(Math.random() * (max - min) + min);
}