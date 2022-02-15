import React from 'react';
import ChessPlayerComponent from '../ChessPlayer/ChessPlayerComponent';

const users: string[] = [
    "cheezburgers",
    "jamescookpandp",
    "nickemmerson",
    "pasp86",
    "lapsedpacifist" 
];

const ChessPanelComponent: React.FC = () => (
    <div className="chess-panel">
        {
            users.map((user: string) =>
                    <ChessPlayerComponent username={user} key={`user-${user}`} />)
        }
    </div>
);

export default ChessPanelComponent;