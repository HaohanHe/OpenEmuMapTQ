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
    let patternDescription = '';
    
    // 根据难度选择模式
    if (difficulty <= 2) {
      // A B A B A B A B A
      for (let j = 0; j < 9; j++) sequence.push(j % 2 === 0 ? A : B);
      patternName = '交替 (A B A B)';
      patternDescription = `在这个序列中，图形应该是 ${A} 和 ${B} 交替出现，也就是第1个是 ${A}，第2个是 ${B}，第3个是 ${A}，以此类推。`;
    } else if (difficulty <= 4) {
      // A A B B A A B B A
      for (let j = 0; j < 9; j++) sequence.push(Math.floor(j / 2) % 2 === 0 ? A : B);
      patternName = '双重复 (A A B B)';
      patternDescription = `在这个序列中，图形应该是 ${A} 和 ${B} 各连续出现两次再交替，也就是 ${A}, ${A}, 然后 ${B}, ${B}，以此类推。`;
    } else {
      // A B C A B C A B C
      for (let j = 0; j < 9; j++) sequence.push([A, B, C][j % 3]);
      patternName = '三循环 (A B C A B C)';
      patternDescription = `在这个序列中，图形应该是以 ${A}, ${B}, ${C} 为一组，三个图形作为一个单元不断循环重复出现。`;
    }

    // 随机挑选一个位置打破规则 (不能是第一个，否则太容易被当成另一种规则)
    const errorIndex = getRandomInt(2, 8);
    const correctShape = sequence[errorIndex];
    let wrongShape = availableShapes[getRandomInt(3, 7)];
    // 确保 wrongShape 不是原本应该出现的形状
    if (wrongShape === correctShape) wrongShape = availableShapes[8] || availableShapes[4];
    
    sequence[errorIndex] = wrongShape;
    
    // 生成保姆级解析
    const explanation = `【解析】\n通过观察其他正确的图形，我们可以推断出正确的模式是：${patternName}。\n${patternDescription}\n\n如果你顺着这个规律往下数：\n- 第 ${errorIndex + 1} 个位置本该轮到 ${correctShape}\n- 但是它实际显示成了 ${wrongShape}\n\n因此，第 ${errorIndex + 1} 个图形破坏了规律，就是我们要找的“Odd One Out”。`;

    questions.push({
      id: `gen-scales-${Date.now()}-${i}`,
      type: 'aon_inductive_scales',
      content: '观察下面的图形序列，找出不符合规律的那一个',
      options: Array.from({ length: 9 }, (_, k) => k.toString()), // 0-8
      correctAnswer: errorIndex.toString(),
      explanation: explanation,
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
 * 生成 Aon Digit Challenge (数字推理/填空) 题目
 */
export const generateDigitChallenge = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    
    // 根据难度决定操作符和数字范围
    let operators = ['+', '-'];
    if (difficulty > 2) operators.push('*');
    // if (difficulty > 4) operators.push('/'); // 除法容易产生小数，在此场景中较难控制整数解，暂且用乘法增加难度
    
    const op = operators[getRandomInt(0, operators.length - 1)];
    
    let a, b, target;
    let equation = '';
    let placeholderCount = 2;
    let explanation = '';
    let correctAnswer = '';
    
    // 生成一个合法的等式
    if (op === '+') {
      a = getRandomInt(1, 9);
      b = getRandomInt(1, 9);
      target = a + b;
      equation = `? + ? = ${target}`;
      explanation = `我们需要找到两个数字，它们的和为 ${target}。一个合法的解是 ${a} 和 ${b}。`;
      correctAnswer = `${a}${b}`;
    } else if (op === '-') {
      a = getRandomInt(2, 9);
      b = getRandomInt(1, a - 1);
      target = a - b;
      equation = `? - ? = ${target}`;
      explanation = `我们需要找到两个数字，它们的差为 ${target}。一个合法的解是 ${a} 和 ${b}。`;
      correctAnswer = `${a}${b}`;
    } else if (op === '*') {
      a = getRandomInt(2, 9);
      b = getRandomInt(2, 9);
      target = a * b;
      equation = `? × ? = ${target}`;
      explanation = `我们需要找到两个数字，它们的乘积为 ${target}。一个合法的解是 ${a} 和 ${b}。`;
      correctAnswer = `${a}${b}`;
    }

    // 偶尔生成带有3个问号的高难度题 (比如 ? + ? - ? = X)
    if (difficulty >= 4 && Math.random() > 0.5) {
      placeholderCount = 3;
      a = getRandomInt(1, 9);
      b = getRandomInt(1, 9);
      let c = getRandomInt(1, a + b - 1); // 保证结果为正数
      target = a + b - c;
      equation = `? + ? - ? = ${target}`;
      explanation = `我们需要找到三个数字，满足前两个数字之和减去第三个数字等于 ${target}。一个合法的解是 ${a}, ${b} 和 ${c}。`;
      correctAnswer = `${a}${b}${c}`;
    }

    questions.push({
      id: `gen-digit-${Date.now()}-${i}`,
      type: 'aon_digit_challenge',
      content: '将数字填入等式中，使其成立',
      options: [],
      correctAnswer: correctAnswer, // 在 Digit Challenge 中，这个字段只是作为“一个合法示例”，实际评分会使用表达式计算器
      explanation: `【解析】\n${explanation}\n\n注意：这道题可能存在多个不同的合法答案，只要代入后等式成立即算正确。`,
      difficulty,
      isAonStyle: true,
      digitChallengeData: {
        equation,
        placeholderCount
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
  
  // 预定义的几个绝对正确的 4x4 拉丁方阵数字模板 (0-3)
  // 通过套用这些模板然后映射到真实的形状上，可以确保 100% 绝对不会有任何同行/同列重复
  const templates = [
    [
      [0, 1, 2, 3],
      [1, 0, 3, 2],
      [2, 3, 0, 1],
      [3, 2, 1, 0]
    ],
    [
      [0, 1, 2, 3],
      [2, 3, 0, 1],
      [3, 2, 1, 0],
      [1, 0, 3, 2]
    ],
    [
      [0, 1, 2, 3],
      [3, 2, 1, 0],
      [1, 0, 3, 2],
      [2, 3, 0, 1]
    ]
  ];
  
  // 随机挑一个模板
  const template = templates[getRandomInt(0, templates.length - 1)];
  
  // 随机打乱传入的4个形状的映射关系
  const mappedElements = shuffleArray(elements);
  
  // 根据模板填充网格
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i][j] = mappedElements[template[i][j]];
    }
  }
  
  return grid;
};

/**
 * 生成 Aon Gap Challenge (网格填充/符号数独) 题目
 */
export const generateGapChallenge = (count: number = 20): Question[] => {
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
 * 生成 Aon AP Reasoning (逻辑前提与结论推理测试) 题目
 */
export const generateApReasoning = (count: number = 20): Question[] => {
  const questions: Question[] = [];

  // AP Reasoning 属于高度结构化的逻辑题，分为不同类型的逻辑模板
  // 1. 集合重叠问题 (Some A are B -> Some B are A)
  // 2. 排序问题 (A > B, B > C -> A > C)
  // 3. 排班问题 (A before B, C after D)
  // 4. 充分必要条件 (If A then B, A is true -> B is true)
  // 5. 互斥集合 (All A are B, No C are B -> Some A are not C)

  const names = ['Jordan', 'Alex', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Sam', 'Jamie', 'Charlie', 'Avery'];
  const companies = ['Tee-Tech', 'BrightPath', 'Alpha Corp', 'Beta Inc', 'Gamma LLC', 'Delta Group'];
  
  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    const templateType = getRandomInt(1, 5);
    
    let content = '';
    let options: string[] = [];
    let correctAnswer = '';
    let explanation = '';
    let questionText = '根据以上信息，下列哪项陈述必然正确？';

    if (templateType === 1) {
      // 集合重叠问题 (Some A are B -> Some B are A)
      const groups1 = ['上白班的员工', '在研发部的员工', '有五年以上经验的员工', '负责北美市场的销售'];
      const groups2 = ['上双班', '负责测试工作', '会说法语', '有MBA学位'];
      const g1 = groups1[getRandomInt(0, groups1.length - 1)];
      const g2 = groups2[getRandomInt(0, groups2.length - 1)];
      
      content = `一些${g1}也${g2}。`;
      options = [
        `所有${g1}都${g2}。`,
        `一些${g1}不${g2}。`,
        `没有${g1}${g2}。`,
        `一些${g2}的员工不${g1}。`,
        `一些${g2}的员工也${g1}。`
      ];
      correctAnswer = `一些${g2}的员工也${g1}。`;
      explanation = `题目说明“一些${g1}也${g2}”，这意味着这两个群体之间有交集。因此必然有一些${g2}的员工也${g1}。`;
      
    } else if (templateType === 2) {
      // 排序问题
      const items = shuffleArray(['G', 'H', 'I', 'J', 'K', 'L']);
      // 设定的真实大小顺序为 items[0] > items[1] > items[2] > items[3] > items[4] > items[5]
      const [A, B, C, D, E, F] = items;
      
      content = `大楼里有六个会议室：${items.sort().join('、')}。\n\n• ${D} 比 ${E} 大。\n• ${B} 比 ${D} 大。\n• 有一个房间比 ${B} 小，但比 ${D} 大。\n• ${A} 比 ${B} 和 ${C} 都大。`;
      questionText = '根据以上信息，以下哪项是从大到小的可能排序？';
      
      const correctOrder = `${A}, ${B}, ${C}, ${D}, ${E}, ${F}`;
      
      options = shuffleArray([
        correctOrder,
        `${F}, ${E}, ${C}, ${A}, ${B}, ${D}`,
        `${D}, ${B}, ${F}, ${C}, ${A}, ${E}`,
        `${B}, ${A}, ${D}, ${C}, ${F}, ${E}`,
        `${A}, ${F}, ${B}, ${D}, ${C}, ${E}`
      ]);
      correctAnswer = correctOrder;
      explanation = `解析：
1. 根据“${D} 比 ${E} 大”，得知 ${D} > ${E}。
2. 根据“${B} 比 ${D} 大”，得知 ${B} > ${D}。
3. 根据“有一个房间比 ${B} 小，但比 ${D} 大”，说明 ${B} 和 ${D} 之间至少有一个房间，即 ${C} (因为 ${A} 是最大的)。
4. 根据“${A} 比 ${B} 和 ${C} 都大”，得知 ${A} > ${B} 且 ${A} > ${C}。
结合以上线索，唯一完全符合所有规则的顺序是：${correctOrder}。`;

    } else if (templateType === 3) {
      // 排班问题
      const nurses = shuffleArray(['C', 'D', 'E', 'F', 'G', 'H']);
      const [n1, n2, n3, n4, n5, n6] = nurses;
      // 真实顺序: n6, n3, n5, n2, n1, n4
      
      content = `诊所有6名护士，他们的用餐时间必须安排好：${nurses.sort().join('、')}。\n\n规则如下：\n• ${n1} 必须在 ${n4} 之前用餐。\n• ${n3} 必须在 ${n2} 之前用餐。\n• ${n2} 必须在 ${n1} 之前用餐。\n• ${n5} 必须在 ${n6} 之后用餐。\n• ${n1} 不能紧挨着 ${n6} 用餐。`;
      questionText = '根据这些规则，以下哪项是可接受的用餐顺序？';
      
      const correctOrder = `${n6},${n3},${n5},${n2},${n1},${n4}`;
      
      options = shuffleArray([
        correctOrder,
        `${n1},${n3},${n6},${n5},${n2},${n4}`,
        `${n4},${n3},${n6},${n2},${n5},${n1}`,
        `${n3},${n2},${n6},${n1},${n4},${n5}`,
        `${n6},${n3},${n1},${n2},${n4},${n5}`
      ]);
      correctAnswer = correctOrder;
      explanation = `解析：
规则梳理：
1. ${n1} < ${n4}
2. ${n3} < ${n2}
3. ${n2} < ${n1}
4. ${n6} < ${n5}
5. ${n1} 和 ${n6} 不能相邻

结合前三条规则，形成一条清晰的时间链：${n3} < ${n2} < ${n1} < ${n4}。
再结合第四条规则：${n6} < ${n5}。
检查选项 ${correctOrder}：
位置：1.${n6}, 2.${n3}, 3.${n5}, 4.${n2}, 5.${n1}, 6.${n4}
- ${n1}(第5) 在 ${n4}(第6) 之前 (符合)
- ${n3}(第2) 在 ${n2}(第4) 之前 (符合)
- ${n2}(第4) 在 ${n1}(第5) 之前 (符合)
- ${n5}(第3) 在 ${n6}(第1) 之后 (符合)
- ${n1}(第5) 和 ${n6}(第1) 不相邻 (符合)
完美满足所有条件。`;

    } else if (templateType === 4) {
      // 充分必要条件 (找错误项)
      const company = companies[getRandomInt(0, companies.length - 1)];
      const name = names[getRandomInt(0, names.length - 1)];
      
      content = `${company} 有一个顾问团队。所有首席顾问都有超过一年的经验。所有运行高管研讨会的顾问都拥有MBA学位。所有处理多个研讨会主题的顾问都是首席顾问。所有提供金融研讨会的顾问都拥有MBA学位。${name}运行高管研讨会并处理多个研讨会主题。`;
      questionText = '假设这些陈述为真，以下哪项**可能为假**？';
      
      options = [
        `${name}有超过一年的经验。`,
        `${name}拥有MBA学位。`,
        `${name}是首席顾问。`,
        `${name}提供金融研讨会。`,
        `所有处理多个研讨会主题的顾问都有超过一年的经验。`
      ];
      correctAnswer = `${name}提供金融研讨会。`;
      explanation = `已知 ${name} 处理多个主题，所以他是首席顾问，因此有超过一年经验。他运行高管研讨会，所以他有MBA。但拥有MBA不代表他一定提供金融研讨会，这是充分条件的倒置，所以此项可能为假。`;

    } else {
      // 互斥集合
      const company = companies[getRandomInt(0, companies.length - 1)];
      const major1 = '计算机科学';
      const major2 = '文学';
      const role = '分析师';
      
      content = `${company} 在招聘 ${role}。他们发现所有前${major1}专业的学生都成为了${role}。他们还发现没有前${major2}专业的学生成为${role}。`;
      
      options = [
        `所有前${major2}专业的学生也是前${major1}专业的学生。`,
        `所有不是前${major2}专业的学生都是前${major1}专业的学生。`,
        `一些前${major1}专业的学生不是前${major2}专业的学生。`,
        `没有不是前${major1}专业的学生不是前${major2}专业的学生。`,
        `一些前${major2}专业的学生也是前${major1}专业的学生。`
      ];
      correctAnswer = `一些前${major1}专业的学生不是前${major2}专业的学生。`;
      explanation = `由于所有${major1}学生都成了${role}，而没有${major2}学生成为${role}，这两个集合之间不存在交集（至少对于成为分析师的那部分）。因此必然有一些${major1}学生不是${major2}学生。`;
    }

    questions.push({
      id: `gen-ap-reasoning-${Date.now()}-${i}`,
      type: 'aon_ap_reasoning',
      content: `${content}\n\n${questionText}`,
      options,
      correctAnswer,
      explanation,
      difficulty,
      isAonStyle: true
    });
  }

  return questions;
};

/**
 * 生成 Aon Numerical Reasoning (数字图表推理) 题目
 */
export const generateNumericalReasoning = (count: number = 20): Question[] => {
  const questions: Question[] = [];
  
  const categoriesList = [
    ['销售额', '研发成本', '营销费用', '管理费用', '净利润', '员工薪酬'],
    ['北美收入', '欧洲收入', '亚洲收入', '南美收入', '非洲收入'],
    ['智能手机', '笔记本电脑', '平板电脑', '智能手表', '配件'],
    ['一季度', '二季度', '三季度', '四季度']
  ];
  const tabNames = ['公司财务', '地区收入', '产品线销量', '季度业绩', '员工数据', '市场份额'];

  for (let i = 0; i < count; i++) {
    const difficulty = getRandomInt(1, 5);
    
    // 随机生成 4-6 个 Tab 页的数据
    const numTabs = getRandomInt(4, 6);
    const selectedTabNames = shuffleArray(tabNames).slice(0, numTabs);
    
    // 生成每个 Tab 的表格数据，并拼装成一个特殊的 Markdown 格式
    // 格式约定：[TAB:Tab名称]\n[TABLE]\n表格内容\n
    let dataSheet = '';
    const allTableData: Record<string, { categories: string[], years: string[], data: Record<string, Record<string, number>> }> = {};
    
    selectedTabNames.forEach(tabName => {
      const categories = categoriesList[getRandomInt(0, categoriesList.length - 1)];
      const years = ['2021', '2022', '2023', '2024'];
      
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
      
      allTableData[tabName] = { categories: selectedCategories, years: selectedYears, data: tableData };
      
      dataSheet += `[TAB:${tabName}]\n[TABLE]\n`;
      dataSheet += `项目 | ${selectedYears.join(' | ')}\n`;
      selectedCategories.forEach(cat => {
        const row = [cat, ...selectedYears.map(y => tableData[cat][y].toString())];
        dataSheet += `${row.join(' | ')}\n`;
      });
      dataSheet += '\n(单位：百万美元)\n\n';
    });

    // 随机选择一个 Tab 作为出题目标
    const targetTabName = selectedTabNames[getRandomInt(0, selectedTabNames.length - 1)];
    const targetTabData = allTableData[targetTabName];

    // 生成问题 (正确 / 错误 / 无法确定)
    const questionType = getRandomInt(0, 2); // 0: True, 1: False, 2: Cannot Say
    
    let content = '';
    let correctAnswer = '';
    let explanation = '';
    
    const randomCat = targetTabData.categories[getRandomInt(0, targetTabData.categories.length - 1)];
    const randomYear = targetTabData.years[getRandomInt(0, targetTabData.years.length - 1)];
    const actualValue = targetTabData.data[randomCat][randomYear];
    
    if (questionType === 0) { // True
      // 模糊描述大于/小于
      const offset = getRandomInt(10, 100);
      if (Math.random() > 0.5) {
        content = `在 ${randomYear} 年，${randomCat} 超过了 ${actualValue - offset} 百万美元。`;
      } else {
        content = `在 ${randomYear} 年，${randomCat} 低于 ${actualValue + offset} 百万美元。`;
      }
      correctAnswer = '正确';
      explanation = `在“${targetTabName}”标签页中，表格显示 ${randomYear} 年的 ${randomCat} 为 ${actualValue} 百万美元，这符合题目描述。`;
    } else if (questionType === 1) { // False
      const offset = getRandomInt(500, 1000);
      if (Math.random() > 0.5) {
        content = `在 ${randomYear} 年，${randomCat} 超过了 ${actualValue + offset} 百万美元。`;
      } else {
        content = `在 ${randomYear} 年，${randomCat} 低于 ${actualValue - offset} 百万美元。`;
      }
      correctAnswer = '错误';
      explanation = `在“${targetTabName}”标签页中，表格显示 ${randomYear} 年的 ${randomCat} 为 ${actualValue} 百万美元，这与题目描述矛盾。`;
    } else { // Cannot Say
      // 问一个不存在的年份或类别
      const missingYear = '2025';
      content = `在 ${missingYear} 年，${randomCat} 超过了 ${actualValue} 百万美元。`;
      correctAnswer = '无法确定';
      explanation = `在所有标签页中都没有提供 ${missingYear} 年的数据，因此无法确定该陈述的真伪。`;
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
