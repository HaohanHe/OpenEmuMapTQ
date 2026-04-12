export type ShapeType = 'triangle' | 'circle' | 'star' | 'cross' | 'diamond' | 'hexagon' | 'square' | 'x';

export interface SwitchChallengeData {
  inputShapes: ShapeType[];
  outputShapes: ShapeType[];
  options: string[];
  intermediateShapes?: ShapeType[];
  firstCodeOptions?: string[];
  secondCodeOptions?: string[];
  isMultiStep?: boolean;
}

export interface GridChallengeData {
  grid: (ShapeType | null)[][];
  missingPosition: { row: number; col: number };
}

export interface ScalesIxData {
  allShapes: ShapeType[];
  oddOneOut: ShapeType;
  oddOneOutIndex: number;
}

export interface DigitChallengeData {
  equation: string;
  placeholderCount?: number;
  targetNumber?: number;
}

export interface GridInductiveData {
  exampleGrids: (string | null)[][][];
  questionGrids: (string | null)[][][];
  correctPairs: [number, number];
}

export interface GridFillData {
  grid: (string | null)[][];
  missingPosition: { row: number; col: number };
  options: (string | null)[][][];
}

export interface Question {
  id: string;
  type: string;
  content: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
  dataSheet?: string;
  isAonStyle?: boolean;
  switchChallengeData?: SwitchChallengeData;
  gridChallengeData?: GridChallengeData;
  scalesIxData?: ScalesIxData;
  digitChallengeData?: DigitChallengeData;
  gridInductiveData?: GridInductiveData;
  gridFillData?: GridFillData;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  quizType: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  userAnswers: UserAnswer[];
  completedAt: number;
}

export type QuizType = 'cognitive' | 'numerical' | 'verbal' | 'random' | 'aon_verbal' | 'aon_numerical' | 'aon_inductive' | 'aon_inductive_grid' | 'aon_deductive_switch' | 'aon_inductive_scales' | 'aon_ap_reasoning' | 'aon_gap_challenge' | 'aon_digit_challenge' | 'aon_applied_numeracy' | 'aon_inductive_grid_fill';

export type AonAnswer = 'TRUE' | 'FALSE' | 'CANNOT SAY';
