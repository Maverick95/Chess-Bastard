import React from 'react';
import ReactDOM from 'react-dom';
import ChessPlayerComponent from './src/components/ChessPlayer/ChessPlayerComponent';

const root = document.getElementById('root');

ReactDOM.render((
<>
    <div style={{display: 'flex'}}>
        <ChessPlayerComponent username="cheezburgers" />
        <ChessPlayerComponent username="jamescookpandp" />
        <ChessPlayerComponent username="nickemmerson" />
        <ChessPlayerComponent username="pasp86" />
        <ChessPlayerComponent username="lapsedpacifist" />
    </div>
</>
) ,root);
