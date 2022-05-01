import React from 'react';
import Game from 'models/Game';
import TooltipComponent from 'components/Tooltip/TooltipComponent';
import 'components/Tooltip/TooltipComponent.css';

const getResultClass = (result: string): string => {
  if (result === 'win') {
      return 'chess-result-win';
  }
  if (['repetition', 'stalemate', 'insufficient'].includes(result)) {
      return 'chess-result-draw';
  }
  return 'chess-result-lose';
};

interface IProps {
  lastLiveGame: Game,
  changeDetails: () => void,
}

const LastLiveGamePanelComponent: React.FC<IProps> = ({ lastLiveGame, changeDetails }) => {

  const { timeClass, result } = lastLiveGame;
  const paragraphs = [ `${timeClass} : ${result}`];
  const resultClass = getResultClass(result);
  
  return (
      <div className="chess-player-content horizontal chess-player-flip chess-tooltip-container" onClick={changeDetails}>
          <TooltipComponent paragraphs={paragraphs} />
          <div className={`chess-flashbulb chess-result-marker ${resultClass}`} />
          <img {...{
              className: 'chess-flashbulb',
              width: 100, height: 100,
              src: `./assets/${timeClass}.png`,
              alt: `Last Live Game played was type ${timeClass}`,
          }} />
          <div className={`chess-flashbulb chess-result-marker ${resultClass}`} />
      </div>
  );

};

export default LastLiveGamePanelComponent;