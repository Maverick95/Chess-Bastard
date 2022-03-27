import React from 'react';

interface IProps {
  username: string;
}

const ErrorComponent: React.FC<IProps> = ({username}) => (
  <>
      <div>error loading</div>
      <div className="chess-detail-standout">{username}</div>
  </>
);

export default ErrorComponent;