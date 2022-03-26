import { parseGame } from '@mliebelt/pgn-parser';

const getGameAnalysisFromPGN = (pgn: string): any => {

    const result = parseGame(pgn);
    return result;

};

export default getGameAnalysisFromPGN;