import React from 'react';

interface ShapeProps {
  type: string;
  size?: number;
  color?: string;
}

export const Shape: React.FC<ShapeProps> = ({ type, size = 40, color = '#6366f1' }) => {
  const strokeColor = color;
  const fillColor = `${color}33`;

  switch (type) {
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 35,35 5,35" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle 
            cx="20" 
            cy="20" 
            r="15" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 23,15 34,15 25,22 28,33 20,26 12,33 15,22 6,15 17,15" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="17" y="8" 
            width="6" height="24" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
          <rect 
            x="8" y="17" 
            width="24" height="6" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 35,20 20,35 5,20" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 33,12 33,28 20,35 7,28 7,12" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="8" y="8" 
            width="24" height="24" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
    case 'x':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <line 
            x1="10" y1="10" 
            x2="30" y2="30" 
            stroke={strokeColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <line 
            x1="30" y1="10" 
            x2="10" y2="30" 
            stroke={strokeColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="8" y="8" 
            width="24" height="24" 
            fill={fillColor} 
            stroke={strokeColor} 
            strokeWidth="2" 
          />
        </svg>
      );
  }
};

export default Shape;
