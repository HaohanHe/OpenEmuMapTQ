import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { Trash2 } from 'lucide-react';

interface DigitChallengeProps {
  equation: string;
  correctAnswer: string;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
}

export const DigitChallenge: React.FC<DigitChallengeProps> = ({
  equation,
  correctAnswer,
  selectedAnswer,
  onSelect,
}) => {
  const [input, setInput] = useState<string[]>([]);
  const [usedDigits, setUsedDigits] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { language } = useLanguageStore();

  const placeholders = equation.match(/\?/g) || [];
  const placeholderCount = placeholders.length;

  useEffect(() => {
    // 当题目切换时，重置所有状态
    setIsEditing(false);
    if (selectedAnswer) {
      const digits = selectedAnswer.split('');
      setInput(digits);
      setUsedDigits(digits);
    } else {
      setInput([]);
      setUsedDigits([]);
    }
  }, [selectedAnswer]);

  const validateAnswer = (digits: string[]) => {
    if (digits.length !== placeholderCount) return false;
    
    let evalStr = equation;
    digits.forEach(d => {
      evalStr = evalStr.replace('?', d);
    });
    
    // 安全地计算表达式，兼容中英文符号和除号
    const safeExpression = evalStr.replace(/=/g, '===')
                                  .replace(/×/g, '*')
                                  .replace(/÷/g, '/');
    
    try {
      // 允许额外的 / 符号
      if (/^[0-9+\-*/()\s=]+$/.test(safeExpression)) {
        return Function(`'use strict'; return (${safeExpression})`)();
      }
    } catch (e) {
      console.error('Invalid expression', e);
    }
    return false;
  };

  const handleDigitClick = (digit: string) => {
    if (usedDigits.includes(digit)) return;
    if (input.length >= placeholderCount) return;
    
    setIsEditing(true);
    const newInput = [...input, digit];
    setInput(newInput);
    setUsedDigits([...usedDigits, digit]);
    
    if (newInput.length === placeholderCount) {
      // 无论答案是否正确，都提交用户输入的答案
      onSelect?.(newInput.join(''));
    }
  };

  const handleDelete = () => {
    if (input.length > 0) {
      setIsEditing(true);
      const lastDigit = input[input.length - 1];
      const newInput = input.slice(0, -1);
      setInput(newInput);
      setUsedDigits(usedDigits.filter(d => d !== lastDigit));
      
      // 如果之前已经提交了答案，删除时清空全局状态
      if (input.length === placeholderCount) {
        onSelect?.('');
      }
    }
  };

  const isAnswerCorrect = () => {
    let digits: string[];
    if (isEditing || !selectedAnswer) {
      if (input.length === placeholderCount) {
        digits = input;
      } else {
        return false;
      }
    } else {
      digits = selectedAnswer.split('');
    }
    return validateAnswer(digits);
  };

  const renderEquation = () => {
    let inputIndex = 0;
    const parts: JSX.Element[] = [];
    let currentText = '';
    
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] === '?') {
        if (currentText) {
          parts.push(<span key={`text-${i}`} className="text-white">{currentText}</span>);
          currentText = '';
        }
        const currentDigits = isEditing ? input : (selectedAnswer ? selectedAnswer.split('') : input);
        const digit = currentDigits[inputIndex];
        const isCorrect = isAnswerCorrect();
        const hasAnswer = isEditing ? input.length === placeholderCount : (selectedAnswer || input.length === placeholderCount);
        parts.push(
          <span 
            key={`placeholder-${inputIndex}`}
            className={`inline-flex items-center justify-center w-12 h-14 mx-1 rounded-lg border-2 text-2xl font-bold ${
              digit 
                ? hasAnswer 
                  ? (isCorrect 
                      ? 'border-success bg-success/20 text-success' 
                      : 'border-error bg-error/20 text-error')
                  : 'border-primary-400 bg-primary-900/30 text-white'
                : 'border-primary-600 bg-primary-900/50 text-primary-500 border-dashed'
            }`}
          >
            {digit || '?'}
          </span>
        );
        inputIndex++;
      } else {
        currentText += equation[i];
      }
    }
    
    if (currentText) {
      parts.push(<span key="text-end" className="text-white">{currentText}</span>);
    }
    
    return parts;
  };

  const getButtonClass = (digit: string) => {
    if (usedDigits.includes(digit)) {
      return 'bg-primary-700 text-primary-400 cursor-not-allowed';
    }
    return 'bg-primary-800 hover:bg-primary-700';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{language === 'zh' ? '数字推理' : 'Numerical Comprehension'}</h2>
        <p className="text-primary-300">{language === 'zh' ? '选择数字1-9（每个数字只能使用一次）来正确完成等式' : 'Select digits 1-9 (each can be used only once) to complete the equation correctly'}</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-primary-800/60 p-8 rounded-xl border border-primary-600 max-w-2xl w-full">
          <div className="text-3xl font-mono font-bold mb-8 text-center flex items-center justify-center flex-wrap">
            {renderEquation()}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleDigitClick(digit)}
                disabled={usedDigits.includes(digit) || (!isEditing && selectedAnswer && selectedAnswer === correctAnswer)}
                className={`${getButtonClass(digit)} p-6 rounded-xl border-2 text-3xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  usedDigits.includes(digit) ? 'opacity-50' : ''
                }`}
              >
                {digit}
              </button>
            ))}
          </div>

          <button
            onClick={handleDelete}
            disabled={input.length === 0}
            className={`w-full bg-red-600 hover:bg-red-700 p-5 rounded-xl border-2 border-red-500 flex items-center justify-center gap-3 transition-all duration-300 ${
              input.length === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <Trash2 className="w-6 h-6" />
            <span className="text-lg font-medium">{language === 'zh' ? '删除' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitChallenge;
