import React from 'react';
import ChessPlayerComponent from 'components/ChessPlayer/ChessPlayerComponent';
import { QueryClient, QueryClientProvider } from 'react-query'

const users: string[] = [
    "cheezburgers",
    "jamescookpandp",
    "nickemmerson",
    "pasp86",
    "lapsedpacifist"
];

const queryClient = new QueryClient();

const ChessPanelComponent: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <div className="chess-panel">
            {
                users.map((user: string) =>
                    <ChessPlayerComponent username={user} key={`user-${user}`} />)
            }
        </div>
    </QueryClientProvider>
);

export default ChessPanelComponent;