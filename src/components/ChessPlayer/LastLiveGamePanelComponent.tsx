import Game from 'models/Game';
import React from 'react';

const getResultClass = (result: string): string => {
  if (result === 'win') {
      return 'win';
  }
  if (['repetition', 'stalemate', 'insufficient'].includes(result)) {
      return 'draw';
  }
  return 'lose';
};

interface IProps {
  lastLiveGame: Game,
  changeDetails: () => void,
}

const LastLiveGamePanelComponent: React.FC<IProps> = ({ lastLiveGame, changeDetails }) => {

  const { timeClass, result } = lastLiveGame;
  const resultClass = getResultClass(result);

  return (
      <div className="chess-player-content horizontal chess-player-flip" onClick={changeDetails}>
          <div className={`chess-result-marker ${resultClass}`} />
          <img {...{
              width: 100, height: 100,
              src: `./assets/${timeClass}.png`,
              alt: `Last Live Game played was type ${timeClass}`,
          }} />
          <div className={`chess-result-marker ${resultClass}`} />
      </div>
  );

};

export default LastLiveGamePanelComponent;