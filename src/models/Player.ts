import Game from "./Game";

interface Player {
    id: number,
    username: string,
    lastOnline: Date,
    avatar?: string,
    name?: string,
    lastLiveGame?: Game,
};

export default Player;