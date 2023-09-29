import React, { useState, useEffect } from 'react';
import Player from '../../models/Player';
import GetPlayerService from '../../services/GetPlayerService';
import './ChessPlayerComponent.css';
import { getDateTimeDifferenceDescription } from '../../helpers/DateTimeHelpers';
import { useQuery } from 'react-query';

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

const ErrorComponent: React.FC<IProps>= ({username}) => (
    <>
        <div>error loading</div>
        <div className="chess-detail-standout">{username}</div>
    </>
);

const SuccessComponent: React.FC<Player> = ({ username, avatar, lastOnline }) => {

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
            <div>last seen</div>
            <div className="chess-detail-standout">{difference}</div>
        </div>
    </>
    );

};

const ChessPlayerComponent: React.FC<IProps> = ({ username }) => {

    const {
        isError,
        isLoading,
        isSuccess,
        data } = useQuery(
            `query-chess-player-${username}`,
            () => GetPlayerService(username),
            {
                refetchOnWindowFocus: false
            });

    const sectionClassName = isSuccess ? 'chess-player-card' : 'chess-player-card chess-centered'; 
    
    return (
        <section className={sectionClassName}>
            { isLoading && <LoadingComponent /> }
            { isError && <ErrorComponent username={username} /> }
            { isSuccess && <SuccessComponent {...data} /> }
        </section>
    );
};

export default ChessPlayerComponent;