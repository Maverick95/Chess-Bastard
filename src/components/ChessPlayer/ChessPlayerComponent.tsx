import React, { useState, useEffect } from 'react';
import Player from '../../models/Player';
import GetPlayerService from '../../services/GetPlayerService';

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

    // TODO - use project root to get image.
    const src = state.player?.avatar ?? '../src/assets/default_player.jpg';

    return (
        <img {...{src, alt: "Avatar here!"}} /> 
    );
};

export default ChessPlayerComponent;