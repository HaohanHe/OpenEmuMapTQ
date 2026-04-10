import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, UserAnswer, QuizResult, QuizType } from '@/types';
import { getQuestionsByType } from '@/data/questions';
import { generateSwitchChallenge, generateScalesIx, generateGridChallenge, generateGridInductive, generateNumericalReasoning, generateApReasoning } from '@/utils/questionGenerators';
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
  timeLimit: number;
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
      timeLimit: 600,
      timeRemaining: 600, // 10分钟
      isTimerRunning: false,
      isExamMode: false,
      results: [],
      currentResult: null,
      
      // 开始测试
      startQuiz: (type: QuizType, examMode = false, adaptiveMode = false) => {
        try {
          let allQuestions: Question[] = [];
          
          // 如果是支持动态生成的题型，则生成题库 (这里设置默认生成100题，模拟无限题库)
          if (type === 'aon_deductive_switch') {
            allQuestions = generateSwitchChallenge(100);
          } else if (type === 'aon_inductive_scales') {
            allQuestions = generateScalesIx(100);
          } else if (type === 'aon_gap_challenge') {
            allQuestions = generateGridChallenge(100);
          } else if (type === 'aon_inductive_grid') {
            allQuestions = generateGridInductive(100);
          } else if (type === 'aon_numerical') {
            allQuestions = generateNumericalReasoning(100);
          } else if (type === 'aon_ap_reasoning') {
            allQuestions = generateApReasoning(100);
          } else if (type === 'random') {
            // 在快速开始/随机模式下，混合静态题库和各种动态生成的题库
            const staticQuestions = getQuestionsByType('random'); // 拿到30道静态随机题
            const dynamicQuestions = [
              ...generateSwitchChallenge(5),
              ...generateScalesIx(5),
              ...generateGridChallenge(5),
              ...generateGridInductive(5),
              ...generateNumericalReasoning(5),
              ...generateApReasoning(5)
            ];
            // 打乱混合后的题库
            allQuestions = [...staticQuestions, ...dynamicQuestions].sort(() => 0.5 - Math.random());
          } else {
            allQuestions = getQuestionsByType(type);
          }
          
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
              timeLimit = 720; // 真实测试：12分钟 (37/49题)
              break;
            case 'aon_inductive':
            case 'aon_inductive_grid':
            case 'aon_inductive_grid_fill':
              timeLimit = 720; // cls 通常是12分钟
              break;
            case 'aon_deductive_switch':
              timeLimit = 360; // lst 真实测试：6分钟 (15题或无限自适应)
              break;
            case 'aon_inductive_scales':
              timeLimit = 300; // ix 真实测试：5分钟 (20题)
              break;
            case 'aon_gap_challenge':
              timeLimit = 300; // sx 真实测试：5分钟
              break;
            case 'aon_ap_reasoning':
              timeLimit = 480; // 8分钟
              break;
            case 'aon_digit_challenge':
              timeLimit = 300; // eql 真实测试：5分钟 (15题或无限自适应)
              break;
            case 'aon_applied_numeracy':
              timeLimit = 960; // tmt 真实测试：16分钟 (20题)
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
            timeLimit: timeLimit,
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
            // 如果用户点击了“上一题”返回历史题目，再点击“下一题”时，直接递增索引，不要生成新题
            if (currentQuestionIndex < questions.length - 1) {
              set({ currentQuestionIndex: currentQuestionIndex + 1 });
              return;
            }

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
          const { questions, userAnswers, quizType, timeLimit, timeRemaining } = get();
          
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
            timeSpent: Math.max(0, timeLimit - timeRemaining), // 确保时间不为负数，且用正确的动态 timeLimit 计算
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
          timeLimit: 600,
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
        const { userAnswers, quizType, allQuestions, timeLimit } = get();
        const wrongQuestionIds = userAnswers
          .filter((ua) => !ua.isCorrect)
          .map((ua) => ua.questionId);
        
        if (wrongQuestionIds.length > 0) {
          // 直接从 allQuestions 状态中过滤错题，这样能兼容动态生成的题库
          const wrongQuestions = allQuestions.filter((q) => 
            wrongQuestionIds.includes(q.id)
          );
          
          set({
            questions: wrongQuestions,
            currentQuestionIndex: 0,
            userAnswers: [],
            timeRemaining: timeLimit, // 使用当前测试类型的原定总时间
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
