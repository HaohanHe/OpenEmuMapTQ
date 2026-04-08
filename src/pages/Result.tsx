import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { useLanguageStore } from '@/store/languageStore';
import { Home, RefreshCw, Book, Check, X, ChevronDown, ChevronUp, Clock, Award } from 'lucide-react';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentResult,
    retakeQuiz,
    retakeWrongQuestions,
    resetQuiz,
  } = useQuizStore();

  const { language } = useLanguageStore();
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  // 处理返回首页
  const handleBackToHome = () => {
    resetQuiz();
    navigate('/');
  };

  // 处理重测
  const handleRetake = () => {
    retakeQuiz();
    navigate('/quiz/' + currentResult?.quizType);
  };

  // 处理重做错题
  const handleRetakeWrong = () => {
    retakeWrongQuestions();
    navigate('/quiz/' + currentResult?.quizType);
  };

  // 切换题目展开/折叠
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  // 获取测试类型名称
  const getQuizTypeName = (type: string) => {
    switch (type) {
      case 'cognitive':
        return '认知能力';
      case 'numerical':
        return '数字推理';
      case 'verbal':
        return '语言理解';
      case 'inductive':
        return '归纳推理';
      case 'deductive':
        return '演绎推理';
      case 'mechanical':
        return '机械推理';
      case 'situational':
        return '情境判断';
      case 'aon_verbal':
        return 'Aon语言推理';
      case 'aon_numerical':
        return 'Aon数字推理';
      case 'aon_inductive':
        return 'Aon归纳推理';
      case 'aon_deductive_switch':
        return 'Aon演绎推理';
      case 'aon_inductive_scales':
        return 'Aon归纳逻辑';
      case 'aon_ap_reasoning':
        return 'Aon逻辑推理';
      case 'aon_gap_challenge':
        return 'Aon网格推理';
      case 'aon_digit_challenge':
        return 'Aon数字推理';
      case 'aon_applied_numeracy':
        return 'Aon应用数学';


      case 'random':
        return '随机测试';
      default:
        return type;
    }
  };

  if (!currentResult) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <Book className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">{language === 'zh' ? '没有测试结果' : 'No Test Results'}</h2>
          <p className="text-primary-200 mb-6">{language === 'zh' ? '请先完成测试' : 'Please complete the test first'}</p>
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

  const { quizType, totalQuestions, correctAnswers, timeSpent, userAnswers } = currentResult;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  const wrongAnswers = totalQuestions - correctAnswers;

  // 获取错题
  const wrongQuestions = questions.filter((q) => {
    const userAnswer = userAnswers.find((ua) => ua.questionId === q.id);
    return userAnswer && !userAnswer.isCorrect;
  });

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-primary-800/95 backdrop-blur-sm border-b border-primary-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center text-primary-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              <span>{language === 'zh' ? '首页' : 'Home'}</span>
            </button>
            <h1 className="text-xl font-bold">{language === 'zh' ? '测试结果' : 'Test Results'}</h1>
            <div className="w-12"></div> {/* 占位 */}
          </div>
        </div>
      </header>

      {/* 成绩展示区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 总体成绩 */}
          <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 mb-8 border border-primary-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{getQuizTypeName(quizType)}</h2>
                <p className="text-primary-300">{language === 'zh' ? '测试完成时间：' : 'Completed at：'}{new Date(currentResult.completedAt).toLocaleString()}</p>
              </div>
              
              <div className="flex space-x-6 sm:space-x-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-primary-400 mb-1">{correctAnswers}</div>
                  <div className="text-sm text-primary-300">{language === 'zh' ? '正确' : 'Correct'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-error mb-1">{wrongAnswers}</div>
                  <div className="text-sm text-primary-300">{language === 'zh' ? '错误' : 'Wrong'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-success mb-1">{accuracy}%</div>
                  <div className="text-sm text-primary-300">{language === 'zh' ? '正确率' : 'Accuracy'}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary-400 mr-2" />
                <span className="text-primary-200">{language === 'zh' ? '用时：' : 'Time spent：'}{formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-primary-400 mr-2" />
                <span className="text-primary-200">
                  {Number(accuracy) >= 90 ? (language === 'zh' ? '优秀' : 'Excellent') : Number(accuracy) >= 70 ? (language === 'zh' ? '良好' : 'Good') : Number(accuracy) >= 60 ? (language === 'zh' ? '及格' : 'Pass') : (language === 'zh' ? '需要加强' : 'Needs Improvement')}
                </span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
            <button
              onClick={handleRetake}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              aria-label={language === 'zh' ? '重新测试' : 'Retake Test'}
              tabIndex={0}
            >
              <RefreshCw className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>{language === 'zh' ? '重新测试' : 'Retake Test'}</span>
            </button>
            {wrongAnswers > 0 && (
              <button
                onClick={handleRetakeWrong}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-700 hover:bg-primary-600 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
                aria-label={language === 'zh' ? '重做错题' : 'Retry Wrong Questions'}
                tabIndex={0}
              >
                <Book className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{language === 'zh' ? '重做错题' : 'Retry Wrong Questions'}</span>
              </button>
            )}
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-800 hover:bg-primary-700 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              aria-label={language === 'zh' ? '返回首页' : 'Back to Home'}
              tabIndex={0}
            >
              <Home className="w-4 sm:w-5 h-4 sm:h-5" />
              <span>{language === 'zh' ? '返回首页' : 'Back to Home'}</span>
            </button>
          </div>

          {/* 答案解析 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">{language === 'zh' ? '答案解析' : 'Answer Explanations'}</h3>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find((ua) => ua.questionId === question.id);
                const isCorrect = userAnswer?.isCorrect || false;
                const isExpanded = expandedQuestions.includes(question.id);

                return (
                  <div
                    key={question.id}
                    className={`border rounded-lg transition-all duration-300 ${isCorrect
                      ? 'border-success/50 bg-success/5'
                      : 'border-error/50 bg-error/5'}`}
                  >
                    {/* 题目头部 */}
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect
                          ? 'bg-success/20 text-success'
                          : 'bg-error/20 text-error'}`}>
                          {isCorrect ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'zh' ? '问题' : 'Question'} {index + 1}</h4>
                          <p className="text-sm text-primary-300">
                            {userAnswer ? `${language === 'zh' ? '你的答案：' : 'Your answer：'}${userAnswer.selectedAnswer}` : (language === 'zh' ? '未作答' : 'Not answered')}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary-400" />
                      )}
                    </button>

                    {/* 题目内容和解析 */}
                    {isExpanded && (
                      <div className="px-6 pb-4 space-y-4">
                        {/* 数据表格（Aon风格题目） */}
                        {question.dataSheet && (
                          <div className="mb-4 p-4 bg-primary-800/70 rounded-lg border border-primary-700">
                            <h5 className="font-medium mb-2 text-primary-300">{language === 'zh' ? '数据表格：' : 'Data Sheet：'}</h5>
                            <div className="text-sm text-primary-200 whitespace-pre-wrap">
                              {question.dataSheet}
                            </div>
                          </div>
                        )}
                        <div>
                          <h5 className="font-medium mb-2">{language === 'zh' ? '题目：' : 'Question：'}</h5>
                          <p className="text-primary-200">{question.content}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">{language === 'zh' ? '正确答案：' : 'Correct Answer：'}</h5>
                          <p className="text-success">{question.correctAnswer}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">{language === 'zh' ? '解析：' : 'Explanation：'}</h5>
                          <p className="text-primary-200">{question.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 错题回顾 */}
          {wrongAnswers > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">{language === 'zh' ? '错题回顾' : 'Wrong Questions Review'}</h3>
              <div className="space-y-4">
                {wrongQuestions.map((question, index) => {
                  const userAnswer = userAnswers.find((ua) => ua.questionId === question.id);
                  const isExpanded = expandedQuestions.includes(question.id);

                  return (
                    <div
                      key={question.id}
                      className="border border-error/50 bg-error/5 rounded-lg"
                    >
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-error/20 text-error">
                            <X className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium">{language === 'zh' ? '错题' : 'Wrong Question'} {index + 1}</h4>
                            <p className="text-sm text-primary-300">
                              {language === 'zh' ? '你的答案：' : 'Your answer：'}{userAnswer?.selectedAnswer}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-primary-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-4 space-y-4">
                          {/* 数据表格（Aon风格题目） */}
                          {question.dataSheet && (
                            <div className="mb-4 p-4 bg-primary-800/70 rounded-lg border border-primary-700">
                              <h5 className="font-medium mb-2 text-primary-300">{language === 'zh' ? '数据表格：' : 'Data Sheet：'}</h5>
                              <div className="text-sm text-primary-200 whitespace-pre-wrap">
                                {question.dataSheet}
                              </div>
                            </div>
                          )}
                          <div>
                            <h5 className="font-medium mb-2">{language === 'zh' ? '题目：' : 'Question：'}</h5>
                            <p className="text-primary-200">{question.content}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">{language === 'zh' ? '正确答案：' : 'Correct Answer：'}</h5>
                            <p className="text-success">{question.correctAnswer}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">{language === 'zh' ? '解析：' : 'Explanation：'}</h5>
                            <p className="text-primary-200">{question.explanation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部信息 */}
      <footer className="container mx-auto px-4 py-6 text-center text-primary-300 text-sm">
        <p>{language === 'zh' ? '© 2026 怡安Aon测试模考系统 | 本系统仅用于模拟练习，非官方测评' : '© 2026 Aon Test Practice System | This system is for practice only, not official assessment'}</p>
      </footer>
    </div>
  );
};

export default Result;
