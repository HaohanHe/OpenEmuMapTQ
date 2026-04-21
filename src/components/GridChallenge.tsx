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
      return 'border-blue-500 bg-blue-50 scale-105';
    }
    
    if (isCorrect) {
      return 'border-green-500 bg-green-50 scale-105 ring-2 ring-green-400';
    }
    
    if (isWrong) {
      return 'border-red-500 bg-red-50 scale-105 ring-2 ring-red-400';
    }

    return 'border-transparent hover:bg-gray-200';
  };

  const gridSize = grid.length;

  return (
    <div className="flex flex-col items-center pt-8 w-full">
      {/* 题目说明 */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '演绎逻辑推理' : 'Deductive Logical Reasoning'}</h2>
        <p className="text-primary-300">{language === 'zh' ? '找出完成网格的形状。任何行或列中都没有重复的形状。' : 'Find the shape that completes the grid. No shape is repeated in any row or column.'}</p>
      </div>

      {/* 网格 */}
      <div className="bg-white p-4 sm:p-8 rounded-xl mb-8 relative z-10 w-[90%] max-w-md">
        <div className="flex justify-center">
          <div 
            className="grid gap-1.5" 
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rowIndex) => (
              row.map((shape, colIndex) => {
                const isTarget = rowIndex === missingPosition.row && colIndex === missingPosition.col;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-md ${
                      isTarget ? 'bg-[#e5e5e5]' : 'bg-[#e5e5e5]'
                    }`}
                  >
                    {isTarget ? (
                      <div className="text-3xl sm:text-4xl text-[#333333] font-normal">?</div>
                    ) : shape ? (
                      <Shape type={shape} size={48} color="#1a1a1a" />
                    ) : null}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>

      {/* 选项栏 - 全屏宽度 */}
      <div className="w-[100vw] ml-[calc(50%-50vw)] bg-[#1a1a1a] py-6 sm:py-8 mt-4 shadow-2xl z-20">
        <div className="flex justify-center gap-3 sm:gap-5 px-4">
          {options.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleSelect(shape)}
              className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-md border-4 transition-all duration-200 ${getButtonClass(shape)}`}
            >
              <Shape type={shape} size={40} color="#1a1a1a" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridChallenge;
