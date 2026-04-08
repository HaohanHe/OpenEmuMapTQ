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

  let newDifficulty = adaptiveState.currentDifficulty;
  if (isCorrect) {
    newDifficulty = Math.min(newDifficulty + DIFFICULTY_ADJUSTMENT, MAX_DIFFICULTY);
  } else {
    newDifficulty = Math.max(newDifficulty - DIFFICULTY_ADJUSTMENT, MIN_DIFFICULTY);
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

  const recentAnswers = questionHistory.slice(-5);
  if (recentAnswers.length === 5) {
    const correctCount = recentAnswers.filter((a) => a.isCorrect).length;
    if (correctCount === 0 || correctCount === 5) {
      return true;
    }
  }

  return false;
};
