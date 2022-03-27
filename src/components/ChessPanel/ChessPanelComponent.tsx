import React, { useState, useMemo } from 'react';
import './ChessPanelComponent.css';
import ChessPlayerComponent from 'components/ChessPlayer/ChessPlayerComponent';
import { QueryClient, QueryClientProvider } from 'react-query';

type Unit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

type Range = {
    min: number,
    max: number,
};

interface Ranges {
    [unit: string]: Range
};

const ranges: Ranges = {
    'seconds': { min: 1, max: 59 },
    'minutes': { min: 1, max: 59 },
    'hours': { min: 1, max: 23 },
    'days': { min: 1, max: 6 },
    'weeks': { min: 1, max: 30 },
};

const users: string[] = [
    "cheezburgers",
    "jamescookpandp",
    "nickemmerson",
    "pasp86",
    "lapsedpacifist"
];

const queryClient = new QueryClient();

const getUnitValueInSeconds = (unit: Unit, value: number): number => {
    let result: number = 0;
    switch (unit) {
        case 'seconds':
            result = value;
            break;
        case 'minutes':
            result = 60 * value;
            break;
        case 'hours':
            result = 60 * 60 * value;
            break;
        case 'days':
            result = 24 * 60 * 60 * value;
            break;
        case 'weeks':
            result = 7 * 24 * 60 * 60 * value;
            break;
    }
    return result;
};

const ChessPanelComponent: React.FC = () => {

    const [unit, setUnit] = useState<Unit>('seconds');
    const [value, setValue] = useState<number>(1);

    const range = ranges[unit];

    const lastLiveGameSeconds = useMemo(() => getUnitValueInSeconds(unit, value), [unit, value]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="chess-panel">
                {
                    users.map((username: string) =>
                        <ChessPlayerComponent {...{ username, lastLiveGameSeconds }} key={`user-${username}`} />)
                }
                <div className="chess-time-selector">
                    <span>look for games within last</span>
                    <input type="number" {...range} value={value} onChange={(event) => { setValue(parseInt(event.target.value)); }} />
                    <select onChange={(event) => { setUnit(event.target.value as any); }}>
                        {Object.keys(ranges).map((value) => <option value={value}>{value}</option>)}
                    </select>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default ChessPanelComponent;