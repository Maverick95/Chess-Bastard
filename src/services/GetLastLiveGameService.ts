import axios from 'axios';
import Game from 'models/Game';
import getCurrentDateTime from 'helpers/CurrentDateTimeHelper';

const GetLastLiveGameYearMonth = (username: string, year: number, month: number, endTime: number): Promise<Game> => {
    const routeMonth: string = `${month < 10 ? '0' : ''}${month}`;
    return axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${routeMonth}`)
    .then(response => response.data.games
        .filter(
            value =>
            value.rules === 'chess' &&
            ['bullet', 'blitz', 'rapid'].includes(value.time_class) &&
            value.end_time >= endTime)
        .sort(
            (a, b) => b.end_time - a.end_time
        ).map(value => (
            {
                uuid: value.uuid,
                timeClass: value.time_class,
                time: parseInt(value.time_control),
                player: username,
                ...(value.white.username.toUpperCase() === username.toUpperCase() ?
                {
                    opponent: value.black.username,
                    playerColour: 'white',
                    result: value.white.result
                } :
                {
                    opponent: value.white.username,
                    playerColour: 'black',
                    result: value.black.result
                }),
                pgn: value.pgn,
            })
        )[0] ?? null);
};

const GetLastLiveGameService = async (username: string, seconds: number): Promise<Game> => {

    const currentDate = getCurrentDateTime();
    const pastDate = new Date(currentDate.getTime() - (seconds * 1000));
    const sameMonth = pastDate.getUTCMonth() === currentDate.getUTCMonth();
    
    if (sameMonth) {
        return await GetLastLiveGameYearMonth(
            username,
            currentDate.getUTCFullYear(),
            1 + currentDate.getUTCMonth(),
            Math.floor(pastDate.getTime() / 1000));
    }

    let game: Game = null;
    let loopDateYM = (12 * currentDate.getUTCFullYear()) + currentDate.getUTCMonth();
    const pastDateYM = (12 * pastDate.getUTCFullYear()) + pastDate.getUTCMonth();

    while (loopDateYM >= pastDateYM) {
        const
            loopYear = Math.floor(loopDateYM / 12),
            loopMonth = loopDateYM % 12,
            boundaryDate = loopDateYM > pastDateYM ? new Date(loopYear, loopMonth) : pastDate;
                
        game = await GetLastLiveGameYearMonth(
            username,
            loopYear,
            1 + loopMonth,
            Math.floor(boundaryDate.getTime() / 1000));

        if (game !== null) {
            break;
        }

        loopDateYM--;
    }

    return game;
};

export default GetLastLiveGameService;