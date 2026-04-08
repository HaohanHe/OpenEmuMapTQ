import React from 'react';

interface NumericalReasoningProps {
  content: string;
  dataSheet: string;
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect?: (answer: string) => void;
}

export const NumericalReasoning: React.FC<NumericalReasoningProps> = ({
  content,
  dataSheet,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect
}) => {


  const handleSelect = (option: string) => {
    onSelect?.(option);
  };

  // 渲染数据表格
  const renderDataSheet = () => {
    // 简单的表格渲染逻辑，实际项目中可能需要更复杂的解析
    return (
      <div className="mb-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
        <div className="text-sm text-gray-200 whitespace-pre-wrap">
          {dataSheet}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 数据表格 */}
      {renderDataSheet()}

      {/* 问题 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-white">{content}</h3>

        {/* 选项 */}
        <div className="space-y-2">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
                    const isCorrect = selectedAnswer && option === correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${isSelected
                  ? isCorrect
                    ? 'bg-yellow-400/30 border-yellow-500 text-yellow-300'
                    : 'bg-error/20 border-error text-error'
                  : 'bg-gray-800/60 border-gray-700 hover:bg-gray-700'
                  }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isSelected
                    ? isCorrect
                      ? 'bg-yellow-500 text-white'
                      : 'bg-error text-white'
                    : 'border-2 border-gray-500'
                    }`}>
                    {isSelected && option.charAt(0)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NumericalReasoning;