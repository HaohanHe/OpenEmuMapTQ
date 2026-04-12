import React from 'react';
import Shape from './Shape';
import { useLanguageStore } from '@/store/languageStore';

interface ScalesIxProps {
  allShapes: string[];
  oddOneOutIndex: number;
  selectedAnswer?: number;
  onSelect?: (index: number) => void;
}

export const ScalesIx: React.FC<ScalesIxProps> = ({
  allShapes,
  oddOneOutIndex,
  selectedAnswer,
  onSelect
}) => {
  const { language } = useLanguageStore();

  const handleSelect = (index: number) => {
    onSelect?.(index);
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswer === index) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    return 'bg-gray-800/60 border-gray-600 hover:bg-gray-700 hover:border-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* 题目说明 */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-300">
          {language === 'zh' 
            ? '观察下面的图形，找出不符合规则的那一个' 
            : 'Look at the figures below and find the one that does not fit the pattern'}
        </p>
      </div>

      {/* 9个图形网格 */}
      <div className="flex justify-center w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex flex-nowrap gap-2 sm:gap-3 px-2 min-w-max">
          {allShapes.map((shape, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleSelect(index)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${getButtonClass(index)}`}
              >
                <Shape type={shape} size={32} />
              </button>
              <span className="text-xs text-gray-500 font-mono">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScalesIx;
