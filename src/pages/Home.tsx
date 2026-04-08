import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { useLanguageStore } from '@/store/languageStore';
import { Brain, Calculator, Book, PlayCircle, ChevronRight, Globe } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { startQuiz, isExamMode, toggleExamMode } = useQuizStore();
  const [isAdaptiveMode, setIsAdaptiveMode] = React.useState(false);

  const handleStartQuiz = (type: string) => {
    startQuiz(type, isExamMode, isAdaptiveMode);
    navigate(`/quiz/${type}`);
  };

  const { language, toggleLanguage } = useLanguageStore();

  const quizTypes = [
    {
      id: 'aon_deductive_switch',
      title: 'Switch Challenge',
      description: '形状序列变换推理测试',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'aon_gap_challenge',
      title: 'Grid Challenge',
      description: '4×4网格形状填充测试',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-green-500 to-green-700',
    },
    {
      id: 'aon_inductive_scales',
      title: 'Scales ix',
      description: '图形模式归纳推理测试',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-pink-500 to-pink-700',
    },
    {
      id: 'aon_inductive_grid',
      title: 'Grid Inductive',
      description: '3×3网格图形规则推理测试',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      id: 'aon_ap_reasoning',
      title: 'AP Reasoning',
      description: '逻辑前提与结论推理测试',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      id: 'aon_verbal',
      title: '语言推理',
      description: '基于数据表格的语言理解测试',
      icon: <Book className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-700',
    },
    {
      id: 'aon_numerical',
      title: '数字推理',
      description: '基于数据表格的数字分析测试',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      id: 'aon_digit_challenge',
      title: 'Digit Challenge',
      description: '数字填空数学推理测试',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-700',
    },
    {
      id: 'aon_applied_numeracy',
      title: '应用数学',
      description: '实际问题数学应用测试',
      icon: <Calculator className="w-8 h-8" />,
      color: 'from-teal-500 to-teal-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            怡安Aon测试模考系统
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-primary-100">
            熟悉测评题型，提升应试能力，为职场竞争做好准备
          </p>
          
          {/* Language and Exam Mode Toggles */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            {/* Language Toggle */}
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary-400" />
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                {language === 'zh' ? '中文' : 'English'}
              </button>
            </div>
            
            {/* Exam Mode Toggle */}
            <div className="flex items-center">
              <span className={`mr-4 text-sm font-medium ${isExamMode ? 'text-primary-300' : 'text-white'}`}>{language === 'zh' ? '练习模式' : 'Practice Mode'}</span>
              <button
                onClick={toggleExamMode}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                  isExamMode ? 'bg-success' : 'bg-primary-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isExamMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-4 text-sm font-medium ${isExamMode ? 'text-white' : 'text-primary-300'}`}>{language === 'zh' ? '考试模式' : 'Exam Mode'}</span>
            </div>

            {/* Adaptive Mode Toggle */}
            <div className="flex items-center">
              <span className={`mr-4 text-sm font-medium ${isAdaptiveMode ? 'text-primary-300' : 'text-white'}`}>{language === 'zh' ? '标准模式' : 'Standard Mode'}</span>
              <button
                onClick={() => setIsAdaptiveMode(!isAdaptiveMode)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                  isAdaptiveMode ? 'bg-purple-500' : 'bg-primary-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isAdaptiveMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-4 text-sm font-medium ${isAdaptiveMode ? 'text-white' : 'text-primary-300'}`}>{language === 'zh' ? '自适应模式' : 'Adaptive Mode'}</span>
            </div>
          </div>
          
          {/* Quick Start Button */}
          <button
            onClick={() => handleStartQuiz('random')}
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-full hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
            aria-label={isExamMode ? (language === 'zh' ? '开始考试' : 'Start Exam') : (language === 'zh' ? '快速开始' : 'Quick Start')}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-600 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              <PlayCircle className="w-6 h-6 mr-2" />
              {isExamMode ? (language === 'zh' ? '开始考试' : 'Start Exam') : (language === 'zh' ? '快速开始' : 'Quick Start')}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Quiz Types Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{language === 'zh' ? '选择测试类型' : 'Select Test Type'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleStartQuiz(type.id)}
              className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStartQuiz(type.id); }}
              aria-label={`Start ${type.title} test`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${type.color}`}></div>
              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${type.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-primary-200 mb-6">{type.description}</p>
                <div className="flex items-center text-primary-400 group-hover:text-white transition-colors duration-300">
                  <span>{language === 'zh' ? '开始测试' : 'Start Test'}</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-white/5 backdrop-blur-sm rounded-3xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">{language === 'zh' ? '系统特点' : 'System Features'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-6">
              <Brain className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'zh' ? '专业题型' : 'Professional Questions'}</h3>
            <p className="text-primary-200">{language === 'zh' ? '模拟怡安Aon真实测评题型，全面覆盖认知、数字、语言能力' : 'Simulate real Aon assessment questions, covering cognitive, numerical, and verbal abilities'}</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'zh' ? '自适应测试' : 'Adaptive Testing'}</h3>
            <p className="text-primary-200">{language === 'zh' ? 'AI驱动的动态题目选择，根据答题表现实时调整难度，模拟真实Aon测评体验' : 'AI-driven dynamic question selection, real-time difficulty adjustment based on performance, simulating real Aon assessment experience'}</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-6">
              <Calculator className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'zh' ? '即时反馈' : 'Instant Feedback'}</h3>
            <p className="text-primary-200">{language === 'zh' ? '测试完成后立即获得详细解析和成绩统计' : 'Get detailed explanations and score statistics immediately after completing the test'}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-primary-300">
        <p>{language === 'zh' ? '© 2026 怡安Aon测试模考系统 | 本系统仅用于模拟练习，非官方测评' : '© 2026 Aon Test Practice System | This system is for practice only, not official assessment'}</p>
      </footer>
    </div>
  );
};

export default Home;
