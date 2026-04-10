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
 * 生成 Aon Grid Inductive (3x3网格规则推理) 题目
 */
export const generateGridInductive = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  const ruleTypes = [
    'center_shape',       // 中心有一个特定形状
    'corner_shapes',      // 四个角是特定形状
    'middle_row_same',    // 中间一行都是同一个形状
    'diagonal_same',      // 主对角线相同
    'cross_pattern',      // 十字架模式相同
  ];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    const ruleType = ruleTypes[getRandomInt(0, ruleTypes.length - 1)];
    const targetShape = ALL_SHAPES[getRandomInt(0, ALL_SHAPES.length - 1)];
    const otherShapes = ALL_SHAPES.filter(s => s !== targetShape);

    // 辅助函数：生成一个完全随机的3x3网格
    const generateRandomGrid = () => {
      const grid: (ShapeType | null)[][] = Array.from({ length: 3 }, () => Array(3).fill(null));
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (Math.random() > 0.3) {
            grid[r][c] = ALL_SHAPES[getRandomInt(0, ALL_SHAPES.length - 1)];
          }
        }
      }
      return grid;
    };

    // 辅助函数：应用规则到网格
    const applyRule = (grid: (ShapeType | null)[][]) => {
      const newGrid = JSON.parse(JSON.stringify(grid));
      switch (ruleType) {
        case 'center_shape':
          newGrid[1][1] = targetShape;
          break;
        case 'corner_shapes':
          newGrid[0][0] = targetShape;
          newGrid[0][2] = targetShape;
          newGrid[2][0] = targetShape;
          newGrid[2][2] = targetShape;
          break;
        case 'middle_row_same':
          newGrid[1][0] = targetShape;
          newGrid[1][1] = targetShape;
          newGrid[1][2] = targetShape;
          break;
        case 'diagonal_same':
          newGrid[0][0] = targetShape;
          newGrid[1][1] = targetShape;
          newGrid[2][2] = targetShape;
          break;
        case 'cross_pattern':
          newGrid[0][1] = targetShape;
          newGrid[1][0] = targetShape;
          newGrid[1][1] = targetShape;
          newGrid[1][2] = targetShape;
          newGrid[2][1] = targetShape;
          break;
      }
      return newGrid;
    };

    // 辅助函数：破坏规则 (确保不符合该规则)
    const breakRule = (grid: (ShapeType | null)[][]) => {
      const newGrid = JSON.parse(JSON.stringify(grid));
      const wrongShape = otherShapes[getRandomInt(0, otherShapes.length - 1)];
      switch (ruleType) {
        case 'center_shape':
          newGrid[1][1] = wrongShape; // 强制不是目标形状
          break;
        case 'corner_shapes':
          newGrid[0][0] = wrongShape; // 至少一个角不是
          break;
        case 'middle_row_same':
          newGrid[1][1] = wrongShape; // 打破中间行
          break;
        case 'diagonal_same':
          newGrid[1][1] = wrongShape; // 打破对角线
          break;
        case 'cross_pattern':
          newGrid[1][1] = wrongShape; // 打破十字架
          break;
      }
      return newGrid;
    };

    // 生成2个示例网格 (符合规则)
    const exampleGrids = [
      applyRule(generateRandomGrid()),
      applyRule(generateRandomGrid())
    ];

    // 生成4个候选网格 (2个符合，2个不符合)
    const correctGrids = [
      applyRule(generateRandomGrid()),
      applyRule(generateRandomGrid())
    ];
    const wrongGrids = [
      breakRule(generateRandomGrid()),
      breakRule(generateRandomGrid())
    ];

    // 打乱4个候选网格
    const questionGridsCandidates = [
      { grid: correctGrids[0], isCorrect: true },
      { grid: correctGrids[1], isCorrect: true },
      { grid: wrongGrids[0], isCorrect: false },
      { grid: wrongGrids[1], isCorrect: false }
    ];
    const shuffledCandidates = shuffleArray(questionGridsCandidates);

    const questionGrids = shuffledCandidates.map(c => c.grid);
    
    // 找出正确的索引 (1-based)
    const correctIndices = shuffledCandidates
      .map((c, idx) => c.isCorrect ? idx + 1 : -1)
      .filter(idx => idx !== -1)
      .sort((a, b) => a - b);
      
    const correctAnswer = correctIndices.join(',');

    let ruleDescription = '';
    if (ruleType === 'center_shape') ruleDescription = `中心必须是 ${targetShape}`;
    if (ruleType === 'corner_shapes') ruleDescription = `四个角必须都是 ${targetShape}`;
    if (ruleType === 'middle_row_same') ruleDescription = `中间一行必须都是 ${targetShape}`;
    if (ruleType === 'diagonal_same') ruleDescription = `主对角线必须都是 ${targetShape}`;
    if (ruleType === 'cross_pattern') ruleDescription = `必须包含 ${targetShape} 组成的十字架`;

    questions.push({
      id: `gen-grid-inductive-${Date.now()}-${i}`,
      type: 'aon_inductive_grid',
      content: '观察左侧网格的规则，选择右侧两个遵循相同规则的网格',
      options: [],
      correctAnswer: correctAnswer,
      explanation: `这两个示例网格的共同规则是：${ruleDescription}。右侧网格中只有第 ${correctIndices[0]} 和第 ${correctIndices[1]} 个符合此规则。`,
      difficulty,
      isAonStyle: true,
      gridInductiveData: {
        exampleGrids,
        questionGrids,
        correctPairs: [correctIndices[0], correctIndices[1]]
      }
    });
  }

  return questions;
};

