import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { useLanguageStore } from '@/store/languageStore';
import { QuizType } from '@/types';
import { ArrowLeft, ArrowRight, Check, Clock, AlertCircle, Home, Brain } from 'lucide-react';

const SwitchChallenge = lazy(() => import('@/components/SwitchChallenge'));
const GridChallenge = lazy(() => import('@/components/GridChallenge'));
const ScalesIx = lazy(() => import('@/components/ScalesIx'));
const DigitChallenge = lazy(() => import('@/components/DigitChallenge'));
const GridInductive = lazy(() => import('@/components/GridInductive'));
const GridFill = lazy(() => import('@/components/GridFill'));
const NumericalReasoning = lazy(() => import('@/components/NumericalReasoning'));

const Quiz: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    timeRemaining,
    isTimerRunning,
    isExamMode,
    isAdaptiveMode,
    adaptiveState,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    updateTime,
    resetQuiz,
    startQuiz,
  } = useQuizStore();

  const { language } = useLanguageStore();

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // 当类型变化时，自动开始测试
  useEffect(() => {
    // 只有在未开始且题目为空时才触发，避免因刷新页面触发重复生成
    if (type && questions.length === 0 && !hasStarted) {
      setHasStarted(true);
      startQuiz(type as QuizType, false, type === 'random' || type === 'aon_inductive_grid_fill');
    }
  }, [type, questions.length, startQuiz, hasStarted]);

  // 处理计时器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        updateTime();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, updateTime]);

  // 加载当前题目答案
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const userAnswer = userAnswers.find(
        (ua) => ua.questionId === currentQuestion.id
      );
      setSelectedAnswer(userAnswer?.selectedAnswer || '');
    }
  }, [currentQuestionIndex, questions, userAnswers]);

  // 处理答案选择 (使用 useCallback 避免向下传递的函数在每次 tick 重建)
  const handleAnswerSelect = React.useCallback((answer: string) => {
    setSelectedAnswer(answer);
    selectAnswer(answer);
  }, [selectAnswer]);

  // 处理提交
  const handleSubmit = React.useCallback(() => {
    submitQuiz();
    navigate('/result');
  }, [submitQuiz, navigate]);

  // 处理返回首页
  const handleBackToHome = React.useCallback(() => {
    resetQuiz();
    navigate('/');
  }, [resetQuiz, navigate]);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">{language === 'zh' ? '没有题目' : 'No Questions'}</h2>
          <p className="text-primary-200 mb-6">{language === 'zh' ? '请从首页选择测试类型' : 'Please select a test type from the homepage'}</p>
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-primary-800/95 backdrop-blur-sm border-b border-primary-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center text-primary-300 hover:text-white transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                <span>{language === 'zh' ? '首页' : 'Home'}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* 自适应模式指示器 */}
              {isAdaptiveMode && (
                <div className="flex items-center space-x-2 text-purple-400">
                  <Brain className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium">
                    {language === 'zh' ? '自适应' : 'Adaptive'} 
                    <span className="ml-1 text-xs bg-purple-500/20 px-2 py-0.5 rounded">
                      Lvl {Math.round(adaptiveState.currentDifficulty)}
                    </span>
                  </span>
                </div>
              )}
              
              {/* 计时器 */}
              <div className={`flex items-center space-x-2 ${isExamMode ? 'animate-pulse' : ''}`}>
                <Clock className={`w-5 h-5 ${isExamMode ? 'text-error' : 'text-primary-400'}`} />
                <span className={`text-sm sm:text-lg font-mono font-bold ${isExamMode ? 'text-error' : timeRemaining < 60 ? 'text-error' : 'text-white'}`}>
                  {formatTime(timeRemaining)}
                </span>
                {isExamMode && <span className="text-xs text-error ml-2">{language === 'zh' ? '考试模式' : 'Exam Mode'}</span>}
              </div>
              
              {/* 提交按钮 */}
              <button
                onClick={handleSubmit}
                className="px-4 sm:px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm"
              >
                {language === 'zh' ? '提交' : 'Submit'}
              </button>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="mt-4">
            <div className="h-2 bg-primary-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-primary-300">
              <span>{language === 'zh' ? '问题' : 'Question'} {currentQuestionIndex + 1} / {questions.length}</span>
              <span>{Math.round(progress)}% {language === 'zh' ? '完成' : 'Complete'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 题目区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 题目内容 */}
          <div className="mb-8">
            {/* 数据表格（Aon风格题目） */}
            {currentQuestion.dataSheet && currentQuestion.type !== 'aon_numerical' && (
              <div className="mb-8 p-6 bg-primary-800/60 rounded-xl border border-primary-700 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4 text-primary-300">数据表格</h3>
                {currentQuestion.dataSheet.includes('[TABLE]') ? (
                  <table className="w-full text-sm">
                    <tbody>
                      {currentQuestion.dataSheet.replace('[TABLE]', '').trim().split('\n').map((row, rowIndex) => {
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
                ) : currentQuestion.dataSheet.includes('[CHART]') ? (
                  <div className="text-center">
                    <div className="w-64 h-48 bg-primary-700/40 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-primary-300">图表区域</div>
                    </div>
                    <p className="text-sm text-primary-300">{currentQuestion.dataSheet.replace('[CHART]', '').trim()}</p>
                  </div>
                ) : (
                  <div className="text-sm text-primary-200 whitespace-pre-wrap">
                    {currentQuestion.dataSheet}
                  </div>
                )}
              </div>
            )}
            
            <Suspense fallback={<div className="flex items-center justify-center py-10"><div className="text-white">Loading question...</div></div>}>
              {/* SwitchChallenge 图形化题目 */}
              {currentQuestion.switchChallengeData && (
                <SwitchChallenge
                  inputShapes={currentQuestion.switchChallengeData.inputShapes}
                  outputShapes={currentQuestion.switchChallengeData.outputShapes}
                  options={currentQuestion.switchChallengeData.options}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  onSelect={handleAnswerSelect}
                  intermediateShapes={currentQuestion.switchChallengeData.intermediateShapes}
                  firstCodeOptions={currentQuestion.switchChallengeData.firstCodeOptions}
                  secondCodeOptions={currentQuestion.switchChallengeData.secondCodeOptions}
                  isMultiStep={currentQuestion.switchChallengeData.isMultiStep}
                />
              )}
              
              {/* Gap Challenge (网格填充/符号数独) */}
              {currentQuestion.gridChallengeData && (
                <GridChallenge
                  grid={currentQuestion.gridChallengeData.grid}
                  missingPosition={currentQuestion.gridChallengeData.missingPosition}
                  options={currentQuestion.options}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  onSelect={handleAnswerSelect}
                />
              )}
              
              {/* Scales ix 图形化题目 */}
              {currentQuestion.scalesIxData && (
                <ScalesIx
                  allShapes={currentQuestion.scalesIxData.allShapes}
                  oddOneOutIndex={currentQuestion.scalesIxData.oddOneOutIndex}
                  selectedAnswer={selectedAnswer ? parseInt(selectedAnswer) : undefined}
                  correctAnswer={isExamMode ? undefined : parseInt(currentQuestion.correctAnswer)}
                  onSelect={(index) => handleAnswerSelect(index.toString())}
                />
              )}
              
              {/* Digit Challenge 交互式题目 */}
              {currentQuestion.digitChallengeData && (
                <DigitChallenge
                  equation={currentQuestion.digitChallengeData.equation}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  selectedAnswer={selectedAnswer}
                  onSelect={handleAnswerSelect}
                />
              )}
              
              {/* Grid Inductive 3x3网格推理题目 */}
              {currentQuestion.gridInductiveData && (
                <GridInductive
                  exampleGrids={currentQuestion.gridInductiveData.exampleGrids}
                  questionGrids={currentQuestion.gridInductiveData.questionGrids}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  selectedAnswer={selectedAnswer}
                  onSelect={handleAnswerSelect}
                />
              )}
              
              {/* Grid Fill 3x3网格填充题目 */}
              {currentQuestion.gridFillData && (
                <GridFill
                  grid={currentQuestion.gridFillData.grid}
                  missingPosition={currentQuestion.gridFillData.missingPosition}
                  options={currentQuestion.gridFillData.options}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  onSelect={handleAnswerSelect}
                />
              )}
              
              {/* 数字推理题目 */}
              {currentQuestion.type === 'aon_numerical' && currentQuestion.dataSheet && (
                <NumericalReasoning
                  content={currentQuestion.content}
                  dataSheet={currentQuestion.dataSheet}
                  options={currentQuestion.options}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={isExamMode ? undefined : currentQuestion.correctAnswer}
                  onSelect={handleAnswerSelect}
                />
              )}
            </Suspense>
            
            {/* 普通题目 (包括 AP Reasoning) */}
            {!currentQuestion.switchChallengeData && !currentQuestion.gridChallengeData && !currentQuestion.scalesIxData && !currentQuestion.digitChallengeData && !currentQuestion.gridInductiveData && !currentQuestion.gridFillData && currentQuestion.type !== 'aon_numerical' && (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-6 leading-relaxed whitespace-pre-wrap">{currentQuestion.content}</h2>
                
                {/* 选项 */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = !isExamMode && option === currentQuestion.correctAnswer;
                    const isWrong = !isExamMode && isSelected && option !== currentQuestion.correctAnswer;
                    
                    // Aon风格题目特殊样式
                    const isAonStyle = currentQuestion.isAonStyle || false;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          isSelected && isExamMode
                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                            : isCorrect
                              ? 'bg-success/20 border-success text-success shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : isWrong
                                ? 'bg-error/20 border-error text-error shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                : isAonStyle 
                                  ? 'bg-primary-800/80 border-primary-600 hover:bg-primary-800 hover:border-primary-500' 
                                  : 'bg-primary-800/50 border-primary-700 hover:bg-primary-800 hover:border-primary-500'
                        }`}
                        aria-label={`Select answer: ${option}`}
                        tabIndex={0}
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAnswerSelect(option); }}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            isSelected && isExamMode
                              ? 'bg-blue-500 text-white'
                              : isCorrect
                                ? 'bg-success text-white'
                                : isWrong
                                  ? 'bg-error text-white'
                                  : isAonStyle 
                                    ? 'border-2 border-primary-500 text-primary-300' 
                                    : 'border border-primary-500 text-primary-300'
                          }`}>
                            {isSelected && isExamMode && <Check className="w-4 h-4" />}
                            {isCorrect && <Check className="w-4 h-4" />}
                          </div>
                          <span className={isAonStyle ? 'font-medium' : ''}>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* 解析区域 (仅在练习模式且已作答时显示) */}
            {!isExamMode && selectedAnswer && currentQuestion.explanation && (
              <div className="mt-8 p-6 bg-primary-800/60 rounded-xl border border-primary-600 shadow-md animate-fade-in">
                <h3 className="text-lg font-bold text-primary-300 mb-3 flex items-center">
                  <span className="bg-primary-700 p-1.5 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {language === 'zh' ? '答案解析' : 'Explanation'}
                </h3>
                <p className="text-primary-100 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* 导航按钮 */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${currentQuestionIndex === 0 ? 'bg-primary-800 text-primary-500 cursor-not-allowed' : 'bg-primary-700 hover:bg-primary-600'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'zh' ? '上一题' : 'Previous'}</span>
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!userAnswers.some(ua => ua.questionId === currentQuestion.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${(!userAnswers.some(ua => ua.questionId === currentQuestion.id)) ? 'bg-primary-800 text-primary-500 cursor-not-allowed' : 'bg-primary-700 hover:bg-primary-600'}`}
            >
              <span>{isLastQuestion ? (language === 'zh' ? '完成' : 'Complete') : (language === 'zh' ? '下一题' : 'Next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="container mx-auto px-4 py-6 text-center text-primary-300 text-sm">
        <p>{language === 'zh' ? '请认真作答，确保答案准确' : 'Please answer carefully to ensure accuracy'}</p>
      </footer>
    </div>
  );
};

export default Quiz;
