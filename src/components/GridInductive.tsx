import React, { useState, useEffect } from 'react';
import { Shape } from './Shape';
import { useLanguageStore } from '@/store/languageStore';

export interface GridInductiveProps {
  exampleGrids: (string | null)[][][];
  questionGrids: (string | null)[][][];
  correctAnswer?: string;
  selectedAnswer?: string;
  onSelect?: (answer: string) => void;
}

export const GridInductive: React.FC<GridInductiveProps> = ({
  exampleGrids,
  questionGrids,
  correctAnswer,
  selectedAnswer,
  onSelect
}) => {
  const { language } = useLanguageStore();
  const [selectedGrids, setSelectedGrids] = useState<number[]>([]);

  useEffect(() => {
    if (selectedAnswer) {
      setSelectedGrids(selectedAnswer.split(',').map(Number));
    }
  }, [selectedAnswer]);

  const handleGridClick = (index: number) => {
    let newSelected: number[];
    if (selectedGrids.includes(index)) {
      newSelected = selectedGrids.filter(i => i !== index);
    } else {
      if (selectedGrids.length >= 2) {
        newSelected = [selectedGrids[1], index];
      } else {
        newSelected = [...selectedGrids, index];
      }
    }
    setSelectedGrids(newSelected);
    
    if (newSelected.length === 2) {
      const answer = newSelected.sort((a, b) => a - b).join(',');
      onSelect?.(answer);
    } else {
      onSelect?.('');
    }
  };

  const getGridClass = (index: number) => {
    const isSelected = selectedGrids.includes(index);
    let isCorrect = false;
    let isWrong = false;

    if (correctAnswer && selectedAnswer) {
      const correctIndices = correctAnswer.split(',').map(Number);
      if (correctIndices.includes(index)) {
        isCorrect = true;
      }
      if (isSelected && !correctIndices.includes(index)) {
        isWrong = true;
      }
    }

    if (isSelected && (!correctAnswer || !selectedAnswer)) {
      return 'border-blue-400 bg-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]';
    }

    if (isCorrect) {
      return 'border-success bg-success/20 text-success shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    }

    if (isWrong) {
      return 'border-error bg-error/20 text-error shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    }

    return 'border-gray-600 bg-gray-800/60 hover:bg-gray-700/80 transition-colors';
  };

  const getShapeColor = (shape: string) => {
    switch (shape) {
      case 'circle': return '#EF4444';
      case 'square': return '#10B981';
      case 'triangle': return '#3B82F6';
      case 'cross': return '#F59E0B';
      case 'star': return '#8B5CF6';
      default: return '#FFFFFF';
    }
  };

  const renderGrid = (grid: (string | null)[][], gridIndex: number | null = null, isExample: boolean = false) => {
    const index = gridIndex || 0;
    const isSelected = gridIndex !== null && selectedGrids.includes(gridIndex);
    const hasSelection = gridIndex !== null;

    let isCorrect = false;
    let isWrong = false;
    if (correctAnswer && selectedAnswer && gridIndex !== null) {
      const correctIndices = correctAnswer.split(',').map(Number);
      if (correctIndices.includes(index)) {
        isCorrect = true;
      }
      if (isSelected && !correctIndices.includes(index)) {
        isWrong = true;
      }
    }
    
    return (
      <div 
        key={gridIndex || 'example'}
        onClick={() => !isExample && handleGridClick(index)}
        className={`p-2 rounded-xl border-2 transition-all duration-300 ${
          isExample 
            ? 'border-gray-600 bg-gray-800/40' 
            : `cursor-pointer ${getGridClass(index)}`
        }`}
      >
        {hasSelection && (
          <div className="flex items-center mb-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isSelected && (!correctAnswer || !selectedAnswer)
                ? 'bg-blue-500 text-white' 
                : isCorrect 
                  ? 'bg-success text-white'
                  : isWrong 
                    ? 'bg-error text-white'
                    : 'bg-gray-700 text-gray-300'
            }`}>
              {index}
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-1">
          {grid.map((row, rowIndex) => (
            row.map((shape, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5"
              >
                {shape && (
                  <Shape 
                    type={shape} 
                    size={20} 
                    color={getShapeColor(shape)}
                  />
                )}
              </div>
            ))
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
        {/* 示例网格 */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-300 mb-3">
            {language === 'zh' ? '这两个网格遵循同一规律' : 'These two grids follow a rule'}
          </div>
          <div className="space-y-3">
            {exampleGrids.map((grid, index) => (
              <div key={index}>
                {renderGrid(grid, null, true)}
              </div>
            ))}
          </div>
        </div>

        {/* 问题网格 */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-300 mb-3">
            {language === 'zh' ? '以下哪两个网格遵循相同的规律？' : 'Which two of these grids follow the same rule?'}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {questionGrids.map((grid, index) => (
              <div key={index}>
                {renderGrid(grid, index + 1, false)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 选择提示 */}
      <div className="text-center mt-4">
        <p className="text-primary-300 text-sm font-medium">
          {selectedGrids.length === 0 && (language === 'zh' ? '请选择两个网格' : 'Please select two grids')}
          {selectedGrids.length === 1 && (language === 'zh' ? '请再选择一个网格' : 'Please select one more grid')}
          {selectedGrids.length === 2 && (language === 'zh' ? '选择完成' : 'Selection complete')}
        </p>
      </div>
    </div>
  );
};

export default GridInductive;
