import React, { useMemo } from 'react';
import Game from 'models/Game';
import { GameAnalysis } from 'models/GameAnalysis';
import getGameAnalysisFromPgn from 'helpers/GameAnalysisHelper';

interface IProps {
  lastLiveGame: Game,
  changeDetails: () => void,
}

const LastLiveGameCardComponent: React.FC<IProps> = ({ lastLiveGame, changeDetails }) => {

  const { pgn } = lastLiveGame;
  const gameAnalysis: GameAnalysis = useMemo(() => {
    try {
      return getGameAnalysisFromPgn(pgn);
    }
    catch {
      return undefined;
    }
  }, [pgn]);

  if (gameAnalysis) {
    return (
      <div className="chess-lastgame-grid" onClick={changeDetails}>
        <div className="chess-lastgame-header-white"></div>
        <div className="chess-lastgame-header-black"></div>
        <div>Test</div>
      </div>
    );
  }
  
  return (
    <div>Sorry, no dice.</div>
    );
};

export default LastLiveGameCardComponent;