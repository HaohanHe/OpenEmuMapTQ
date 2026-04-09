import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, UserAnswer, QuizResult, QuizType } from '@/types';
import { getQuestionsByType } from '@/data/questions';
import {
  AdaptiveTestState,
  initializeAdaptiveTest,
  selectNextQuestion,
  updateAdaptiveState,
  shouldCompleteTest,
} from '@/utils/adaptiveTest';

interface QuizState {
  // 题目相关
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  quizType: QuizType;
  
  // 自适应测试相关
  isAdaptiveMode: boolean;
  adaptiveState: AdaptiveTestState;
  allQuestions: Question[];
  
  // 计时器相关
  timeRemaining: number;
  isTimerRunning: boolean;
  isExamMode: boolean;
  
  // 结果相关
  results: QuizResult[];
  currentResult: QuizResult | null;
  
  // 操作方法
  startQuiz: (type: QuizType, examMode?: boolean, adaptiveMode?: boolean) => void;
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  retakeQuiz: () => void;
  retakeWrongQuestions: () => void;
  updateTime: () => void;
  clearResults: () => void;
  toggleExamMode: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // 初始状态
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      quizType: 'random',
      isAdaptiveMode: false,
      adaptiveState: initializeAdaptiveTest(),
      allQuestions: [],
      timeRemaining: 600, // 10分钟
      isTimerRunning: false,
      isExamMode: false,
      results: [],
      currentResult: null,
      
      // 开始测试
      startQuiz: (type: QuizType, examMode = false, adaptiveMode = false) => {
        try {
          const allQuestions = getQuestionsByType(type);
          
          if (allQuestions.length === 0) {
            console.warn(`No questions found for quiz type: ${type}`);
            // 可以添加错误状态或提示
          }
          
          let initialQuestions: Question[];
          const initialAdaptiveState = initializeAdaptiveTest();
          
          if (adaptiveMode) {
            const firstQuestionResult = selectNextQuestion(allQuestions, initialAdaptiveState);
            initialQuestions = firstQuestionResult.question ? [firstQuestionResult.question] : [];
          } else {
            initialQuestions = allQuestions;
          }
          
          // 根据测试类型设置不同的时间限制
          let timeLimit = 600; // 默认10分钟
          switch (type) {
            case 'aon_verbal':
            case 'aon_numerical':
              timeLimit = 360; // 6分钟
              break;
            case 'aon_inductive':
              timeLimit = 300; // 5分钟
              break;
            case 'aon_deductive_switch':
              timeLimit = 300; // 5分钟
              break;
            case 'aon_inductive_scales':
              timeLimit = 240; // 4分钟
              break;
            case 'aon_ap_reasoning':
              timeLimit = 480; // 8分钟
              break;
            case 'aon_gap_challenge':
              timeLimit = 300; // 5分钟
              break;
            case 'aon_digit_challenge':
              timeLimit = 300; // 5分钟
              break;
            case 'aon_applied_numeracy':
              timeLimit = 360; // 6分钟
              break;
            case 'cognitive':
            case 'numerical':
            case 'verbal':
              timeLimit = 480; // 8分钟
              break;
            default:
              timeLimit = 600; // 10分钟
          }
          
          set({
            questions: initialQuestions,
            currentQuestionIndex: 0,
            userAnswers: [],
            quizType: type,
            isAdaptiveMode: adaptiveMode,
            adaptiveState: initialAdaptiveState,
            allQuestions,
            timeRemaining: timeLimit,
            isTimerRunning: true,
            isExamMode: examMode,
            currentResult: null,
          });
        } catch (error) {
          console.error('Error starting quiz:', error);
          // 可以添加错误状态或提示
        }
      },
      
      // 选择答案
      selectAnswer: (answer: string) => {
        try {
          const { questions, currentQuestionIndex, userAnswers } = get();
          
          if (questions.length === 0 || currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
            console.warn('Invalid question index or empty questions array');
            return;
          }
          
          const currentQuestion = questions[currentQuestionIndex];
          
          if (!currentQuestion) {
            console.warn('Current question not found');
            return;
          }
          
          // 检查是否已经回答过这个问题
          const existingAnswerIndex = userAnswers.findIndex(
            (ua) => ua.questionId === currentQuestion.id
          );
          
          const newUserAnswers = [...userAnswers];
          if (existingAnswerIndex >= 0) {
            // 更新已有答案
            newUserAnswers[existingAnswerIndex] = {
              questionId: currentQuestion.id,
              selectedAnswer: answer,
              isCorrect: answer === currentQuestion.correctAnswer,
            };
          } else {
            // 添加新答案
            newUserAnswers.push({
              questionId: currentQuestion.id,
              selectedAnswer: answer,
              isCorrect: answer === currentQuestion.correctAnswer,
            });
          }
          
          set({ userAnswers: newUserAnswers });
        } catch (error) {
          console.error('Error selecting answer:', error);
        }
      },
      
