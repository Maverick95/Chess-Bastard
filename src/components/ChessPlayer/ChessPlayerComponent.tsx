import React, { useState } from 'react';
import Player from 'models/Player';
import GetPlayerService from 'services/GetPlayerService';
import './ChessPlayerComponent.css';
import { getDateTimeDifferenceDescription } from 'helpers/DateTimeHelpers';
import { useQuery } from 'react-query';
import GetLastLiveGameService from 'services/GetLastLiveGameService';
import Game from 'models/Game';
import ChessPlayerDisplayType from 'models/ChessPlayerDisplayType';

interface IProps {
    username: string;
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
            {
                lastLiveGame ?
                    <LastLiveGamePanelComponent {...lastLiveGame} key={lastLiveGame.uuid} />
                    :
                    <div className="chess-player-content vertical">
                        <div>last seen</div>
                        <div className="chess-time-difference">{difference}</div>
                    </div>
            }
        </>
    );

};

const getResultClass = (result: string): string => {
    if (result === 'win') {
        return 'win';
    }
    if (['repetition', 'stalemate', 'insufficient'].includes(result)) {
        return 'draw';
    }
    return 'lose';
};

const LastLiveGamePanelComponent: React.FC<Game> = ({ timeClass, result }) => {

    const resultClass = getResultClass(result);

    return (
    <div className="chess-player-content horizontal">
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

const ChessPlayerComponent: React.FC<IProps> = ({ username }) => {

    const lastLiveGameSeconds = 60 * 60;

    //const [details, setDetails] = useState

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