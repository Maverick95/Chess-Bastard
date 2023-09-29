import { GameAnalysis } from 'models/GameAnalysis';
import getGameAnalysisFromPgn from './GameAnalysisHelper';
import { getGameAnalysisFromPgnTestInstances } from './GameAnalysisHelper.testdata';
describe('getGameAnalysisFromPgn', () => {

    it.each(getGameAnalysisFromPgnTestInstances.map(instance => [
        instance.url,
        instance.pgn,
        instance.expected,
    ]))('test GameAnalysis for game %s', (url: string, pgn: string, expected: GameAnalysis) => {
        // ACT
        const actual = getGameAnalysisFromPgn(pgn);
        // ASSERT
        expect(actual).toEqual(expected);
    });

});