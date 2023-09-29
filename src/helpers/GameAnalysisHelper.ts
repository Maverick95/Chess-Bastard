import { parseGame } from '@mliebelt/pgn-parser';
import {
    Piece,
    Position,
    GameAnalysis,
    BoardAnalysis,
    createDefaultGameAnalysis,
    createDefaultBoardAnalysis,
    PositionToIndex
} from 'models/GameAnalysis';
import { difference } from 'react-query/types/core/utils';

interface Move {
    player: 'white' | 'black',
    piece: Piece,
    to: Position,
    promotion?: Piece,
    strike: boolean,
    discType?: 'row' | 'col',
    discIndex?: number,
};

const fig_to_piece: { [piece: string]: Piece } = {
    'R': Piece.ROOK,
    'N': Piece.KNIGHT,
    'B': Piece.BISHOP,
    'Q': Piece.QUEEN,
    'K': Piece.KING,
};

const row_to_row: { [row: string]: number } = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
};

/*
Key assumption - you trust that the PGN is 100% correct.
Key assumption - a move is possible if the piece can reach there,
based on the capabilities of the piece and the pieces currently on the board.
Do not consider if the move exposes a check.
This is a level of analysis I draw the level at.
Just call it "analysis unavailable".
*/

const checkMoveAgainstBoardAnalysis = (from: Position, move: Move, board: BoardAnalysis): boolean => {

    let result = false;

    switch (move.piece) {

        case Piece.PAWN:
            {
                const differences: Position[] = [];
                if (move.player === 'white') {
                    if (move.strike) {
                        differences.push({ row: 1, col: -1 });
                        differences.push({ row: 1, col:  1 });
                    }
                    else {
                        differences.push({ row: 1, col:  0 });
                    }
                }
                else {
                    if (move.strike) {
                        differences.push({ row: -1, col: -1});
                        differences.push({ row: -1, col:  1});
                    }
                    else {
                        differences.push({ row: -1, col:  0 });
                    }
                }
                const difference: Position = {
                    row: move.to.row - from.row,
                    col: move.to.col - from.col,
                };
                result = !differences.every(d => !(d.row === difference.row && d.col === difference.col));
            }
            break;

        case Piece.ROOK:
            {
                const step: Position = {
                    row: Math.sign(move.to.row - from.row),
                    col: Math.sign(move.to.col - from.col),
                };
                if ((step.row === 0) !== (step.col !== 0)) {
                    from.row += step.row;
                    from.col += step.col;
                    let square_occupied = false;
                    while (from.row !== move.to.row || from.col !== move.to.col) {
                        if (board[PositionToIndex(from)] !== undefined) {
                            square_occupied = true;
                            break;
                        }
                    }
                    result = !square_occupied;
                }
            }
            break;

        case Piece.KNIGHT:
            {
                const differences: Position[] = [
                    { row: -2, col: -1 },
                    { row: -1, col: -2 },
                    { row: 1, col: -2 },
                    { row: 2, col: -1 },
                    { row: 2, col: 1 },
                    { row: 1, col: 2 },
                    { row: -1, col: 2 },
                    { row: -2, col: 1 },
                ];
                const difference: Position = {
                    row: move.to.row - from.row,
                    col: move.to.col - from.col,
                };
                result = !differences.every(d => !(d.row === difference.row && d.col === difference.col));
            }
            break;

        case Piece.BISHOP:
            {
                const difference: Position = {
                    row: move.to.row - from.row,
                    col: move.to.col - from.col,
                };
                if (Math.abs(difference.row) === Math.abs(difference.col)) {
                    const step: Position = {
                        row: Math.sign(difference.row),
                        col: Math.sign(difference.col),
                    };
                    from.row += step.row;
                    from.col += step.col;
                    let square_occupied = false;
                    while (from.row !== move.to.row || from.col !== move.to.col) {
                        if (board[PositionToIndex(from)] !== undefined) {
                            square_occupied = true;
                            break;
                        }
                    }
                    result = !square_occupied;
                }
            }
            break;

        case Piece.QUEEN:
            {
                const difference: Position = {
                    row: move.to.row - from.row,
                    col: move.to.col - from.col,
                };
                if (((difference.row === 0) !== (difference.col !== 0)) ||
                (Math.abs(difference.row) === Math.abs(difference.col))) {
                    const step: Position = {
                        row: Math.sign(difference.row),
                        col: Math.sign(difference.col),
                    };
                    from.row += step.row;
                    from.col += step.col;
                    let square_occupied = false;
                    while (from.row !== move.to.row || from.col !== move.to.col) {
                        if (board[PositionToIndex(from)] !== undefined) {
                            square_occupied = true;
                            break;
                        }
                    }
                    result = !square_occupied;
                }
            }
            break;

        case Piece.KING:
            {
                const differences: Position[] = [
                    { row: -1, col: -1 },
                    { row: -1, col: 0 },
                    { row: -1, col: 1 },
                    { row: 0, col: 1 },
                    { row: 1, col: 1 },
                    { row: 1, col: 0 },
                    { row: 1, col: -1 },
                    { row: 0, col: -1 },
                ];
                const difference: Position = {
                    row: move.to.row - from.row,
                    col: move.to.col - from.col,
                };
                result = !differences.every(d => !(d.row === difference.row && d.col === difference.col));
            }
            break;
    }

    return result;
}

const getGameAnalysisFromPGN = (pgn: string): GameAnalysis => {

    const tree = parseGame(pgn);
    const moves: Move[] = [];

    tree.moves.sort((a, b) => a.moveNumber === b.moveNumber ? (a.turn === 'w' ? -1 : 1) : (a.moveNumber - b.moveNumber))
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

        const active_player = game[move.player];
        const active_piece = active_player[move.piece];
        let active_positions = active_piece.positions;
        const active_positions_checked = active_positions.filter(from =>
            (!move.discType ||
            (move.discType === 'row' && move.discIndex === from.row) ||
            (move.discType === 'col' && move.discIndex === from.col)) &&
            checkMoveAgainstBoardAnalysis(from, move, board));

        if (active_positions_checked.length !== 1) {
            throw new Error("Could not retrieve Game Analysis from PGN");
        }

        const active_from = active_positions_checked[0];

        if (move.strike) {
            const active_to_piece = board[PositionToIndex(move.to)].piece;
            const inactive_player = game[move.player === 'white' ? 'black' : 'white'];
            const inactive_piece = inactive_player[active_to_piece];
            // If en passant, have another square to clear!
            inactive_piece.positions = inactive_piece.positions.filter(to =>
                !(to.row === move.to.row && to.col === move.to.col));
            inactive_piece.lost++;
            board[PositionToIndex(move.to)] = undefined;           
        }

        board[PositionToIndex(active_from)] = undefined;

        if (move.promotion) {
            active_piece.positions = active_positions.filter(from =>
                !(from.row === active_from.row && from.col === active_from.col));
            active_piece.lost++;
            const active_piece_promote = active_player[move.promotion];
            active_piece_promote.positions.push(move.to);
            active_piece_promote.gained++;
            board[PositionToIndex(move.to)] = { player: move.player, piece: move.promotion };
        }
        else {
            active_from.row = move.to.row;
            active_from.col = move.to.col;
            board[PositionToIndex(move.to)] = { player: move.player, piece: move.piece };
        }
    });

    return game;
};

export default getGameAnalysisFromPGN;