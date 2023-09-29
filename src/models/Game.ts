interface Game {
    uuid: string,
    timeClass: "bullet" | "blitz" | "rapid",
    time: number,
    opponent: string,
    player: "white" | "black",
    result: string,
    pgn: string,
}

export default Game;