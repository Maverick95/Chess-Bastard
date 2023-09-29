import React, { useState, useEffect, useMemo } from 'react';
import Player from '../../models/Player';
import GetPlayerService from '../../services/GetPlayerService';
import './ChessPlayerComponent.css';
import { getDateTimeDifferenceDescription } from '../../helpers/DateTimeHelpers';

interface IProps {
    username: string;
}

interface IState {
    status: 'loading' | 'error' | 'success',
    player?: Player
}

const LoadingComponent: React.FC = () => (
    <section className="chess-player-card chess-centered">
        <div className="chess-player-avatar">
            <img className="chess-player-loading" {...{ width: 200, height: 200, src: './assets/loading.png', alt: 'Loading...' }} />
        </div>
    </section>
);


const ErrorComponent: React.FC<IProps>= ({username}) => (
    <section className="chess-player-card chess-centered">
        <div>error loading</div>
        <div className="chess-detail-standout">{username}</div>
    </section>
);

const SuccessComponent: React.FC<Player> = ({ username, avatar, lastOnline }) => {

    avatar = avatar ?? "./assets/default_player.jpg";
    const { difference } = getDateTimeDifferenceDescription(lastOnline);

    return (
    <section className="chess-player-card">
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
    </section>
    );

};

const ChessPlayerComponent: React.FC<IProps> = ({ username }) => {

    const [state, setState] = useState<IState>({ status: 'loading' });

    useEffect(() => {
        setState({ status: 'loading' });
        const getData = async () => {
            try {
                const player = await GetPlayerService(username);
                setState({ status: 'success', player });
            }
            catch {
                setState({ status: 'error' });
            }
        };
        getData();
    }, [username]);

    if (state.status === 'loading') {
        return <LoadingComponent />;
    }
    if (state.status === 'error') {
        return <ErrorComponent username={username} />;
    }

    return <SuccessComponent {...state.player} />;
};

export default ChessPlayerComponent;