import axios from 'axios';
import Player from '../models/Player';

const GetPlayerService = (username: string): Promise<Player> =>
    axios.get(`https://api.chess.com/pub/player/${username}`)
    .then(response => {
        const { player_id: id, username, last_online: lastOnlineSeconds, avatar, name } = response.data;
        return { id, username, lastOnline: new Date(lastOnlineSeconds * 1000), avatar, name };
    });

export default GetPlayerService;