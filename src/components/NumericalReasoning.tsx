import React, { useState, useEffect } from 'react';

interface NumericalReasoningProps {
  content: string;
  dataSheet: string;
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect?: (answer: string) => void;
}

// 解析带有 [TAB:Tab名称] 标记的数据
const parseTabsData = (dataSheet: string) => {
  const tabs: { name: string, content: string }[] = [];
  const parts = dataSheet.split(/\[TAB:(.*?)\]\n/);
  
  // 如果没有找到 TAB 标记，就当成单一数据页
  if (parts.length <= 1) {
    return [{ name: 'Data', content: dataSheet }];
  }

  // parts[0] 通常是空的，然后是 name, content 交替出现
  for (let i = 1; i < parts.length; i += 2) {
    tabs.push({
      name: parts[i],
      content: parts[i + 1].trim()
    });
  }
  
  return tabs;
};

export const NumericalReasoning: React.FC<NumericalReasoningProps> = ({
  content,
  dataSheet,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = parseTabsData(dataSheet);

  // 当题目切换时（dataSheet改变），重置选中的Tab
  useEffect(() => {
    setActiveTab(0);
  }, [dataSheet]);

  const handleSelect = (option: string) => {
    onSelect?.(option);
  };

  const renderContent = (tabContent: string) => {
    // 检查是否包含表格标记
    if (tabContent.includes('[TABLE]')) {
      const tableLines = tabContent.replace('[TABLE]', '').trim().split('\n');
      return (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {tableLines.map((row, rowIndex) => {
                if (!row.trim()) return null;
                // 有些附加信息可能不包含 "|"
                if (!row.includes('|')) {
                  return (
                    <tr key={rowIndex}>
                      <td colSpan={10} className="py-2 px-4 text-left text-primary-300 italic text-xs">
                        {row.trim()}
                      </td>
                    </tr>
                  );
                }
                const cells = row.split('|').map(cell => cell.trim());
                return (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'border-b-2 border-primary-500 bg-primary-800/80' : 'border-b border-primary-700/50 hover:bg-primary-800/30 transition-colors'}>
                    {cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`py-3 px-4 ${cellIndex === 0 ? 'text-left font-medium text-primary-200' : 'text-right'}`}>
                        <span className={rowIndex === 0 ? 'font-bold text-primary-100' : 'text-primary-200 font-mono'}>
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
      <div className="text-sm text-primary-200 whitespace-pre-wrap leading-relaxed">
        {tabContent}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 多标签页 UI */}
      <div className="bg-primary-900/50 rounded-xl border border-primary-700 overflow-hidden shadow-lg shadow-primary-900/20">
        {tabs.length > 1 && (
          <div className="flex overflow-x-auto hide-scrollbar border-b border-primary-700 bg-primary-900/80">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === index 
                    ? 'border-blue-400 text-blue-300 bg-blue-900/20' 
                    : 'border-transparent text-primary-400 hover:text-primary-200 hover:bg-primary-800/50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="p-6 bg-primary-800/40 min-h-[300px] flex flex-col justify-center">
          {renderContent(tabs[activeTab].content)}
        </div>
      </div>

      {/* 问题区域 */}
      <div className="p-6 bg-primary-800/60 rounded-xl border border-primary-600 shadow-md">
        <div className="mb-6 flex items-start">
          <div className="bg-blue-500/20 p-2 rounded-lg mr-4 mt-1 border border-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white leading-snug">{content}</h3>
        </div>

        {/* 选项 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = selectedAnswer && option === correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center font-medium text-lg ${isSelected
                  ? isCorrect
                    ? 'bg-success/20 border-success text-success shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-error/20 border-error text-error shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-primary-700/50 border-primary-600 text-primary-200 hover:bg-primary-700 hover:border-primary-400 hover:text-white'
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NumericalReasoning;