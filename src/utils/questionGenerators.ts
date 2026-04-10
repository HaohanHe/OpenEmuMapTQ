import { Question, ShapeType } from '@/types';

// 获取随机整数 [min, max]
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 打乱数组
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ALL_SHAPES: ShapeType[] = ['triangle', 'circle', 'star', 'cross', 'diamond', 'hexagon', 'square', 'x'];

/**
 * 根据操作符应用变换
 * @param input 输入数组
 * @param operator 形如 "3142" 的字符串
 * @returns 变换后的数组
 */
const applyOperator = (input: ShapeType[], operator: string): ShapeType[] => {
  const output: ShapeType[] = [];
  for (let i = 0; i < operator.length; i++) {
    const index = parseInt(operator[i], 10) - 1;
    output.push(input[index]);
  }
  return output;
};

/**
 * 生成随机的 Switch Challenge 操作符
 * @param length 长度，默认4
 */
const generateRandomOperator = (length: number = 4): string => {
  const indices = Array.from({ length }, (_, i) => i + 1);
  return shuffleArray(indices).join('');
};

/**
 * 生成一组混淆操作符
 */
const generateDistractors = (correctAnswer: string, count: number = 2): string[] => {
  const distractors = new Set<string>();
  const length = correctAnswer.length;
  
  while (distractors.size < count) {
    const randomOp = generateRandomOperator(length);
    if (randomOp !== correctAnswer) {
      distractors.add(randomOp);
    }
  }
  
  return Array.from(distractors);
};

/**
 * 生成 Aon Scales ix (归纳推理) 题目
 */
export const generateScalesIx = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    
    // 随机选出用于构造序列的形状
    const availableShapes = shuffleArray(ALL_SHAPES);
    const A = availableShapes[0];
    const B = availableShapes[1];
    const C = availableShapes[2];
    
    let sequence: ShapeType[] = [];
    let patternName = '';
    
    // 根据难度选择模式
    if (difficulty <= 2) {
      // A B A B A B A B A
      for (let j = 0; j < 9; j++) sequence.push(j % 2 === 0 ? A : B);
      patternName = '交替 (A B A B)';
    } else if (difficulty <= 4) {
      // A A B B A A B B A
      for (let j = 0; j < 9; j++) sequence.push(Math.floor(j / 2) % 2 === 0 ? A : B);
      patternName = '双重复 (A A B B)';
    } else {
      // A B C A B C A B C
      for (let j = 0; j < 9; j++) sequence.push([A, B, C][j % 3]);
      patternName = '三循环 (A B C A B C)';
    }

    // 随机挑选一个位置打破规则 (不能是第一个，否则太容易被当成另一种规则)
    const errorIndex = getRandomInt(2, 8);
    const correctShape = sequence[errorIndex];
    let wrongShape = availableShapes[getRandomInt(3, 7)];
    // 确保 wrongShape 不是原本应该出现的形状
    if (wrongShape === correctShape) wrongShape = availableShapes[8] || availableShapes[4];
    
    sequence[errorIndex] = wrongShape;

    questions.push({
      id: `gen-scales-${Date.now()}-${i}`,
      type: 'aon_inductive_scales',
      content: '观察下面的图形序列，找出不符合规律的那一个',
      options: Array.from({ length: 9 }, (_, k) => k.toString()), // 0-8
      correctAnswer: errorIndex.toString(),
      explanation: `正确的模式是 ${patternName}。第 ${errorIndex + 1} 个图形本应该是 ${correctShape}，但实际上是 ${wrongShape}。`,
      difficulty,
      isAonStyle: true,
      scalesIxData: {
        allShapes: sequence,
        oddOneOut: wrongShape,
        oddOneOutIndex: errorIndex,
      }
    });
  }

  return questions;
};

/**
 * 生成 4x4 拉丁方阵 (每一行每一列没有重复元素)
 */
const generateLatinSquare = (elements: ShapeType[]): ShapeType[][] => {
  const size = 4;
  const grid: ShapeType[][] = Array.from({ length: size }, () => Array(size).fill(null));
  
  // 随机排列第一行
  const firstRow = shuffleArray(elements);
  grid[0] = [...firstRow];
  
  // 对于4x4拉丁方阵，简单的行位移即可
  // 例如位移 1, 2, 3
  const shifts = shuffleArray([1, 2, 3]);
  
  for (let i = 1; i < size; i++) {
    const shift = shifts[i - 1];
    for (let j = 0; j < size; j++) {
      grid[i][j] = firstRow[(j + shift) % size];
    }
  }
  
  return grid;
};

