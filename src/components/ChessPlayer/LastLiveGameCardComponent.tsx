import React, { useMemo } from 'react';
import Game from 'models/Game';
import { PieceAnalysis, GameAnalysis, Piece } from 'models/GameAnalysis';
import getGameAnalysisFromPgn from 'helpers/GameAnalysisHelper';
import TooltipComponent from 'components/Tooltip/TooltipComponent';
import 'components/Tooltip/TooltipComponent.css';

interface IProps {
  lastLiveGame: Game,
  changeDetails: () => void,
}

const getResultClass = (count_white: number, count_black: number, player: 'white' | 'black'): string => {
  const count_player = player === 'white' ? count_white : count_black;
  const count_opponent = player === 'white' ? count_black : count_white;
  if (count_player > count_opponent) {
      return 'chess-result-win';
  }
  if (count_player === count_opponent) {
      return 'chess-result-draw';
  }
  return 'chess-result-lose';
};

const getPiecesRemaining = (piece: PieceAnalysis): number => {
  const { initial, gained, lost } = piece;
  return initial + gained - lost;
}

const LastLiveGameCardComponent: React.FC<IProps> = ({ lastLiveGame, changeDetails }) => {

  const pieces: Piece[] = [
    Piece.PAWN,
    Piece.ROOK,
    Piece.KNIGHT,
    Piece.BISHOP,
    Piece.QUEEN,
  ];

  const { player, pgn } = lastLiveGame;
  const gameAnalysis: GameAnalysis = useMemo(() => {
    try {
      return getGameAnalysisFromPgn(pgn);
    }
    catch {
      return undefined;
    }
  }, [pgn]);

  const paragraphs = [
    'Column 1 : the colour this player was assigned',
    'Column 2 : how many white pieces left at game finish',
    'Column 3 : how many black pieces left at game finish',
  ];

  if (gameAnalysis) {
    return (
      <div className="chess-lastgame-grid chess-player-flip chess-tooltip-container" onClick={changeDetails}>
        <TooltipComponent paragraphs={paragraphs} />
        <div className="chess-lastgame-header-white"></div>
        <div className="chess-lastgame-header-black"></div>
        <div className="chess-lastgame-main chess-header-text">
          {
            pieces.map(piece => {
              const count_white = getPiecesRemaining(gameAnalysis['white'][piece]);
              const count_black = getPiecesRemaining(gameAnalysis['black'][piece]);
              const result_class = getResultClass(count_white, count_black, player);

              return (<>
                <img width="70" height="75" src={`./assets/${player}_${piece}.png`} alt={`${player} ${piece}`} />
                <span>{count_white}</span>
                <span>{count_black}</span>
                <span className={result_class} />
              </>);

            })
          }
        </div>
      </div>
    );
  }
  
  return (
    <div>Sorry, no dice.</div>
    );
};

export default LastLiveGameCardComponent;