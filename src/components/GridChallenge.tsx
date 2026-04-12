import React from 'react';
import Shape from './Shape';
import { useLanguageStore } from '@/store/languageStore';

interface GridChallengeProps {
  grid: (string | null)[][];
  missingPosition: { row: number; col: number };
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect?: (answer: string) => void;
}

export const GridChallenge: React.FC<GridChallengeProps> = ({
  grid,
  missingPosition,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect
}) => {
  const { language } = useLanguageStore();
  const handleSelect = (shape: string) => {
    onSelect?.(shape);
  };

  const getButtonClass = (shape: string) => {
    const isSelected = shape === selectedAnswer;
    const isCorrect = correctAnswer !== undefined && shape === correctAnswer;
    const isWrong = correctAnswer !== undefined && isSelected && shape !== correctAnswer;

    if (isSelected && correctAnswer === undefined) {
      return 'border-blue-500 bg-blue-50 scale-105 shadow-md';
    }
    
    if (isCorrect) {
      return 'border-green-500 bg-green-50 scale-105 shadow-md ring-2 ring-green-400';
    }
    
    if (isWrong) {
      return 'border-red-500 bg-red-50 scale-105 shadow-md ring-2 ring-red-400';
    }

    return 'border-transparent hover:bg-gray-50 hover:scale-105';
  };

  const getShapeColor = (shape: string) => {
    switch (shape) {
      case 'circle': return '#A855F7'; // Purple
      case 'triangle': return '#84CC16'; // Green
      case 'cross': return '#F97316'; // Orange
      case 'star': return '#06B6D4'; // Cyan
      case 'square': return '#EC4899'; // Pink/Magenta
      case 'diamond': return '#EF4444'; // Red
      case 'hexagon': return '#3B82F6'; // Blue
      case 'x': return '#EAB308'; // Yellow
      default: return '#FFFFFF';
    }
  };

  const gridSize = grid.length;

  return (
    <div className="space-y-10">
      {/* 题目说明 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '演绎逻辑推理' : 'Deductive Logical Reasoning'}</h2>
        <p className="text-primary-300">{language === 'zh' ? '找出完成网格的形状。任何行或列中都没有重复的形状。' : 'Find the shape that completes the grid. No shape is repeated in any row or column.'}</p>
      </div>

      {/* 网格 */}
      <div className="flex justify-center">
        <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-md">
          <div 
            className="grid gap-1 bg-gray-200 p-1" 
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rowIndex) => (
              row.map((shape, colIndex) => {
                const isTarget = rowIndex === missingPosition.row && colIndex === missingPosition.col;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white ${
                      isTarget ? 'bg-gray-100' : ''
                    }`}
                  >
                    {isTarget ? (
                      <div className="text-3xl text-gray-700 font-medium">?</div>
                    ) : shape ? (
                      <Shape type={shape} size={36} color={getShapeColor(shape)} />
                    ) : null}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>

      {/* 选项 */}
      <div className="mt-10">
        <div className="flex justify-center">
          <div className="bg-[#a8c7c9] p-2 rounded-lg shadow-inner">
            <div className="flex bg-white rounded gap-2 sm:gap-4 p-2">
              {options.map((shape, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(shape)}
                  className={`p-3 sm:p-4 rounded border-2 transition-all duration-200 ${getButtonClass(shape)}`}
                >
                  <Shape type={shape} size={40} color={getShapeColor(shape)} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridChallenge;