/**
 * 生成 Aon Numerical Reasoning (数字图表推理) 题目
 */
export const generateNumericalReasoning = (count: number = 20): Question[] => {
  const questions: Question[] = [];
  
  const categories = ['销售额', '研发成本', '营销费用', '管理费用', '净利润', '员工薪酬'];
  const years = ['2021', '2022', '2023', '2024'];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    
    // 随机生成一个数据表
    const numCategories = getRandomInt(3, 5);
    const selectedCategories = shuffleArray(categories).slice(0, numCategories);
    const numYears = getRandomInt(2, 4);
    const selectedYears = years.slice(years.length - numYears);
    
    const tableData: Record<string, Record<string, number>> = {};
    
    selectedCategories.forEach(cat => {
      tableData[cat] = {};
      selectedYears.forEach(year => {
        tableData[cat][year] = getRandomInt(1000, 9999);
      });
    });

    // 格式化表格为 Markdown 格式，因为 NumericalReasoning 组件支持 [TABLE] 标签
    let dataSheet = '[TABLE]\n';
    dataSheet += `项目 | ${selectedYears.join(' | ')}\n`;
    selectedCategories.forEach(cat => {
      const row = [cat, ...selectedYears.map(y => tableData[cat][y].toString())];
      dataSheet += `${row.join(' | ')}\n`;
    });
    dataSheet += '\n(单位：百万美元)';

    // 生成问题 (正确 / 错误 / 无法确定)
    const questionType = getRandomInt(0, 2); // 0: True, 1: False, 2: Cannot Say
    
    let content = '';
    let correctAnswer = '';
    let explanation = '';
    
    const randomCat = selectedCategories[getRandomInt(0, selectedCategories.length - 1)];
    const randomYear = selectedYears[getRandomInt(0, selectedYears.length - 1)];
    const actualValue = tableData[randomCat][randomYear];
    
    if (questionType === 0) { // True
      // 模糊描述大于/小于
      const offset = getRandomInt(10, 100);
      if (Math.random() > 0.5) {
        content = `在 ${randomYear} 年，${randomCat} 超过了 ${actualValue - offset} 百万美元。`;
      } else {
        content = `在 ${randomYear} 年，${randomCat} 低于 ${actualValue + offset} 百万美元。`;
      }
      correctAnswer = '正确';
      explanation = `表格显示 ${randomYear} 年的 ${randomCat} 为 ${actualValue} 百万美元，这符合题目描述。`;
    } else if (questionType === 1) { // False
      const offset = getRandomInt(500, 1000);
      if (Math.random() > 0.5) {
        content = `在 ${randomYear} 年，${randomCat} 超过了 ${actualValue + offset} 百万美元。`;
      } else {
        content = `在 ${randomYear} 年，${randomCat} 低于 ${actualValue - offset} 百万美元。`;
      }
      correctAnswer = '错误';
      explanation = `表格显示 ${randomYear} 年的 ${randomCat} 为 ${actualValue} 百万美元，这与题目描述矛盾。`;
    } else { // Cannot Say
      // 问一个不存在的年份或类别
      const missingYear = '2025';
      content = `在 ${missingYear} 年，${randomCat} 超过了 ${actualValue} 百万美元。`;
      correctAnswer = '无法确定';
      explanation = `表格中没有提供 ${missingYear} 年的数据，因此无法确定该陈述的真伪。`;
    }

    questions.push({
      id: `gen-numerical-${Date.now()}-${i}`,
      type: 'aon_numerical',
      content,
      options: ['正确', '错误', '无法确定'],
      correctAnswer,
      explanation,
      difficulty,
      isAonStyle: true,
      dataSheet
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
