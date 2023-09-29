import React from 'react';
import './TooltipComponent.css';

interface IProps {
  paragraphs: string[],
};

const TooltipComponent: React.FC<IProps> = ({paragraphs}) => (
  <div className="chess-tooltip">
    {paragraphs.map((value) => <p>{value}</p>)}
  </div>
);

export default TooltipComponent;