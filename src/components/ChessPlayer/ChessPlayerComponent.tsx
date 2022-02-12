import React, { useState, useEffect } from 'react';
import Player from '../../models/Player';
import GetPlayerService from '../../services/GetPlayerService';
import './ChessPlayerComponent.css';

interface IProps {
    username: string;
}

interface IState {
    status: 'loading' | 'error' | 'success',
    player?: Player
}

const ChessPlayerComponent: React.FC<IProps> = ({username}) => {

    const [state, setState] = useState<IState>({status: 'loading'});

    useEffect(() => {
        setState({status: 'loading'});
        const getData = async() => {
            try {
                const player = await GetPlayerService(username);
                setState({status: 'success', player});
            }
            catch {
                setState({status: 'error'});
            }
        };
        getData();
    }, [username]);

    const avatarDefault = "./assets/default_player.jpg";
    const src = state.player?.avatar ?? avatarDefault;

    return (
        <section className="chess-player-card">
            <header className="chess-player-header chess-border-theme">
                {username}
            </header>
            <div className="chess-player-avatar">
                <img className="chess-border-theme" {...{ width: 200, height: 200, src, alt: `Avatar for ${username}`}} />
            </div>
            <div className="chess-player-content">
                <div>last seen</div>
                <div className="chess-player-last-seen">27 days ago</div>
            </div>
        </section>
    );
};

export default ChessPlayerComponent;