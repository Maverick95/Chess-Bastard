/*
 * the default GameAnalysis is the single source-of-truth for how a game begins
 */

enum Piece {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
};

interface Position {
  row: number,
  col: number,
};

interface Square {
  player: 'white' | 'black',
  piece: Piece,
};

interface PieceAnalysis {
  initial: number,
  gained: number,
  lost: number,
  positions: Position[],
};

type PlayerAnalysis = {
  [piece in Piece]: PieceAnalysis
};

type GameAnalysis = {
  [player in 'white' | 'black']: PlayerAnalysis
};

type BoardAnalysis = {
  [index: number]: Square,
};

const PositionToIndex = (position: Position): number => (8 * position.row) + position.col;

const IndexToPosition = (index: number): Position => ({
  row: Math.floor(index / 8),
  col: index % 8,
});

const createDefaultGameAnalysis = (): GameAnalysis => ({

  'white': {

    [Piece.PAWN]:
    {
      initial: 8, gained: 0, lost: 0,
      positions: [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 1, col: 6 },
        { row: 1, col: 7 },
      ]
    },

    [Piece.ROOK]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 0, col: 0 },
        { row: 0, col: 7 },
      ]
    },

    [Piece.KNIGHT]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 0, col: 1 },
        { row: 0, col: 6 },
      ]
    },

    [Piece.BISHOP]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 0, col: 2 },
        { row: 0, col: 5 },
      ]
    },

    [Piece.QUEEN]:
    {
      initial: 1, gained: 0, lost: 0,
      positions: [
        { row: 0, col: 3 },
      ]
    },

    [Piece.KING]:
    {
      initial: 1, gained: 0, lost: 0,
      positions: [
        { row: 0, col: 4 },
      ]
    }

  },

  'black': {

    [Piece.PAWN]:
    {
      initial: 8, gained: 0, lost: 0,
      positions: [
        { row: 6, col: 0 },
        { row: 6, col: 1 },
        { row: 6, col: 2 },
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 6, col: 7 },
      ]
    },

    [Piece.ROOK]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 7, col: 0 },
        { row: 7, col: 7 },
      ]
    },

    [Piece.KNIGHT]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 7, col: 1 },
        { row: 7, col: 6 },
      ]
    },

    [Piece.BISHOP]:
    {
      initial: 2, gained: 0, lost: 0,
      positions: [
        { row: 7, col: 2 },
        { row: 7, col: 5 },
      ]
    },

    [Piece.QUEEN]:
    {
      initial: 1, gained: 0, lost: 0,
      positions: [
        { row: 7, col: 3 },
      ]
    },

    [Piece.KING]:
    {
      initial: 1, gained: 0, lost: 0,
      positions: [
        { row: 7, col: 4 },
      ]
    }

  }

});

const createBoardAnalysis = (gameAnalysis: GameAnalysis): BoardAnalysis => {

  const result: BoardAnalysis = {};

  ['white', 'black'].forEach((player) => {
    [Piece.PAWN, Piece.ROOK, Piece.KNIGHT, Piece.BISHOP, Piece.QUEEN, Piece.KING].forEach((piece) => {
      gameAnalysis[player][piece].positions.forEach((position) => {

        result[PositionToIndex(position)] = { player: player as any, piece };
      
      });
    });
  });

  return result;

};

const createDefaultBoardAnalysis = (): BoardAnalysis => createBoardAnalysis(createDefaultGameAnalysis());

export {
  Piece,
  Position,
  PieceAnalysis,
  GameAnalysis,
  BoardAnalysis,
  PositionToIndex,
  IndexToPosition,
  createDefaultGameAnalysis,
  createDefaultBoardAnalysis,
  createBoardAnalysis
};
