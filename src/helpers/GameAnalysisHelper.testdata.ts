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

  {
    url: "https://www.chess.com/game/live/42552582925",
    pgn: "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2022.04.01\"]\n[Round \"-\"]\n[White \"Yudiling\"]\n[Black \"JamesCookpandp\"]\n[Result \"0-1\"]\n[CurrentPosition \"3r4/5pkp/5p2/2pP2p1/1bN1PP2/1P4P1/2P3KP/3R4 w - -\"]\n[Timezone \"UTC\"]\n[ECO \"A00\"]\n[ECOUrl \"https://www.chess.com/openings/Kings-Fianchetto-Opening-1...d5-2.Bg2\"]\n[UTCDate \"2022.04.01\"]\n[UTCTime \"11:46:33\"]\n[WhiteElo \"672\"]\n[BlackElo \"687\"]\n[TimeControl \"180\"]\n[Termination \"JamesCookpandp won on time\"]\n[StartTime \"11:46:33\"]\n[EndDate \"2022.04.01\"]\n[EndTime \"11:52:00\"]\n[Link \"https://www.chess.com/game/live/42552582925\"]\n\n1. g3 {[%clk 0:03:00]} 1... d5 {[%clk 0:02:59.6]} 2. Bg2 {[%clk 0:02:59.9]} 2... Nf6 {[%clk 0:02:58.6]} 3. d3 {[%clk 0:02:59.7]} 3... Nc6 {[%clk 0:02:56.8]} 4. Bg5 {[%clk 0:02:59.6]} 4... Bf5 {[%clk 0:02:56.1]} 5. Bxf6 {[%clk 0:02:57.2]} 5... exf6 {[%clk 0:02:54.9]} 6. Nc3 {[%clk 0:02:52.4]} 6... Bd6 {[%clk 0:02:53.3]} 7. Bxd5 {[%clk 0:02:49]} 7... O-O {[%clk 0:02:43.3]} 8. Nf3 {[%clk 0:02:45.9]} 8... Nb4 {[%clk 0:02:40.4]} 9. Bxb7 {[%clk 0:02:35.7]} 9... Rb8 {[%clk 0:02:38.5]} 10. Be4 {[%clk 0:02:33.2]} 10... Bxe4 {[%clk 0:02:35.3]} 11. dxe4 {[%clk 0:02:32.5]} 11... Nc6 {[%clk 0:02:33]} 12. Rb1 {[%clk 0:02:21.4]} 12... Qe7 {[%clk 0:02:22.8]} 13. O-O {[%clk 0:02:08.9]} 13... a5 {[%clk 0:02:20]} 14. Nd5 {[%clk 0:02:03.2]} 14... Qe6 {[%clk 0:02:17.4]} 15. Qd3 {[%clk 0:01:41.2]} 15... Nb4 {[%clk 0:02:14.3]} 16. Nxb4 {[%clk 0:01:39]} 16... Bxb4 {[%clk 0:02:12.9]} 17. b3 {[%clk 0:01:24.7]} 17... c5 {[%clk 0:02:10.3]} 18. Qc4 {[%clk 0:01:17.1]} 18... Qd6 {[%clk 0:02:00.6]} 19. Rfd1 {[%clk 0:01:11.3]} 19... Qc6 {[%clk 0:01:54.2]} 20. Rd5 {[%clk 0:01:01.3]} 20... Rfd8 {[%clk 0:01:46.9]} 21. Rbd1 {[%clk 0:00:55.5]} 21... g6 {[%clk 0:01:42.6]} 22. Kg2 {[%clk 0:00:46.8]} 22... Rxd5 {[%clk 0:01:39.8]} 23. exd5 {[%clk 0:00:42.6]} 23... Qd6 {[%clk 0:01:37.4]} 24. e4 {[%clk 0:00:35.8]} 24... Kg7 {[%clk 0:01:32]} 25. Nd2 {[%clk 0:00:31.1]} 25... a4 {[%clk 0:01:24.9]} 26. a3 {[%clk 0:00:20.6]} 26... Bxa3 {[%clk 0:01:21.5]} 27. Qxa4 {[%clk 0:00:19.4]} 27... Bb4 {[%clk 0:01:18.6]} 28. Nc4 {[%clk 0:00:15.2]} 28... Qd8 {[%clk 0:01:08.8]} 29. Qc6 {[%clk 0:00:08.9]} 29... Rc8 {[%clk 0:01:03.4]} 30. Qb6 {[%clk 0:00:05.5]} 30... Rb8 {[%clk 0:00:54.5]} 31. Qxd8 {[%clk 0:00:03.7]} 31... Rxd8 {[%clk 0:00:52.4]} 32. f4 {[%clk 0:00:00.8]} 32... g5 {[%clk 0:00:49.2]} 0-1\n",
    expected: {
      white: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 1,
          positions: [
            {row: 2, col: 1},
            {row: 1, col: 2},
            {row: 4, col: 3},
            {row: 3, col: 4},
            {row: 3, col: 5},
            {row: 2, col: 6},
            {row: 1, col: 7},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 1,
          positions: [
            {row: 0, col: 3},
          ],
        },
        [Piece.KNIGHT]: {
          initial: 2,
          gained: 0,
          lost: 1,
          positions: [
            {row: 3, col: 2},
          ],
        },
        [Piece.BISHOP]: {
          initial: 2,
          gained: 0,
          lost: 2,
          positions: [],
        },
        [Piece.QUEEN]: {
          initial: 1,
          gained: 0,
          lost: 1,
          positions: [],
        },
        [Piece.KING]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 1, col: 6},
          ],
        }
      },
      black: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 3,
          positions: [
            {row: 4, col: 2},
            {row: 5, col: 5},
            {row: 6, col: 5},
            {row: 4, col: 6},
            {row: 6, col: 7},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 1,
          positions: [
            {row: 7, col: 3},
          ],
        },
        [Piece.KNIGHT]: {
          initial: 2,
          gained: 0,
          lost: 2,
          positions: [],
        },
        [Piece.BISHOP]: {
          initial: 2,
          gained: 0,
          lost: 1,
          positions: [
            {row: 3, col: 1},
          ],
        },
        [Piece.QUEEN]: {
          initial: 1,
          gained: 0,
          lost: 1,
          positions: [],
        },
        [Piece.KING]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 6, col: 6},
          ],
        }
      }
    }
  }
];

export { getGameAnalysisFromPgnTestInstances }