/**
 * 生成 Aon Grid Challenge (网格填充) 题目
 */
export const generateGridChallenge = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    
    // 选出4种不同的形状
    const selectedShapes = shuffleArray(ALL_SHAPES).slice(0, 4);
    
    // 生成4x4拉丁方阵
    const grid = generateLatinSquare(selectedShapes);
    
    // 根据难度决定挖去几个洞 (虽然题目只问一个洞的答案，但可以挖去多个洞增加迷惑性)
    const missingCount = difficulty <= 2 ? 1 : (difficulty <= 4 ? 3 : 5);
    
    // 随机选出要挖去的位置
    const positions = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        positions.push({ row: r, col: c });
      }
    }
    const missingPositions = shuffleArray(positions).slice(0, missingCount);
    
    // 第一个挖去的位置就是我们需要用户填写的
    const targetPos = missingPositions[0];
    const correctAnswer = grid[targetPos.row][targetPos.col];
    
    // 将这些位置在 grid 中置为 null，除了 targetPos (前端可能会特殊渲染)
    const displayGrid: (ShapeType | null)[][] = JSON.parse(JSON.stringify(grid));
    missingPositions.forEach(pos => {
      displayGrid[pos.row][pos.col] = null;
    });

    questions.push({
      id: `gen-grid-${Date.now()}-${i}`,
      type: 'aon_gap_challenge',
      content: '找出完成网格的形状。任何行或列中都没有重复的形状。',
      options: selectedShapes,
      correctAnswer: correctAnswer,
      explanation: `通过观察第 ${targetPos.row + 1} 行和第 ${targetPos.col + 1} 列已有的形状，缺失的形状必须是 ${correctAnswer} 以满足每行每列不重复的规则。`,
      difficulty,
      isAonStyle: true,
      gridChallengeData: {
        grid: displayGrid,
        missingPosition: targetPos,
      }
    });
  }

  return questions;
};

/**
 * 生成 Aon Switch Challenge (演绎逻辑) 题目
 */
export const generateSwitchChallenge = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    // 决定难度 (1-5)
    // 1-2: 单步变换
    // 3-5: 双步变换
    const difficulty = getRandomInt(1, 5);
    const isMultiStep = difficulty >= 3;
    
    // 随机选择4个不重复的形状
    const inputShapes = shuffleArray(ALL_SHAPES).slice(0, 4);
    
    if (!isMultiStep) {
      // 单步变换
      const operator = generateRandomOperator(4);
      const outputShapes = applyOperator(inputShapes, operator);
      
      const options = shuffleArray([operator, ...generateDistractors(operator, 2)]);
      
      questions.push({
        id: `gen-switch-${Date.now()}-${i}`,
        type: 'aon_deductive_switch',
        content: '找出将输入更改为给定输出的正确代码',
        options,
        correctAnswer: operator,
        explanation: `输入形状按索引1,2,3,4排列，应用操作符 ${operator} 后，第1个位置变成了原第${operator[0]}个形状，以此类推。`,
        difficulty,
        isAonStyle: true,
        switchChallengeData: {
          inputShapes,
          outputShapes,
          options
        }
      });
    } else {
      // 双步变换
      const firstOperator = generateRandomOperator(4);
      const secondOperator = generateRandomOperator(4);
      
      const intermediateShapes = applyOperator(inputShapes, firstOperator);
      const outputShapes = applyOperator(intermediateShapes, secondOperator);
      
      const firstOptions = shuffleArray([firstOperator, ...generateDistractors(firstOperator, 2)]);
      const secondOptions = shuffleArray([secondOperator, ...generateDistractors(secondOperator, 2)]);
      
      const correctAnswer = `${firstOperator}-${secondOperator}`;
      const options = [correctAnswer]; // 在多步中，这个options字段只是为了兼容，组件内部不直接渲染这个大数组
      
      questions.push({
        id: `gen-switch-multi-${Date.now()}-${i}`,
        type: 'aon_deductive_switch',
        content: '找到两个正确的代码 - 第一个代码改变输入，第二个代码将结果改变为输出',
        options,
        correctAnswer,
        explanation: `第一步应用操作符 ${firstOperator} 得到中间结果，第二步应用操作符 ${secondOperator} 得到最终输出。`,
        difficulty,
        isAonStyle: true,
        switchChallengeData: {
          inputShapes,
          outputShapes,
          options,
          intermediateShapes,
          firstCodeOptions: firstOptions,
          secondCodeOptions: secondOptions,
          isMultiStep: true
        }
      });
    }
  }

  return questions;
};
