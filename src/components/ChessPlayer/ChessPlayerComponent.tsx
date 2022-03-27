import './ChessPlayerComponent.css';
import React, { useState } from 'react';
import GetPlayerService from 'services/GetPlayerService';
import { useQuery } from 'react-query';
import GetLastLiveGameService from 'services/GetLastLiveGameService';
import ChessPlayerDisplayType from 'models/ChessPlayerDisplayType';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';
import SuccessComponent from './SuccessComponent';
import LastLiveGameCardComponent from './LastLiveGameCardComponent';

interface IPropsUsername {
    username: string;
}

interface IPropsChangeDetails {
    changeDetails: () => void;
}


const ChessPlayerComponent: React.FC<IPropsUsername> = ({ username }) => {

    const lastLiveGameSeconds = 60 * 60;

    const [details, setDetails] = useState<ChessPlayerDisplayType>(ChessPlayerDisplayType.DISPLAY_PLAYER);

    const changeDetails = () => {
        if (details === ChessPlayerDisplayType.DISPLAY_PLAYER) {
            setDetails(ChessPlayerDisplayType.DISPLAY_RECENT_GAME);
        }
        else if (details === ChessPlayerDisplayType.DISPLAY_RECENT_GAME) {
            setDetails(ChessPlayerDisplayType.DISPLAY_PLAYER);
        }
    };

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

    const sectionClassNamePlayerPart1 = isSuccessPlayer ? 'chess-player-card' : 'chess-player-card chess-centered';
    const sectionClassNamePlayerPart2 = details === ChessPlayerDisplayType.DISPLAY_PLAYER ? 'chess-player-card-active' : 'chess-player-card-last-active';
    const sectionClassNamePlayer = `${sectionClassNamePlayerPart1} ${sectionClassNamePlayerPart2}`;

    const sectionClassNameLastLiveGamePart1 = 'chess-player-card';
    const sectionClassNameLastLiveGamePart2 = details === ChessPlayerDisplayType.DISPLAY_RECENT_GAME ? 'chess-player-card-active' : 'chess-player-card-last-active';
    const sectionClassNameLastLiveGame = `${sectionClassNameLastLiveGamePart1} ${sectionClassNameLastLiveGamePart2}`;
    
    return (
        <div className="chess-player">
            <div className="chess-player-pinned">
                <section id={`chess-player-card-${username}`} className={sectionClassNamePlayer}>
                    {isLoadingPlayer && <LoadingComponent />}
                    {isErrorPlayer && <ErrorComponent username={username} />}
                    {isSuccessPlayer && <SuccessComponent {...{ player, changeDetails }} />}
                </section>
                <section id={`chess-last-live-game-card-${username}`} className={sectionClassNameLastLiveGame}>
                    <LastLiveGameCardComponent {...{ changeDetails }} />
                </section>
            </div>
        </div>
    );
};

export default ChessPlayerComponent;