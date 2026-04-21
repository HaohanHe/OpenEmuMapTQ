import React from 'react';

interface ShapeProps {
  type: string;
  size?: number;
  color?: string;
}

export const Shape: React.FC<ShapeProps> = ({ type, size = 40, color = '#000000' }) => {
  const strokeColor = color;
  const fillColor = color;

  switch (type) {
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 35,33 5,33" 
            fill={fillColor} 
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
          />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 23,15 34,15 25,22 28,33 20,26 12,33 15,22 6,15 17,15" 
            fill={fillColor} 
          />
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="14" y="6" 
            width="12" height="28" 
            fill={fillColor} 
          />
          <rect 
            x="6" y="14" 
            width="28" height="12" 
            fill={fillColor} 
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 35,20 20,35 5,20" 
            fill={fillColor} 
          />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon 
            points="20,5 33,12 33,28 20,35 7,28 7,12" 
            fill={fillColor} 
          />
        </svg>
      );
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="7" y="7" 
            width="26" height="26" 
            fill={fillColor} 
          />
        </svg>
      );
    case 'x':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <line 
            x1="8" y1="8" 
            x2="32" y2="32" 
            stroke={strokeColor} 
            strokeWidth="6" 
            strokeLinecap="square" 
          />
          <line 
            x1="32" y1="8" 
            x2="8" y2="32" 
            stroke={strokeColor} 
            strokeWidth="6" 
            strokeLinecap="square" 
          />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect 
            x="7" y="7" 
            width="26" height="26" 
            fill={fillColor} 
          />
        </svg>
      );
  }
};

export default Shape;
