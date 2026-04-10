import { Question } from '@/types';

export interface AdaptiveTestState {
  currentDifficulty: number;
  abilityEstimate: number;
  questionHistory: Array<{
    questionId: string;
    difficulty: number;
    isCorrect: boolean;
  }>;
  usedQuestionIds: Set<string>;
}

export interface AdaptiveQuestionSelection {
  question: Question;
  isTestComplete: boolean;
}

const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 5;
const INITIAL_DIFFICULTY = 2;
const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 20;
const DIFFICULTY_ADJUSTMENT = 0.5;

export const initializeAdaptiveTest = (): AdaptiveTestState => ({
  currentDifficulty: INITIAL_DIFFICULTY,
  abilityEstimate: 0,
  questionHistory: [],
  usedQuestionIds: new Set(),
});

export const selectNextQuestion = (
  questions: Question[],
  adaptiveState: AdaptiveTestState
): AdaptiveQuestionSelection => {
  const { currentDifficulty, usedQuestionIds, questionHistory } = adaptiveState;

  if (questionHistory.length >= MAX_QUESTIONS) {
    return {
      question: {} as Question,
      isTestComplete: true,
    };
  }

  const availableQuestions = questions.filter((q) => !usedQuestionIds.has(q.id));

  if (availableQuestions.length === 0) {
    return {
      question: {} as Question,
      isTestComplete: true,
    };
  }

  const questionsAtCurrentDifficulty = availableQuestions.filter(
    (q) => q.difficulty === Math.round(currentDifficulty)
  );

  let selectedQuestion: Question;

  if (questionsAtCurrentDifficulty.length > 0) {
    const randomIndex = Math.floor(Math.random() * questionsAtCurrentDifficulty.length);
    selectedQuestion = questionsAtCurrentDifficulty[randomIndex];
  } else {
    const closestQuestions = [...availableQuestions].sort((a, b) => {
      const diffA = Math.abs(a.difficulty - currentDifficulty);
      const diffB = Math.abs(b.difficulty - currentDifficulty);
      return diffA - diffB;
    });
    selectedQuestion = closestQuestions[0];
  }

  return {
    question: selectedQuestion,
    isTestComplete: false,
  };
};

export const updateAdaptiveState = (
  adaptiveState: AdaptiveTestState,
  question: Question,
  isCorrect: boolean
): AdaptiveTestState => {
  const newQuestionHistory = [
    ...adaptiveState.questionHistory,
    {
      questionId: question.id,
      difficulty: question.difficulty,
      isCorrect,
    },
  ];

  const newUsedQuestionIds = new Set(adaptiveState.usedQuestionIds);
  newUsedQuestionIds.add(question.id);

  // 使用更科学的自适应步长，随着题目数量增加，难度调整幅度减小（模拟 IRT 信息增量衰减）
  const stepSize = Math.max(0.1, DIFFICULTY_ADJUSTMENT * (1 - (newQuestionHistory.length / 30)));
  
  if (isCorrect) {
    newDifficulty = Math.min(newDifficulty + stepSize, MAX_DIFFICULTY);
  } else {
    newDifficulty = Math.max(newDifficulty - stepSize, MIN_DIFFICULTY);
  }

  const recentAnswers = newQuestionHistory.slice(-5);
  const recentCorrect = recentAnswers.filter((a) => a.isCorrect).length;
  const abilityEstimate = (recentCorrect / recentAnswers.length) * 100;

  return {
    ...adaptiveState,
    currentDifficulty: newDifficulty,
    abilityEstimate,
    questionHistory: newQuestionHistory,
    usedQuestionIds: newUsedQuestionIds,
  };
};

export const shouldCompleteTest = (adaptiveState: AdaptiveTestState): boolean => {
  const { questionHistory } = adaptiveState;
  
  if (questionHistory.length < MIN_QUESTIONS) {
    return false;
  }

  if (questionHistory.length >= MAX_QUESTIONS) {
    return true;
  }

  // 移除粗暴的“连续答对或答错5题就交卷”的判定。
  // 在真实的 Aon 测试中，时间耗尽才是终止的主要条件。
  // 这里的自适应逻辑仅用于“提前达到能力收敛”的判断。
  // 我们使用方差来判断难度是否收敛：如果最近8题的难度方差极小，说明已经测出了真实水平。
  if (questionHistory.length >= 8) {
    const recentAnswers = questionHistory.slice(-8);
    const difficulties = recentAnswers.map(a => a.difficulty);
    const mean = difficulties.reduce((sum, d) => sum + d, 0) / difficulties.length;
    const variance = difficulties.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / difficulties.length;
    
    // 如果难度波动小于 0.05，说明已经收敛
    if (variance < 0.05) {
      return true;
    }
  }

  return false;
};
