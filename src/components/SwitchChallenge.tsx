import React, { useState } from 'react';
import Shape from './Shape';
import { useLanguageStore } from '@/store/languageStore';


interface SwitchChallengeProps {
  inputShapes: string[];
  outputShapes: string[];
  options: string[];
  selectedAnswer?: string;
  correctAnswer?: string;
  onSelect?: (answer: string) => void;
  intermediateShapes?: string[];
  firstCodeOptions?: string[];
  secondCodeOptions?: string[];
  isMultiStep?: boolean;
}

export const SwitchChallengeComponent: React.FC<SwitchChallengeProps> = ({
  inputShapes,
  outputShapes,
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
  intermediateShapes,
  firstCodeOptions,
  secondCodeOptions,
  isMultiStep
}) => {
  const { language } = useLanguageStore();
  const [selectedFirstCode, setSelectedFirstCode] = useState<string>('');
  const [selectedSecondCode, setSelectedSecondCode] = useState<string>('');

  const handleSelect = (option: string) => {
    if (isMultiStep) {
      return;
    }
    onSelect?.(option);
  };

  const handleFirstCodeSelect = (code: string) => {
    setSelectedFirstCode(code);
    checkAndSubmit(code, selectedSecondCode);
  };

  const handleSecondCodeSelect = (code: string) => {
    setSelectedSecondCode(code);
    checkAndSubmit(selectedFirstCode, code);
  };

  const checkAndSubmit = (first: string, second: string) => {
    if (first && second) {
      const combinedAnswer = `${first}-${second}`;
      onSelect?.(combinedAnswer);
    }
  };

  const getButtonClass = (option: string) => {
    if (option === selectedAnswer) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    return 'bg-gray-800/60 border-gray-700 hover:bg-gray-700';
  };

  const getFirstCodeClass = (option: string) => {
    if (option === selectedFirstCode) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    return 'bg-gray-800/60 border-gray-700 hover:bg-gray-700';
  };

  const getSecondCodeClass = (option: string) => {
    if (option === selectedSecondCode) {
      return 'bg-blue-500/30 border-blue-400 text-blue-300';
    }
    return 'bg-gray-800/60 border-gray-700 hover:bg-gray-700';
  };

  const getShapeColor = (shape: string) => {
    switch (shape) {
      case 'circle': return '#EF4444'; // Red
      case 'triangle': return '#3B82F6'; // Blue
      case 'cross': return '#F59E0B'; // Yellow/Orange
      case 'star': return '#8B5CF6'; // Purple
      case 'diamond': return '#10B981'; // Green
      case 'hexagon': return '#EC4899'; // Pink
      case 'square': return '#06B6D4'; // Cyan
      case 'x': return '#F97316'; // Orange
      default: return '#FFFFFF';
    }
  };

  if (isMultiStep && firstCodeOptions && secondCodeOptions) {
    return (
      <div className="space-y-6">
        {/* 题目说明 */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '演绎逻辑推理' : 'Deductive Logical Reasoning'}</h2>
          <p className="text-gray-300">{language === 'zh' ? '找到两个正确的代码 - 第一个代码改变输入，第二个代码将结果改变为输出' : 'Find the two correct codes - the first code changes the input, the second changes the result to the output'}</p>
        </div>

        {/* 多级操作符布局 */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* 输入 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-3 bg-gray-800/40 p-4 rounded-xl border-2 border-gray-600">
              {inputShapes.map((shape, index) => (
                <div key={index} className="w-14 h-14 bg-gray-700/60 rounded-lg flex items-center justify-center border-2 border-gray-500">
                  <Shape type={shape} size={32} color={getShapeColor(shape)} />
                </div>
              ))}
            </div>
          </div>

          {/* 漏斗箭头 */}
          <div className="text-gray-400">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-600 clip-funnel"></div>
            </div>
          </div>

          {/* 第一行操作符 */}
          <div className="flex items-center gap-3">
            {firstCodeOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleFirstCodeSelect(option)}
                className={`w-24 h-10 rounded-lg border-2 transition-all duration-300 font-mono text-lg font-bold flex items-center justify-center ${selectedAnswer && option === correctAnswer?.split('-')[0] ? 'bg-yellow-400/30 border-yellow-500 text-yellow-300' : getFirstCodeClass(option)}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 中间形状 */}
          {intermediateShapes && (
            <>
              <div className="text-gray-400">
                <div className="w-16 h-16 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-600 clip-funnel"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-3 bg-gray-700/30 p-4 rounded-xl border-2 border-gray-500">
                  {intermediateShapes.map((shape, index) => (
                    <div key={index} className="w-14 h-14 bg-gray-700/40 rounded-lg flex items-center justify-center border-2 border-gray-400">
                      <Shape type={shape} size={32} color={getShapeColor(shape)} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 漏斗箭头 */}
          <div className="text-gray-400">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-600 clip-funnel"></div>
            </div>
          </div>

          {/* 第二行操作符 */}
          <div className="flex items-center gap-3">
            {secondCodeOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSecondCodeSelect(option)}
                className={`w-24 h-10 rounded-lg border-2 transition-all duration-300 font-mono text-lg font-bold flex items-center justify-center ${selectedAnswer && option === correctAnswer?.split('-')[1] ? 'bg-yellow-400/30 border-yellow-500 text-yellow-300' : getSecondCodeClass(option)}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 漏斗箭头 */}
          <div className="text-gray-400">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-600 clip-funnel"></div>
            </div>
          </div>

          {/* 输出 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-3 bg-gray-800/40 p-4 rounded-xl border-2 border-gray-600">
              {outputShapes.map((shape, index) => (
                <div key={index} className="w-14 h-14 bg-gray-700/60 rounded-lg flex items-center justify-center border-2 border-gray-500">
                  <Shape type={shape} size={32} color={getShapeColor(shape)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 题目说明 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '演绎逻辑推理' : 'Deductive Logical Reasoning'}</h2>
        <p className="text-gray-300">{language === 'zh' ? '找到正确的代码，将输入转换为给定的输出' : 'Find the correct code which changes the input to the given output'}</p>
      </div>

      {/* 垂直布局，更接近PDF */}
      <div className="flex flex-col items-center justify-center gap-6">
        {/* 输入 */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4 bg-gray-800/40 p-5 rounded-2xl border-2 border-gray-600">
            {inputShapes.map((shape, index) => (
              <div key={index} className="w-16 h-16 bg-gray-700/60 rounded-xl flex items-center justify-center border-2 border-gray-500">
                <Shape type={shape} size={38} color={getShapeColor(shape)} />
              </div>
            ))}
          </div>
        </div>

        {/* 漏斗箭头 */}
        <div className="text-gray-400">
          <div className="w-20 h-20 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-16 bg-gray-600 clip-funnel"></div>
          </div>
        </div>

        {/* 操作符选项 */}
        <div className="flex items-center gap-4">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-28 h-12 rounded-lg border-2 transition-all duration-300 font-mono text-xl font-bold flex items-center justify-center ${getButtonClass(option)}`}
              >
                {option}
              </button>
            ))
          ) : null}
        </div>

        {/* 漏斗箭头 */}
        <div className="text-gray-400">
          <div className="w-20 h-20 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-16 bg-gray-600 clip-funnel"></div>
          </div>
        </div>

        {/* 输出 */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4 bg-gray-800/40 p-5 rounded-2xl border-2 border-gray-600">
            {outputShapes.map((shape, index) => (
              <div key={index} className="w-16 h-16 bg-gray-700/60 rounded-xl flex items-center justify-center border-2 border-gray-500">
                <Shape type={shape} size={38} color={getShapeColor(shape)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SwitchChallenge = React.memo(SwitchChallengeComponent);
export default SwitchChallenge;
