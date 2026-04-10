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
    if (shape === selectedAnswer) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    return 'bg-primary-800/80 border-primary-600 hover:bg-primary-800';
  };

  const getShapeColor = (shape: string) => {
    switch (shape) {
      case 'circle': return '#7C3AED'; // Purple
      case 'triangle': return '#10B981'; // Green
      case 'cross': return '#F59E0B'; // Yellow/Orange
      case 'star': return '#06B6D4'; // Cyan
      case 'diamond': return '#EF4444'; // Red
      case 'hexagon': return '#3B82F6'; // Blue
      case 'square': return '#EC4899'; // Pink
      case 'x': return '#F97316'; // Orange
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="space-y-10">
      {/* 题目说明 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '演绎逻辑推理' : 'Deductive Logical Reasoning'}</h2>
        <p className="text-primary-300">{language === 'zh' ? '找出完成网格的形状。任何行或列中都没有重复的形状。' : 'Find the shape that completes the grid. No shape is repeated in any row or column.'}</p>
      </div>

      {/* 网格 */}
      <div className="flex justify-center">
        <div className="bg-primary-800/30 p-6 rounded-2xl border border-primary-600">
          <div className="grid grid-cols-4 gap-4">
            {grid.map((row, rowIndex) => (
              row.map((shape, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-20 h-20 flex items-center justify-center border-2 rounded-lg transition-all duration-300 ${
                    rowIndex === missingPosition.row && colIndex === missingPosition.col
                      ? 'border-dashed border-primary-400 bg-primary-800/20'
                      : 'border-primary-600 bg-primary-800/40'
                  }`}
                >
                  {rowIndex === missingPosition.row && colIndex === missingPosition.col ? (
                    <div className="text-4xl text-primary-400 font-bold">?</div>
                  ) : shape ? (
                    <Shape type={shape} size={50} color={getShapeColor(shape)} />
                  ) : null}
                </div>
              ))
            ))}
          </div>
        </div>
      </div>

      {/* 选项 */}
      <div className="mt-10">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-primary-300 mb-2">{language === 'zh' ? '选择正确的形状' : 'Select the correct shape'}</h3>
        </div>
        <div className="flex justify-center gap-6">
          {options.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleSelect(shape)}
              className={`p-5 rounded-xl border-3 transition-all duration-300 hover:scale-110 bg-primary-700/50 ${getButtonClass(shape)}`}
            >
              <Shape type={shape} size={55} color={getShapeColor(shape)} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridChallenge;
