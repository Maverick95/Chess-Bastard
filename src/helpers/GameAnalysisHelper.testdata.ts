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
  },

  {
    url: "https://www.chess.com/game/live/42553128997",
    pgn: "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2022.04.01\"]\n[Round \"-\"]\n[White \"MindaugasMieikis\"]\n[Black \"JamesCookpandp\"]\n[Result \"0-1\"]\n[CurrentPosition \"3k4/1p6/p6b/1qp4p/P7/2P5/Kq6/8 w - -\"]\n[Timezone \"UTC\"]\n[ECO \"C21\"]\n[ECOUrl \"https://www.chess.com/openings/Center-Game\"]\n[UTCDate \"2022.04.01\"]\n[UTCTime \"11:52:37\"]\n[WhiteElo \"692\"]\n[BlackElo \"696\"]\n[TimeControl \"180\"]\n[Termination \"JamesCookpandp won by checkmate\"]\n[StartTime \"11:52:37\"]\n[EndDate \"2022.04.01\"]\n[EndTime \"11:57:44\"]\n[Link \"https://www.chess.com/game/live/42553128997\"]\n\n1. e4 {[%clk 0:03:00]} 1... e5 {[%clk 0:02:59.5]} 2. d4 {[%clk 0:02:59.1]} 2... Nf6 {[%clk 0:02:58.9]} 3. d5 {[%clk 0:02:58.7]} 3... d6 {[%clk 0:02:55.6]} 4. Qe2 {[%clk 0:02:57.4]} 4... c6 {[%clk 0:02:53.2]} 5. Bg5 {[%clk 0:02:56.6]} 5... h6 {[%clk 0:02:50.2]} 6. Bxf6 {[%clk 0:02:55.7]} 6... Qxf6 {[%clk 0:02:48.1]} 7. Nc3 {[%clk 0:02:55.4]} 7... Bd7 {[%clk 0:02:42]} 8. O-O-O {[%clk 0:02:53.8]} 8... c5 {[%clk 0:02:39.6]} 9. Nb5 {[%clk 0:02:49.5]} 9... a6 {[%clk 0:02:35.4]} 10. Nc7+ {[%clk 0:02:47.8]} 10... Ke7 {[%clk 0:02:29.5]} 11. Nxa8 {[%clk 0:02:47.7]} 11... Bb5 {[%clk 0:02:26.4]} 12. Qe3 {[%clk 0:02:41.3]} 12... g6 {[%clk 0:02:20.5]} 13. Bxb5 {[%clk 0:02:40.5]} 13... h5 {[%clk 0:02:17]} 14. Be2 {[%clk 0:02:37]} 14... Bh6 {[%clk 0:02:15.3]} 15. f4 {[%clk 0:02:34.3]} 15... exf4 {[%clk 0:02:13]} 16. Qd3 {[%clk 0:02:30.6]} 16... f3+ {[%clk 0:02:11.7]} 17. Kb1 {[%clk 0:02:30]} 17... fxg2 {[%clk 0:02:10.6]} 18. Nf3 {[%clk 0:02:04.9]} 18... gxh1=Q {[%clk 0:02:05.9]} 19. Rxh1 {[%clk 0:02:04.8]} 19... g5 {[%clk 0:02:00.6]} 20. Nb6 {[%clk 0:01:57.7]} 20... g4 {[%clk 0:01:59]} 21. Nh4 {[%clk 0:01:55.3]} 21... Qxh4 {[%clk 0:01:57.2]} 22. e5 {[%clk 0:01:52.3]} 22... Nd7 {[%clk 0:01:46.2]} 23. Nxd7 {[%clk 0:01:44.8]} 23... Kxd7 {[%clk 0:01:45]} 24. Qf5+ {[%clk 0:01:41.3]} 24... Kc7 {[%clk 0:01:42.7]} 25. a3 {[%clk 0:01:35.2]} 25... Re8 {[%clk 0:01:35.8]} 26. Qxf7+ {[%clk 0:01:33.9]} 26... Kd8 {[%clk 0:01:33.5]} 27. Rf1 {[%clk 0:01:24.6]} 27... Qe7 {[%clk 0:00:56.5]} 28. Qh7 {[%clk 0:01:20.2]} 28... Qxh7 {[%clk 0:00:54.9]} 29. exd6 {[%clk 0:01:17.3]} 29... Rxe2 {[%clk 0:00:52.5]} 30. Rc1 {[%clk 0:01:15.2]} 30... Qe4 {[%clk 0:00:48.9]} 31. Ka2 {[%clk 0:01:13.2]} 31... Re1 {[%clk 0:00:46]} 32. Ra1 {[%clk 0:01:11.2]} 32... Rxa1+ {[%clk 0:00:44.3]} 33. Kxa1 {[%clk 0:01:10.1]} 33... Qxd5 {[%clk 0:00:43.3]} 34. Kb1 {[%clk 0:01:09.3]} 34... Qxd6 {[%clk 0:00:42.4]} 35. c3 {[%clk 0:01:05.9]} 35... Qxh2 {[%clk 0:00:41.5]} 36. Ka2 {[%clk 0:01:04.3]} 36... g3 {[%clk 0:00:40.8]} 37. Kb3 {[%clk 0:01:02.9]} 37... g2 {[%clk 0:00:40.3]} 38. Kc4 {[%clk 0:01:01.8]} 38... g1=Q {[%clk 0:00:40.2]} 39. Kb3 {[%clk 0:00:58.8]} 39... Qc7 {[%clk 0:00:38.4]} 40. Kc4 {[%clk 0:00:56.5]} 40... Qa5 {[%clk 0:00:36.6]} 41. Kb3 {[%clk 0:00:55.4]} 41... Qb5+ {[%clk 0:00:35.4]} 42. Ka2 {[%clk 0:00:54.2]} 42... Qg2 {[%clk 0:00:34.2]} 43. a4 {[%clk 0:00:41.2]} 43... Qgxb2# {[%clk 0:00:34.1]} 0-1\n",
    expected: {
      white: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 6,
          positions: [
            {row: 3, col: 0},
            {row: 2, col: 2},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 2,
          positions: [],
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
            {row: 1, col: 0},
          ],
        }
      },
      black: {
        [Piece.PAWN]: {
          initial: 8,
          gained: 0,
          lost: 4,
          positions: [
            {row: 5, col: 0},
            {row: 6, col: 1},
            {row: 4, col: 2},
            {row: 4, col: 7},
          ],
        },
        [Piece.ROOK]: {
          initial: 2,
          gained: 0,
          lost: 2,
          positions: [],
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
            {row: 5, col: 7},
          ],
        },
        [Piece.QUEEN]: {
          initial: 1,
          gained: 2,
          lost: 1,
          positions: [
            {row: 4, col: 1},
            {row: 1, col: 1},
          ],
        },
        [Piece.KING]: {
          initial: 1,
          gained: 0,
          lost: 0,
          positions: [
            {row: 7, col: 3},
          ],
        }
      }
    }
  }
];

export { getGameAnalysisFromPgnTestInstances }

