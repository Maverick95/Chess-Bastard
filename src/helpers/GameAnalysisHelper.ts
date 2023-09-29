import { parseGame } from '@mliebelt/pgn-parser';
import { GameAnalysis, createDefaultGameAnalysis } from 'models/GameAnalysis';

const getGameAnalysisFromPGN = (pgn: string): GameAnalysis => {

    const tree = parseGame(pgn);
    const result = createDefaultGameAnalysis();
    return result;
};

export default getGameAnalysisFromPGN;