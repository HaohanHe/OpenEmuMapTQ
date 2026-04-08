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
    const isSelected = selectedAnswer === index;
    const isCorrect = index === oddOneOutIndex;
    
    if (selectedAnswer === undefined) {
      return 'bg-gray-800/60 border-gray-600 hover:bg-gray-700 hover:border-gray-500';
    }
    
    if (isCorrect) {
      return 'bg-yellow-400/30 border-yellow-500 text-yellow-300';
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-error/20 border-error text-error';
    }
    
    return 'bg-gray-800/40 border-gray-700';
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
      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-3">
          {allShapes.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${getButtonClass(index)}`}
            >
              <Shape type={shape} size={40} />
            </button>
          ))}
        </div>
      </div>

      {/* 数字标记 */}
      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-3 w-full max-w-2xl">
          {allShapes.map((_, index) => (
            <div key={index} className="text-center">
              <span className="text-xs text-gray-500">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScalesIx;
