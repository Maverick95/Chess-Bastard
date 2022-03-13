interface Game {
    timeClass: "bullet" | "blitz" | "rapid",
    time: number,
    player: string,
    opponent: string,
    playerColour: "white" | "black",
    result: string
}

export default Game;