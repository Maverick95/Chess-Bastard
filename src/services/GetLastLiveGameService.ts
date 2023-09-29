import axios from 'axios';
import Game from '../models/Game';
import getCurrentDateTime from '../helpers/CurrentDateTimeHelper';

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
                })
            })
        )[0] ?? null);
};

const GetLastLiveGameService = async (username: string, seconds: number): Promise<Game> => {

    const currentDate = getCurrentDateTime();
    const pastDate = new Date(currentDate.getTime() - (seconds * 1000));
    const sameMonth = pastDate.getUTCMonth() === currentDate.getUTCMonth() 
    
    let filterDate = sameMonth ? pastDate : new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth());
    
    const game: Game = await GetLastLiveGameYearMonth(
        username,
        filterDate.getUTCFullYear(),
        1 + filterDate.getUTCMonth(),
        Math.floor(filterDate.getTime() / 1000));

    filterDate = pastDate;

    return game ??
        (sameMonth ? null :
            await GetLastLiveGameYearMonth(
                username,
                filterDate.getUTCFullYear(),
                1 + filterDate.getUTCMonth(),
                Math.floor(filterDate.getTime() / 1000))
        );
};

export default GetLastLiveGameService;