import { Piece, GameAnalysis } from 'models/GameAnalysis';

interface getGameAnalysisFromPgnTestInstance {
  url: string,
  pgn: string,
  expected: GameAnalysis,
}

// Test data taken at random from jamescookpandp at chess.com. Thanks James for all the games!

const getGameAnalysisFromPgnTestInstances: getGameAnalysisFromPgnTestInstance[] = [
  
  {
    url: "https://www.chess.com/game/live/42552567423",
    pgn: "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2022.04.01\"]\n[Round \"-\"]\n[White \"visenroca\"]\n[Black \"JamesCookpandp\"]\n[Result \"1-0\"]\n[CurrentPosition \"r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq -\"]\n[Timezone \"UTC\"]\n[ECO \"C20\"]\n[ECOUrl \"https://www.chess.com/openings/Kings-Pawn-Opening-Wayward-Queen-Attack-2...Nc6-3.Bc4\"]\n[UTCDate \"2022.04.01\"]\n[UTCTime \"11:45:20\"]\n[WhiteElo \"656\"]\n[BlackElo \"679\"]\n[TimeControl \"180\"]\n[Termination \"visenroca won by checkmate\"]\n[StartTime \"11:45:20\"]\n[EndDate \"2022.04.01\"]\n[EndTime \"11:46:20\"]\n[Link \"https://www.chess.com/game/live/42552567423\"]\n\n1. e4 {[%clk 0:02:47.6]} 1... e5 {[%clk 0:02:58.6]} 2. Qh5 {[%clk 0:02:41.7]} 2... Nc6 {[%clk 0:02:53.7]} 3. Bc4 {[%clk 0:02:17.1]} 3... Nf6 {[%clk 0:02:50.5]} 4. Qxf7# {[%clk 0:02:11.7]} 1-0\n",
    expected: {
      white: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 0,
          positions: [
            {row: 1, col: 0},
            {row: 1, col: 1},
            {row: 1, col: 2},
            {row: 1, col: 3},
            {row: 3, col: 4},
            {row: 1, col: 5},
            {row: 1, col: 6},
            {row: 1, col: 7},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 0, col: 0},
            {row: 0, col: 7},
          ],
        },
        [Piece.KNIGHT]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 0, col: 1},
            {row: 0, col: 6},
          ],
        },
        [Piece.BISHOP]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 0, col: 2},
            {row: 3, col: 2},
          ],
        },
        [Piece.QUEEN]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 6, col: 5},
          ],
        },
        [Piece.KING]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 0, col: 4},
          ],
        }
      },
      black: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 1,
          positions: [
            {row: 6, col: 0},
            {row: 6, col: 1},
            {row: 6, col: 2},
            {row: 6, col: 3},
            {row: 4, col: 4},
            {row: 6, col: 6},
            {row: 6, col: 7},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 7, col: 0},
            {row: 7, col: 7},
          ],
        },
        [Piece.KNIGHT]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 5, col: 2},
            {row: 5, col: 5},
          ],
        },
        [Piece.BISHOP]: {
          initial: 2,
          gained: 0,
          lost: 0,
          positions: [
            {row: 7, col: 2},
            {row: 7, col: 5},
          ],
        },
        [Piece.QUEEN]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 7, col: 3},
          ],
        },
        [Piece.KING]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 7, col: 4},
          ],
        }
      }
    }
  },

];

export { getGameAnalysisFromPgnTestInstances }

