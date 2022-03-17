import React from 'react';
import Player from '../../models/Player';
import GetPlayerService from '../../services/GetPlayerService';
import './ChessPlayerComponent.css';
import { getDateTimeDifferenceDescription } from '../../helpers/DateTimeHelpers';
import { useQuery } from 'react-query';
import GetLastLiveGameService from '../../services/GetLastLiveGameService';

interface IProps {
    username: string;
}

interface IState {
    status: 'loading' | 'error' | 'success',
    player?: Player
}

const LoadingComponent: React.FC = () => (
    <div className="chess-player-avatar">
        <img className="chess-player-loading" {...{ width: 200, height: 200, src: './assets/loading.png', alt: 'Loading...' }} />
    </div>
);

const ErrorComponent: React.FC<IProps> = ({ username }) => (
    <>
        <div>error loading</div>
        <div className="chess-detail-standout">{username}</div>
    </>
);

const SuccessComponent: React.FC<Player> = ({ username, avatar, lastOnline, lastLiveGame }) => {



    avatar = avatar ?? "./assets/default_player.jpg";
    const { difference } = getDateTimeDifferenceDescription(lastOnline);

    return (
        <>
            <header className="chess-player-header chess-border-theme">
                {username}
            </header>
            <div className="chess-player-avatar">
                <img className="chess-border-theme" {...{ width: 200, height: 200, src: avatar, alt: `chess.com avatar for ${username}` }} />
            </div>
            <div className="chess-player-content">
                {
                    lastLiveGame ?
                    (
                        <>
                        <img {...{
                            width: 100, height: 100,
                            src: `./assets/${lastLiveGame.timeClass}.png`,
                            alt: `Last Live Game played was type ${lastLiveGame.timeClass}`,
                        } } />
                        </>
                    ) :
                    (
                        <>
                            <div>last seen</div>
                            <div className="chess-detail-standout">{difference}</div>
                        </>
                    )
                }
            </div>
        </>
    );

};

const ChessPlayerComponent: React.FC<IProps> = ({ username }) => {

    const lastLiveGameSeconds = 60 * 30;

    const {
        isError: isErrorPlayer,
        isLoading: isLoadingPlayer,
        isSuccess: isSuccessPlayer,
        data: player
    } = useQuery(
        `query-chess-player-${username}`,
        () => GetPlayerService(username),
        {
            refetchOnWindowFocus: false
        });

    const { data: lastLiveGame } = useQuery(
        `query-chess-last-live-game-${username}`,
        () => GetLastLiveGameService(username, lastLiveGameSeconds),
        {
            refetchInterval: 1000 * 30,
            refetchOnWindowFocus: false,
            enabled: isSuccessPlayer,
        });

    if (player && lastLiveGame) {
        player.lastLiveGame = lastLiveGame;
    }

    const sectionClassName = isSuccessPlayer ? 'chess-player-card' : 'chess-player-card chess-centered';

    return (
        <section className={sectionClassName}>
            {isLoadingPlayer && <LoadingComponent />}
            {isErrorPlayer && <ErrorComponent username={username} />}
            {isSuccessPlayer && <SuccessComponent {...player} />}
        </section>
    );
};

export default ChessPlayerComponent;