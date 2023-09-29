import React from 'react';

interface IProps {
  changeDetails: () => void,
}

const LastLiveGameCardComponent: React.FC<IProps> = ({ changeDetails }) => (
  <>
      <div onClick={changeDetails}>This is a test.</div>
  </>
);

export default LastLiveGameCardComponent;