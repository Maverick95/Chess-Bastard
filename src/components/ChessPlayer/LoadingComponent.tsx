import React from 'react';

const LoadingComponent: React.FC = () => (
  <div className="chess-player-avatar">
      <img className="chess-player-loading" {...{ width: 200, height: 200, src: './assets/loading.png', alt: 'Loading...' }} />
  </div>
);

export default LoadingComponent;