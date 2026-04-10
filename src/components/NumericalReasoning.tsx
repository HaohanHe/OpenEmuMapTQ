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

  // 渲染数据表格或图表
  const renderDataSheet = () => {
    // 检查是否包含图表标记
    if (dataSheet.includes('[CHART]')) {
      return (
        <div className="mb-8 p-6 bg-primary-800/60 rounded-xl border border-primary-700">
          <div className="text-center">
            <div className="w-64 h-48 bg-primary-700/40 rounded-lg flex items-center justify-center mb-4">
              <div className="text-primary-300">图表区域</div>
            </div>
            <p className="text-sm text-primary-300">{dataSheet.replace('[CHART]', '').trim()}</p>
          </div>
        </div>
      );
    }
    
    // 检查是否包含表格标记
    if (dataSheet.includes('[TABLE]')) {
      return (
        <div className="mb-8 p-6 bg-primary-800/60 rounded-xl border border-primary-700 overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {dataSheet.replace('[TABLE]', '').trim().split('\n').map((row, rowIndex) => {
                if (!row.trim()) return null;
                const cells = row.split('|').map(cell => cell.trim());
                return (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'border-b border-primary-600' : ''}>
                    {cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-4 text-left">
                        <span className={rowIndex === 0 ? 'font-semibold text-primary-300' : 'text-primary-200'}>
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    
    // 默认文本形式
    return (
      <div className="mb-6 p-4 bg-primary-800/60 rounded-lg border border-primary-700">
        <div className="text-sm text-primary-200 whitespace-pre-wrap">
          {dataSheet}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 数据表格或图表 */}
      {renderDataSheet()}

      {/* 问题 */}
      <div className="p-6 bg-primary-800/40 rounded-xl border border-primary-700">
        <h3 className="text-lg font-semibold mb-6 text-white">{content}</h3>

        {/* 选项 */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = selectedAnswer && option === correctAnswer;
            const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${isSelected
                  ? isCorrect
                    ? 'bg-yellow-400/30 border-yellow-500 text-yellow-300'
                    : 'bg-error/20 border-error text-error'
                  : 'bg-primary-800/60 border-primary-600 hover:bg-primary-800 hover:border-primary-500'
                  }`}
              >
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${isSelected
                    ? isCorrect
                      ? 'bg-yellow-500 text-white'
                      : 'bg-error text-white'
                    : 'border-2 border-primary-500 text-primary-300'
                    }`}>
                    {optionLabel}
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