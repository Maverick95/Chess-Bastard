import axios from 'axios';
import Player from '../models/Player';

const GetPlayerService = (username: string): Promise<Player> =>
    axios.get(`https://api.chess.com/pub/player/${username}`).then(response => response.data);

export default GetPlayerService;