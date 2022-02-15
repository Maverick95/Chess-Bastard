import React, { useState, useEffect } from 'react';
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

    const sectionClassName = state.status === 'success' ? 'chess-player-card' : 'chess-player-card chess-centered'; 
    
    return (
        <section className={sectionClassName}>
            {
                state.status === 'loading' &&
                <LoadingComponent />
            }
            {
                state.status === 'error' &&
                <ErrorComponent username={username} />
            }
            {
                state.status === 'success' &&
                <SuccessComponent {...state.player} />
            }
        </section>
    );
};

export default ChessPlayerComponent;