      // 下一题
      nextQuestion: () => {
        try {
          const { currentQuestionIndex, questions, isAdaptiveMode, adaptiveState, allQuestions, userAnswers } = get();
          
          if (questions.length === 0) {
            console.warn('No questions to navigate');
            return;
          }
          
          if (isAdaptiveMode) {
            if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
              console.warn('Invalid question index');
              return;
            }
            
            const currentQuestion = questions[currentQuestionIndex];
            if (!currentQuestion) {
              console.warn('Current question not found');
              return;
            }
            
            const userAnswer = userAnswers.find(ua => ua.questionId === currentQuestion.id);
            
            if (userAnswer) {
              const newAdaptiveState = updateAdaptiveState(
                adaptiveState,
                currentQuestion,
                userAnswer.isCorrect
              );
              
              if (shouldCompleteTest(newAdaptiveState)) {
                get().submitQuiz();
                return;
              }
              
              const nextQuestionResult = selectNextQuestion(allQuestions, newAdaptiveState);
              
              if (nextQuestionResult.isTestComplete) {
                get().submitQuiz();
                return;
              }
              
              if (nextQuestionResult.question) {
                set({
                  questions: [...questions, nextQuestionResult.question],
                  currentQuestionIndex: currentQuestionIndex + 1,
                  adaptiveState: newAdaptiveState,
                });
              } else {
                console.warn('No next question found');
                get().submitQuiz();
              }
            } else {
              console.warn('No answer found for current question');
            }
          } else {
            if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length - 1) {
              set({ currentQuestionIndex: currentQuestionIndex + 1 });
            }
          }
        } catch (error) {
          console.error('Error navigating to next question:', error);
        }
      },
      
      // 上一题
      prevQuestion: () => {
        try {
          const { currentQuestionIndex } = get();
          if (currentQuestionIndex > 0) {
            set({ currentQuestionIndex: currentQuestionIndex - 1 });
          }
        } catch (error) {
          console.error('Error navigating to previous question:', error);
        }
      },
      
      // 提交测试
      submitQuiz: () => {
        try {
          const { questions, userAnswers, quizType, timeRemaining } = get();
          
          if (questions.length === 0) {
            console.warn('No questions to submit');
            return;
          }
          
          // 计算正确答案数量
          const correctAnswers = userAnswers.filter((ua) => ua.isCorrect).length;
          
          // 创建测试结果
          const result: QuizResult = {
            id: Date.now().toString(),
            quizType,
            totalQuestions: questions.length,
            correctAnswers,
            timeSpent: Math.max(0, 600 - timeRemaining), // 确保时间不为负数
            userAnswers,
            completedAt: Date.now(),
          };
          
          set((state) => ({
            isTimerRunning: false,
            currentResult: result,
            results: [result, ...state.results],
          }));
        } catch (error) {
          console.error('Error submitting quiz:', error);
        }
      },
      
      // 重置测试
      resetQuiz: () => {
        set({
          questions: [],
          currentQuestionIndex: 0,
          userAnswers: [],
          timeRemaining: 600,
          isTimerRunning: false,
          currentResult: null,
          isAdaptiveMode: false,
          adaptiveState: initializeAdaptiveTest(),
          allQuestions: [],
        });
      },
      
      // 重新测试
      retakeQuiz: () => {
        const { quizType } = get();
        get().startQuiz(quizType);
      },
      
      // 重做错题目
      retakeWrongQuestions: () => {
        const { userAnswers, quizType } = get();
        const wrongQuestionIds = userAnswers
          .filter((ua) => !ua.isCorrect)
          .map((ua) => ua.questionId);
        
        if (wrongQuestionIds.length > 0) {
          const allQuestions = getQuestionsByType(quizType);
          const wrongQuestions = allQuestions.filter((q) => 
            wrongQuestionIds.includes(q.id)
          );
          
          set({
            questions: wrongQuestions,
            currentQuestionIndex: 0,
            userAnswers: [],
            timeRemaining: 300, // 5分钟
            isTimerRunning: true,
            currentResult: null,
          });
        }
      },
      
      // 更新时间
      updateTime: () => {
        set((state) => {
          if (state.isTimerRunning && state.timeRemaining > 0) {
            const newTimeRemaining = state.timeRemaining - 1;
            if (newTimeRemaining === 0) {
              // 时间到，自动提交
              get().submitQuiz();
              return { timeRemaining: 0, isTimerRunning: false };
            }
            return { timeRemaining: newTimeRemaining };
          }
          return state;
        });
      },
      
      // 清除结果
      clearResults: () => {
        set({ results: [] });
      },
      
      // 切换考试模式
      toggleExamMode: () => {
        set((state) => ({
          isExamMode: !state.isExamMode
        }));
      },
    }),
    {
      name: 'aon-quiz-storage',
      partialize: (state) => ({
        results: state.results,
      }),
    }
  )
);
