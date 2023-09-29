import React from 'react';
import { getDateTimeDifferenceDescription } from 'helpers/DateTimeHelpers';
import Player from 'models/Player';
import LastLiveGamePanelComponent from './LastLiveGamePanelComponent';

interface IProps {
  player: Player,
  changeDetails: () => void,
}

const SuccessComponent: React.FC<IProps> = ({ player, changeDetails }) => {

  const { username, avatar, lastOnline, lastLiveGame } = player;
  const avatarDefault = "./assets/default_player.jpg";  
  const { difference } = getDateTimeDifferenceDescription(lastOnline);

  return (
      <>
          <header className="chess-player-header chess-border-theme">
              {username}
          </header>
          <div className="chess-player-avatar">
              <img className="chess-border-theme" width="200" height="200" src={avatar ?? avatarDefault} alt={`chess.com avatar for ${username}`} />
          </div>
          {
              lastLiveGame ?
                  <LastLiveGamePanelComponent {...{ lastLiveGame, changeDetails }} key={lastLiveGame.uuid} />
                  :
                  <div className="chess-player-content vertical">
                      <div>last seen</div>
                      <div className="chess-time-difference">{difference}</div>
                  </div>
          }
      </>
  );

};

export default SuccessComponent;