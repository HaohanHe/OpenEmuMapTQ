import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Users, 
  MapPin, 
  Package, 
  Target, 
  Telescope,
  Info,
  Check,
  X,
  HelpCircle,
  Building,
  Heart
} from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';

interface VerbalReasoningProps {
  content: string;
  dataSheet: string;
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect: (answer: string) => void;
  isExamMode?: boolean;
}

export const VerbalReasoning: React.FC<VerbalReasoningProps> = ({
  content,
  dataSheet,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
  isExamMode = false
}) => {
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState(0);

  // 解析 dataSheet 为多个标签页
  const tabs = React.useMemo(() => {
    if (!dataSheet) return [];
    
    // 按两个换行符分割区块
    const sections = dataSheet.split(/\n\s*\n/);
    
    return sections.map((section) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      const contentLines = lines.slice(1);
      return { 
        title, 
        content: contentLines 
      };
    }).filter(tab => tab.title);
  }, [dataSheet]);

  // 根据标题返回对应的图标
  const getTabIcon = (title: string) => {
    if (title.includes('组织') || title.includes('结构')) return <Network className="w-6 h-6" />;
    if (title.includes('委员会') || title.includes('人员')) return <Users className="w-6 h-6" />;
    if (title.includes('基地') || title.includes('位置')) return <MapPin className="w-6 h-6" />;
    if (title.includes('产品') || title.includes('服务')) return <Package className="w-6 h-6" />;
    if (title.includes('目标') || title.includes('企业战略')) return <Target className="w-6 h-6" />;
    if (title.includes('战略') || title.includes('市场营销')) return <Telescope className="w-6 h-6" />;
    if (title.includes('公司')) return <Building className="w-6 h-6" />;
    if (title.includes('价值')) return <Heart className="w-6 h-6" />;
    return <Info className="w-6 h-6" />;
  };

  const getButtonClass = (option: string) => {
    const isSelected = option === selectedAnswer;
    const isCorrect = !isExamMode && correctAnswer !== undefined && option === correctAnswer;
    const isWrong = !isExamMode && correctAnswer !== undefined && isSelected && option !== correctAnswer;

    let baseClass = "flex-1 py-3 px-2 border-2 text-center transition-all duration-200 font-medium ";

    if (isSelected && correctAnswer === undefined) {
      return baseClass + 'border-gray-800 bg-gray-200 text-gray-900';
    }
    
    if (isCorrect) {
      return baseClass + 'border-green-600 bg-green-50 text-green-700';
    }
    
    if (isWrong) {
      return baseClass + 'border-red-600 bg-red-50 text-red-700';
    }

    return baseClass + 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400';
  };

  const getOptionIcon = (option: string) => {
    if (option.includes('正确')) return <Check className="w-4 h-4 mr-2 inline" />;
    if (option.includes('错误')) return <X className="w-4 h-4 mr-2 inline" />;
    if (option.includes('无法')) return <span className="mr-2 inline font-bold text-lg leading-none">□</span>;
    return null;
  };

  return (
    <div className="bg-[#f5f5f5] rounded-xl overflow-hidden shadow-lg w-full max-w-4xl mx-auto text-[#333333] flex flex-col font-sans">
      {/* 顶部标签栏 */}
      <div className="bg-white pt-6 pb-4 px-4 sm:px-8 border-b border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#333333] text-white border-[#333333] shadow-md scale-110' 
                    : 'bg-white text-[#555555] border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                title={tab.title}
              >
                {getTabIcon(tab.title)}
              </button>
            );
          })}
        </div>
        
        <h2 className="text-center text-xl font-bold text-[#333333] mt-2">
          {tabs[activeTab]?.title}
        </h2>
      </div>

      {/* 内容区域 */}
      <div className="bg-[#f5f5f5] px-6 sm:px-10 py-6 sm:py-8 min-h-[250px] max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {tabs[activeTab]?.content.map((line, idx) => {
            // 如果行内包含冒号，加粗冒号前的部分
            const colonIndex = line.indexOf('：');
            if (colonIndex !== -1) {
              const term = line.substring(0, colonIndex + 1);
              const desc = line.substring(colonIndex + 1);
              return (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-[#444444]">
                  <strong className="text-[#222222]">{term}</strong>{desc}
                </p>
              );
            }
            return (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-[#444444] font-medium">
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* 底部问题与选项区 */}
      <div className="bg-white border-t border-gray-200 px-6 sm:px-10 py-6 sm:py-8">
        <div className="mb-8">
          <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
            {content}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className={getButtonClass(option)}
            >
              <div className="flex items-center justify-center">
                {getOptionIcon(option)}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbalReasoning;