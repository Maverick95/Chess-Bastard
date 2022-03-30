import { parseGame } from '@mliebelt/pgn-parser';
import { Piece, Position, GameAnalysis, createDefaultGameAnalysis, createDefaultBoardAnalysis } from 'models/GameAnalysis';

interface Move {
    player: 'white' | 'black',
    piece: Piece,
    to: Position,
    promotion?: Piece,
    strike: boolean,
    discType?: 'row' | 'col',
    discIndex?: number,
};

const fig_to_piece: {[piece: string]: Piece} = {
    'R': Piece.ROOK,
    'N': Piece.KNIGHT,
    'B': Piece.BISHOP,
    'Q': Piece.QUEEN,
    'K': Piece.KING,
};

const row_to_row: {[row: string]: number} = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
};

const getGameAnalysisFromPGN = (pgn: string): GameAnalysis => {

    const tree = parseGame(pgn);
    const moves: Move[] = [];

    tree.moves.sort((a, b) => a.moveNumber === b.moveNumber ? ( a.turn === 'w' ? -1 : 1 ) : (a.moveNumber - b.moveNumber))
    .forEach(move => {
        const player = move.turn === 'w' ? 'white' : 'black';
        switch (move.notation.notation) {
            case 'O-O':
                {
                    if (player === 'white') {
                        moves.push({
                            player: 'white',
                            piece: Piece.KING,
                            to: { row: 0, col: 6 },
                            strike: false,
                        });
                        moves.push({
                            player: 'white',
                            piece: Piece.ROOK,
                            to: { row: 0, col: 5 },
                            strike: false,
                        });
                    }
                    else {
                        moves.push({
                            player: 'black',
                            piece: Piece.KING,
                            to: { row: 7, col: 6 },
                            strike: false,
                        });
                        moves.push({
                            player: 'black',
                            piece: Piece.ROOK,
                            to: { row: 7, col: 5 },
                            strike: false,
                        });
                    }
                    break;
                }

            case 'O-O-O':
                {
                    if (player === 'white') {
                        moves.push({
                            player: 'white',
                            piece: Piece.KING,
                            to: { row: 0, col: 2 },
                            strike: false,
                        });
                        moves.push({
                            player: 'white',
                            piece: Piece.ROOK,
                            to: { row: 0, col: 3 },
                            strike: false,
                        });
                    }
                    else {
                        moves.push({
                            player: 'black',
                            piece: Piece.KING,
                            to: { row: 7, col: 2 },
                            strike: false,
                        });
                        moves.push({
                            player: 'black',
                            piece: Piece.ROOK,
                            to: { row: 7, col: 3 },
                            strike: false,
                        });
                    }
                    break;
                }

            default:
                {
                    const new_move: Move = {
                        player,
                        piece: fig_to_piece[move.notation.fig] ?? Piece.PAWN,
                        to: {
                            row: row_to_row[move.notation.row],
                            col: parseInt(move.notation.col) - 1
                        },
                        strike: move.notation.strike === 'x'
                    };

                    if (move.notation.promotion === '=Q') {
                        new_move.promotion = Piece.QUEEN;
                    }

                    if (move.notation.disc) {
                        const row_lookup = row_to_row[move.notation.disc];
                        if (row_lookup !== undefined) {
                            new_move.discType = 'row';
                            new_move.discIndex = row_lookup;
                        }
                        else {
                            new_move.discType = 'col';
                            new_move.discIndex = parseInt(move.notation.disc) - 1;
                        }
                    }

                    moves.push(new_move);
                    break;
                }
        }

    });
    
    const game = createDefaultGameAnalysis();
    const board = createDefaultBoardAnalysis();

    moves.forEach(move => {

        /*
        player: 'white' | 'black',
        piece: Piece,
        to: Position,
        promotion?: Piece,
        strike: boolean,
        discType?: 'row' | 'col',
        discIndex?: number,
        */

        /*
        GOTCHA -
        you'll have to work out which pieces can move to the position.
        OR it is easier to take a PIECE, and a start / end position, and work out if its possible given a board.
        Also remember your old friend en passant! Not always is the case, when you move to a square, and the taken piece is there...
        Wondering whether to rephrase all moves into the appear / disappear format again??
        */

    });

    return game;
};

export default getGameAnalysisFromPGN;