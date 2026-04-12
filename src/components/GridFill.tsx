import React from 'react';
import Shape from './Shape';
import { useLanguageStore } from '@/store/languageStore';

interface GridFillProps {
  grid: (string | null)[][];
  missingPosition: { row: number; col: number };
  options: (string | null)[][][];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect?: (answer: string) => void;
}

export const GridFill: React.FC<GridFillProps> = ({
  grid,
  missingPosition,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect
}) => {
  const { language } = useLanguageStore();

  const handleSelect = (index: number) => {
    onSelect?.(index.toString());
  };

  const getButtonClass = (index: number) => {
    const isSelected = selectedAnswer === index.toString();
    const isCorrect = correctAnswer !== undefined && index.toString() === correctAnswer;
    const isWrong = correctAnswer !== undefined && isSelected && index.toString() !== correctAnswer;
    
    if (isSelected && correctAnswer === undefined) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    
    if (isCorrect) {
      return 'bg-success/20 border-success text-success shadow-[0_0_15px_rgba(16,185,129,0.3)]';
    }
    
    if (isWrong) {
      return 'bg-error/20 border-error text-error shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    }
    
    return 'bg-primary-800/40 border-primary-700';
  };

  const getShapeColor = (shape: string) => {
    switch (shape) {
      case 'circle': return '#7C3AED';
      case 'triangle': return '#10B981';
      case 'cross': return '#F59E0B';
      case 'star': return '#06B6D4';
      case 'diamond': return '#EC4899';
      case 'hexagon': return '#3B82F6';
      case 'square': return '#F97316';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="space-y-10">
      {/* 题目说明 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '归纳逻辑推理' : 'Inductive Logical Reasoning'}</h2>
        <p className="text-primary-300">{language === 'zh' ? '选择正确的网格来完成模式' : 'Select the correct grid to complete the pattern'}</p>
      </div>

      {/* 主网格 */}
      <div className="flex justify-center">
        <div className="bg-primary-800/30 p-6 rounded-2xl border border-primary-600">
          <div className="grid grid-cols-3 gap-4">
            {grid.map((row, rowIndex) => (
              row.map((shape, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg transition-all duration-300 ${
                    rowIndex === missingPosition.row && colIndex === missingPosition.col
                      ? 'border-dashed border-primary-400 bg-primary-800/20'
                      : 'border-primary-600 bg-primary-800/40'
                  }`}
                >
                  {rowIndex === missingPosition.row && colIndex === missingPosition.col ? (
                    <div className="text-4xl text-primary-400 font-bold">?</div>
                  ) : shape ? (
                    <Shape type={shape} size={40} color={getShapeColor(shape)} />
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
          <h3 className="text-lg font-semibold text-primary-300 mb-2">{language === 'zh' ? '选择正确的网格' : 'Select the correct grid'}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {options.map((optionGrid, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${getButtonClass(index)}`}
            >
              <div className="grid grid-cols-3 gap-1">
                {optionGrid.map((row, rowIndex) => (
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridFill;