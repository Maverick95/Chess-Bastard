import getGameAnalysisFromPGN from './GameAnalysisHelper';

describe('getGameAnalysisFromPGN', () => {

    it('returns correct result for valid example PGN', () => {

        // ARRANGE
        const pgn = "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2022.03.13\"]\n[Round \"-\"]\n[White \"NickEmmerson\"]\n[Black \"heavensmercy\"]\n[Result \"1-0\"]\n[CurrentPosition \"r1b2rk1/pppn1pQp/3p3B/8/3pP3/8/PPP2PPP/R3KB1R b KQ -\"]\n[Timezone \"UTC\"]\n[ECO \"C40\"]\n[ECOUrl \"https://www.chess.com/openings/Kings-Pawn-Opening-Kings-Knight-McConnell-Defense\"]\n[UTCDate \"2022.03.13\"]\n[UTCTime \"21:15:10\"]\n[WhiteElo \"456\"]\n[BlackElo \"461\"]\n[TimeControl \"300\"]\n[Termination \"NickEmmerson won by checkmate\"]\n[StartTime \"21:15:10\"]\n[EndDate \"2022.03.13\"]\n[EndTime \"21:17:43\"]\n[Link \"https://www.chess.com/game/live/40945152383\"]\n\n1. e4 {[%clk 0:05:00]} 1... e5 {[%clk 0:04:57.8]} 2. Nf3 {[%clk 0:04:56.7]} 2... Qf6 {[%clk 0:04:57.7]} 3. Nc3 {[%clk 0:04:50.5]} 3... Bc5 {[%clk 0:04:56.3]} 4. d4 {[%clk 0:04:46.3]} 4... Bxd4 {[%clk 0:04:51.4]} 5. Nxd4 {[%clk 0:04:44.5]} 5... exd4 {[%clk 0:04:51.3]} 6. Ne2 {[%clk 0:04:36.9]} 6... Nh6 {[%clk 0:04:43.6]} 7. Nf4 {[%clk 0:04:25]} 7... Ng4 {[%clk 0:04:38.9]} 8. Qxg4 {[%clk 0:04:20.7]} 8... O-O {[%clk 0:04:28]} 9. Nd5 {[%clk 0:04:11.1]} 9... d6 {[%clk 0:04:20.6]} 10. Nxf6+ {[%clk 0:04:06.6]} 10... Kh8 {[%clk 0:04:12.3]} 11. Qh4 {[%clk 0:03:49.8]} 11... gxf6 {[%clk 0:04:11.1]} 12. Qxf6+ {[%clk 0:03:45.8]} 12... Kg8 {[%clk 0:04:11]} 13. Bh6 {[%clk 0:03:31]} 13... Nd7 {[%clk 0:04:05.9]} 14. Qg7# {[%clk 0:03:28.4]} 1-0\n";

        // ACT
        const result = getGameAnalysisFromPGN(pgn);

        // ASSERT
        expect(result).toBeDefined();

    });

    /*
    it('returns correct result for incorrect example PGN', () => {


    });
    */

});