import React, { useMemo } from 'react';
import Game from 'models/Game';
import { GameAnalysis, Piece } from 'models/GameAnalysis';
import getGameAnalysisFromPgn from 'helpers/GameAnalysisHelper';

interface IProps {
  lastLiveGame: Game,
  changeDetails: () => void,
}

const getResultClass = (diff_white: number, diff_black: number, player: 'white' | 'black'): string => {
  const diff_player = player === 'white' ? diff_white : diff_black;
  const diff_opponent = player === 'white' ? diff_black : diff_white;
  if (diff_player > diff_opponent) {
      return 'chess-result-win';
  }
  if (diff_player === diff_opponent) {
      return 'chess-result-draw';
  }
  return 'chess-result-lose';
};

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

  if (gameAnalysis) {
    return (
      <div className="chess-lastgame-grid" onClick={changeDetails}>
        <div className="chess-lastgame-header-white"></div>
        <div className="chess-lastgame-header-black"></div>
        <div className="chess-lastgame-main">
          {
            pieces.map(piece => {
              const diff_white = gameAnalysis['white'][piece].gained - gameAnalysis['white'][piece].lost;
              const diff_black = gameAnalysis['black'][piece].gained - gameAnalysis['black'][piece].lost;
              const result_class = getResultClass(diff_white, diff_black, player);

              return (<>
                <img width="70" height="75" src={`./assets/${player}_${piece}.png`} alt={`${player} ${piece}`} />
                <span style={{verticalAlign: 'middle'}}>{diff_white}</span>
                <span>{diff_black}</span>
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