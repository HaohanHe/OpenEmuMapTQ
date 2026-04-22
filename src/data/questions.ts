import { Question, ShapeType } from '../types';

function generateSwitchChallengeQuestions(): Question[] {
  const questions: Question[] = [];
  
  const cases = [
    {
      input: ['triangle', 'circle', 'cross', 'star'],
      output: ['triangle', 'circle', 'star', 'cross'],
      answer: '1-2-4-3',
      options: ['1-2-4-3', '2-1-3-4', '1-2-3-4'],
      difficulty: 2,
      explanation: '前两个形状（三角形和圆形）保持在原来的位置，没有变化。这意味着代码必须以1-2开头。最后两个形状（十字和星形）交换了位置，这意味着代码需要以-4-3结尾。综合起来，正确的代码是1-2-4-3。'
    },
    {
      input: ['cross', 'circle', 'triangle', 'star'],
      output: ['triangle', 'star', 'circle', 'cross'],
      answer: '3-4-2-1',
      options: ['3-4-2-1', '3-2-1-4', '1-3-2-4'],
      difficulty: 3,
      explanation: '最后两个形状（三角形和星形）现在位于第一（三角形）和第二（星形）位置，所以代码必须以3-4开头。第三个位置现在被圆形占据，所以下一部分是-2。最后一个位置现在是最初的第一个形状，所以代码必须以-1结尾。综合起来，完整的代码是3-4-2-1。'
    },
    {
      input: ['circle', 'star', 'cross', 'triangle'],
      output: ['triangle', 'circle', 'star', 'cross'],
      answer: '4-1-2-3',
      options: ['2-1-4-3', '3-1-2-4', '4-1-2-3'],
      difficulty: 3,
      explanation: '最后一个形状（三角形）移动到了输出的开头，所以代码必须以4开头。其余形状保持相同的顺序，只是移动到三角形之后的位置，这意味着代码的第二部分是-1-2-3。综合起来，4-1-2-3是正确的答案。'
    },
    {
      input: ['star', 'triangle', 'circle', 'cross'],
      output: ['cross', 'circle', 'star', 'triangle'],
      answer: '4-3-1-2',
      options: ['4-3-1-2', '3-4-2-1', '2-1-4-3'],
      difficulty: 3,
      explanation: '最后两个形状以相反的顺序移动到开头：十字（原本是4）现在是第一个，圆形（原本是3）现在是第二个。前两个形状以原始顺序移动到末尾：星形（原本是1）现在是第三个，三角形（原本是2）现在是第四个。所以代码是4-3-1-2。'
    },
    {
      input: ['circle', 'cross', 'star', 'triangle'],
      output: ['star', 'triangle', 'cross', 'circle'],
      answer: '3-4-2-1',
      options: ['1-2-3-4', '3-4-2-1', '4-3-2-1'],
      difficulty: 3,
      explanation: '第三个和第四个形状移动到了开头：星形（3）现在是第一个，三角形（4）现在是第二个。第二个形状移动到了第三个位置：十字（2）现在是第三个。第一个形状移动到了第四个位置：圆形（1）现在是第四个。所以代码是3-4-2-1。'
    },
    {
      input: ['triangle', 'circle', 'star', 'cross'],
      output: ['cross', 'star', 'circle', 'triangle'],
      answer: '4-3-2-1',
      options: ['4-3-2-1', '1-2-3-4', '2-1-4-3'],
      difficulty: 2,
      explanation: '所有形状都按相反顺序排列。第一个形状变成最后一个，最后一个变成第一个，中间两个交换位置。所以代码是4-3-2-1。'
    },
    {
      input: ['star', 'cross', 'triangle', 'circle'],
      output: ['star', 'triangle', 'cross', 'circle'],
      answer: '1-3-2-4',
      options: ['1-3-2-4', '1-2-3-4', '3-1-2-4'],
      difficulty: 2,
      explanation: '第一个和最后一个形状保持在原来的位置（1和4）。中间两个形状交换了位置：十字（2）和三角形（3）交换了。所以代码是1-3-2-4。'
    },
    {
      input: ['circle', 'triangle', 'cross', 'star'],
      output: ['triangle', 'circle', 'star', 'cross'],
      answer: '2-1-4-3',
      options: ['2-1-4-3', '1-2-4-3', '2-1-3-4'],
      difficulty: 2,
      explanation: '前两个形状交换了位置（1和2变成2和1），最后两个形状也交换了位置（3和4变成4和3）。所以代码是2-1-4-3。'
    },
    {
      input: ['cross', 'star', 'circle', 'triangle'],
      output: ['circle', 'triangle', 'cross', 'star'],
      answer: '3-4-1-2',
      options: ['3-4-1-2', '4-3-2-1', '1-2-3-4'],
      difficulty: 3,
      explanation: '最后两个形状以原始顺序移动到开头：圆形（3）现在是第一个，三角形（4）现在是第二个。前两个形状以原始顺序移动到末尾：十字（1）现在是第三个，星形（2）现在是第四个。所以代码是3-4-1-2。'
    },
    {
      input: ['triangle', 'star', 'circle', 'cross'],
      output: ['circle', 'star', 'triangle', 'cross'],
      answer: '3-2-1-4',
      options: ['3-2-1-4', '1-2-3-4', '2-1-4-3'],
      difficulty: 2,
      explanation: '第一个和第三个形状交换了位置：三角形（1）和圆形（3）交换了。第二个和第四个形状保持在原来的位置。所以代码是3-2-1-4。'
    },
    {
      input: ['star', 'circle', 'triangle', 'cross'],
      output: ['triangle', 'circle', 'cross', 'star'],
      answer: '3-2-4-1',
      options: ['3-2-4-1', '4-3-2-1', '1-2-3-4'],
      difficulty: 3,
      explanation: '第三个形状（三角形，3）移动到了第一个位置。第二个形状（圆形，2）保持不变。第四个形状（十字，4）移动到了第三个位置。第一个形状（星形，1）移动到了第四个位置。所以代码是3-2-4-1。'
    },
    {
      input: ['circle', 'cross', 'triangle', 'star'],
      output: ['star', 'triangle', 'circle', 'cross'],
      answer: '4-3-1-2',
      options: ['4-3-1-2', '1-2-3-4', '2-1-4-3'],
      difficulty: 3,
      explanation: '最后两个形状以相反的顺序移动到开头：星形（4）现在是第一个，三角形（3）现在是第二个。前两个形状以原始顺序移动到末尾：圆形（1）现在是第三个，十字（2）现在是第四个。所以代码是4-3-1-2。'
    },
    {
      input: ['cross', 'triangle', 'star', 'circle'],
      output: ['triangle', 'star', 'circle', 'cross'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '4-3-2-1'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以十字（1）移动到最后，三角形（2）到第一个，星形（3）到第二个，圆形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['triangle', 'cross', 'circle', 'star'],
      output: ['star', 'triangle', 'cross', 'circle'],
      answer: '4-1-2-3',
      options: ['4-1-2-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向右移动一个位置，最后一个形状环绕到开头。所以星形（4）移动到第一个，三角形（1）到第二个，十字（2）到第三个，圆形（3）到第四个。所以代码是4-1-2-3。'
    },
    {
      input: ['circle', 'star', 'cross', 'triangle'],
      output: ['circle', 'star', 'triangle', 'cross'],
      answer: '1-2-4-3',
      options: ['1-2-4-3', '1-2-3-4', '2-1-4-3'],
      difficulty: 1,
      explanation: '前两个形状保持不变（1和2）。最后两个形状交换了位置：十字（3）和三角形（4）交换了。所以代码是1-2-4-3。'
    },
    {
      input: ['star', 'cross', 'circle', 'triangle'],
      output: ['cross', 'star', 'triangle', 'circle'],
      answer: '2-1-4-3',
      options: ['2-1-4-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '前两个形状交换了位置（1和2变成2和1），最后两个形状也交换了位置（3和4变成4和3）。所以代码是2-1-4-3。'
    },
    {
      input: ['triangle', 'circle', 'cross', 'star'],
      output: ['circle', 'cross', 'star', 'triangle'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '4-3-2-1'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以三角形（1）移动到最后，圆形（2）到第一个，十字（3）到第二个，星形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['cross', 'star', 'triangle', 'circle'],
      output: ['star', 'triangle', 'circle', 'cross'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以十字（1）移动到最后，星形（2）到第一个，三角形（3）到第二个，圆形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['circle', 'triangle', 'star', 'cross'],
      output: ['cross', 'circle', 'triangle', 'star'],
      answer: '4-1-2-3',
      options: ['4-1-2-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向右移动一个位置，最后一个形状环绕到开头。所以十字（4）移动到第一个，圆形（1）到第二个，三角形（2）到第三个，星形（3）到第四个。所以代码是4-1-2-3。'
    },
    {
      input: ['star', 'circle', 'cross', 'triangle'],
      output: ['star', 'cross', 'circle', 'triangle'],
      answer: '1-3-2-4',
      options: ['1-3-2-4', '1-2-3-4', '3-1-2-4'],
      difficulty: 2,
      explanation: '第一个和最后一个形状保持在原来的位置（1和4）。中间两个形状交换了位置：圆形（2）和十字（3）交换了。所以代码是1-3-2-4。'
    },
    {
      input: ['cross', 'circle', 'star', 'triangle'],
      output: ['cross', 'star', 'circle', 'triangle'],
      answer: '1-3-2-4',
      options: ['1-3-2-4', '1-2-3-4', '2-3-4-1'],
      difficulty: 2,
      explanation: '第一个和最后一个形状保持在原来的位置（1和4）。中间两个形状交换了位置：圆形（2）和星形（3）交换了。所以代码是1-3-2-4。'
    },
    {
      input: ['triangle', 'cross', 'star', 'circle'],
      output: ['circle', 'triangle', 'cross', 'star'],
      answer: '4-1-2-3',
      options: ['4-1-2-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向右移动一个位置，最后一个形状环绕到开头。所以圆形（4）移动到第一个，三角形（1）到第二个，十字（2）到第三个，星形（3）到第四个。所以代码是4-1-2-3。'
    },
    {
      input: ['star', 'triangle', 'cross', 'circle'],
      output: ['triangle', 'cross', 'circle', 'star'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '4-3-2-1'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以星形（1）移动到最后，三角形（2）到第一个，十字（3）到第二个，圆形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['circle', 'star', 'triangle', 'cross'],
      output: ['cross', 'circle', 'star', 'triangle'],
      answer: '4-1-2-3',
      options: ['4-1-2-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向右移动一个位置，最后一个形状环绕到开头。所以十字（4）移动到第一个，圆形（1）到第二个，星形（2）到第三个，三角形（3）到第四个。所以代码是4-1-2-3。'
    },
    {
      input: ['cross', 'triangle', 'circle', 'star'],
      output: ['triangle', 'circle', 'star', 'cross'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '4-3-2-1'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以十字（1）移动到最后，三角形（2）到第一个，圆形（3）到第二个，星形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['triangle', 'star', 'cross', 'circle'],
      output: ['star', 'cross', 'circle', 'triangle'],
      answer: '2-3-4-1',
      options: ['2-3-4-1', '1-2-3-4', '4-3-2-1'],
      difficulty: 2,
      explanation: '所有形状向左移动一个位置，第一个形状环绕到末尾。所以三角形（1）移动到最后，星形（2）到第一个，十字（3）到第二个，圆形（4）到第三个。所以代码是2-3-4-1。'
    },
    {
      input: ['star', 'circle', 'triangle', 'cross'],
      output: ['cross', 'star', 'circle', 'triangle'],
      answer: '4-1-2-3',
      options: ['4-1-2-3', '1-2-3-4', '3-4-1-2'],
      difficulty: 2,
      explanation: '所有形状向右移动一个位置，最后一个形状环绕到开头。所以十字（4）移动到第一个，星形（1）到第二个，圆形（2）到第三个，三角形（3）到第四个。所以代码是4-1-2-3。'
    },
    {
      input: ['circle', 'cross', 'triangle', 'star'],
      output: ['circle', 'triangle', 'star', 'cross'],
      answer: '1-3-4-2',
      options: ['1-3-4-2', '1-2-3-4', '2-3-4-1'],
      difficulty: 3,
      explanation: '第一个形状保持不变（1）。中间两个形状和最后一个形状向右移动一个位置：十字（2）移动到最后，三角形（3）到第二个，星形（4）到第三个。所以代码是1-3-4-2。'
    },
    {
      input: ['cross', 'star', 'circle', 'triangle'],
      output: ['cross', 'circle', 'triangle', 'star'],
      answer: '1-3-4-2',
      options: ['1-3-4-2', '1-2-3-4', '2-3-4-1'],
      difficulty: 3,
      explanation: '第一个形状保持不变（1）。中间两个形状和最后一个形状向右移动一个位置：星形（2）移动到最后，圆形（3）到第二个，三角形（4）到第三个。所以代码是1-3-4-2。'
    },
    {
      input: ['triangle', 'circle', 'star', 'cross'],
      output: ['triangle', 'star', 'cross', 'circle'],
      answer: '1-3-4-2',
      options: ['1-3-4-2', '1-2-3-4', '2-3-4-1'],
      difficulty: 3,
      explanation: '第一个形状保持不变（1）。中间两个形状和最后一个形状向右移动一个位置：圆形（2）移动到最后，星形（3）到第二个，十字（4）到第三个。所以代码是1-3-4-2。'
    },
    {
      input: ['star', 'triangle', 'cross', 'circle'],
      output: ['star', 'cross', 'circle', 'triangle'],
      answer: '1-3-4-2',
      options: ['1-3-4-2', '1-2-3-4', '2-3-4-1'],
      difficulty: 3,
      explanation: '第一个形状保持不变（1）。中间两个形状和最后一个形状向右移动一个位置：三角形（2）移动到最后，十字（3）到第二个，圆形（4）到第三个。所以代码是1-3-4-2。'
    }
  ];

  cases.forEach((c, idx) => {
    const formatAnswer = (ans: string) => ans.replace(/-/g, '');
    const formatOptions = (opts: string[]) => opts.map(opt => opt.replace(/-/g, ''));
    
    questions.push({
      id: `switch-${idx + 1}`,
      type: 'aon_deductive_switch',
      content: '找出将输入更改为给定输出的正确代码',
      options: formatOptions(c.options),
      correctAnswer: formatAnswer(c.answer),
      explanation: c.explanation,
      difficulty: c.difficulty,
      isAonStyle: true,
      switchChallengeData: {
        inputShapes: c.input as ShapeType[],
        outputShapes: c.output as ShapeType[],
        options: formatOptions(c.options)
      }
    });
  });

  const multiStepCases = [
    {
      input: ['cross', 'triangle', 'star', 'circle'],
      intermediate: ['triangle', 'cross', 'circle', 'star'],
      output: ['circle', 'triangle', 'star', 'cross'],
      firstAnswer: '2143',
      secondAnswer: '3241',
      firstOptions: ['2143', '2413', '4231'],
      secondOptions: ['3241', '1234', '4321'],
      difficulty: 4,
      explanation: '在这种情况下，您有两行代码，其中第一个代码的输出作为第二个代码的输入。第一个代码将形状重新排列如下：三角形、十字、圆形、星形。您使用这个新顺序来找出正确的第二个代码：圆形移动到开头，所以代码需要以3开头。十字保持在第二个位置，所以代码的下一部分是-2。最后一个形状星形是下一个：-4。最后一个形状是之前的第一个形状，这意味着代码需要以-1结尾。综合起来，您得到3-2-4-1。'
    },
    {
      input: ['star', 'triangle', 'circle', 'cross'],
      intermediate: ['cross', 'triangle', 'circle', 'star'],
      output: ['cross', 'star', 'circle', 'triangle'],
      firstAnswer: '4231',
      secondAnswer: '1243',
      firstOptions: ['4231', '1234', '3214'],
      secondOptions: ['1243', '2314', '4321'],
      difficulty: 4,
      explanation: '在这种情况下，您有两行代码。第一个代码将形状重新排列如下：十字、三角形、圆形、星形。您使用这个新顺序来找出正确的第二个代码：十字保持在原位，三角形也是如此，所以代码以1-2开头。与中间输出相比，圆形和星形交换了位置，所以代码以-4-3结尾。因此，完整的正确代码是1-2-4-3。'
    },
    {
      input: ['circle', 'star', 'triangle', 'cross'],
      intermediate: ['star', 'circle', 'cross', 'triangle'],
      output: ['triangle', 'cross', 'circle', 'star'],
      firstAnswer: '2143',
      secondAnswer: '4321',
      firstOptions: ['2143', '1234', '3412'],
      secondOptions: ['4321', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码交换前两个和后两个形状：圆形和星形交换位置，三角形和十字交换位置，结果是星形、圆形、十字、三角形。第二个代码完全反转所有形状，结果是三角形、十字、圆形、星形。'
    },
    {
      input: ['triangle', 'cross', 'circle', 'star'],
      intermediate: ['circle', 'cross', 'triangle', 'star'],
      output: ['star', 'triangle', 'cross', 'circle'],
      firstAnswer: '3214',
      secondAnswer: '4321',
      firstOptions: ['3214', '1234', '2341'],
      secondOptions: ['4321', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将第三个形状（圆形）移动到第一个位置，保持其他形状的顺序：圆形、十字、三角形、星形。第二个代码完全反转所有形状，结果是星形、三角形、十字、圆形。'
    },
    {
      input: ['star', 'circle', 'cross', 'triangle'],
      intermediate: ['cross', 'circle', 'star', 'triangle'],
      output: ['triangle', 'star', 'circle', 'cross'],
      firstAnswer: '3214',
      secondAnswer: '4321',
      firstOptions: ['3214', '1234', '4123'],
      secondOptions: ['4321', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码交换第一个和第三个形状：星形和十字交换位置，结果是十字、圆形、星形、三角形。第二个代码完全反转所有形状，结果是三角形、星形、圆形、十字。'
    },
    {
      input: ['cross', 'circle', 'triangle', 'star'],
      intermediate: ['triangle', 'star', 'cross', 'circle'],
      output: ['circle', 'cross', 'star', 'triangle'],
      firstAnswer: '3412',
      secondAnswer: '4123',
      firstOptions: ['3412', '2143', '1234'],
      secondOptions: ['4123', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将第三个和第四个形状移动到开头：三角形（3）现在是第一个，星形（4）现在是第二个，前两个形状移动到末尾：十字（1）现在是第三个，圆形（2）现在是第四个。第二个代码将最后一个形状移动到开头，其他形状保持顺序：圆形（4）现在是第一个，十字（1）现在是第二个，星形（2）现在是第三个，三角形（3）现在是第四个。'
    },
    {
      input: ['triangle', 'star', 'circle', 'cross'],
      intermediate: ['star', 'triangle', 'cross', 'circle'],
      output: ['cross', 'circle', 'star', 'triangle'],
      firstAnswer: '2143',
      secondAnswer: '4312',
      firstOptions: ['2143', '1234', '3412'],
      secondOptions: ['4312', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码交换前两个和后两个形状：三角形和星形交换位置，圆形和十字交换位置，结果是星形、三角形、十字、圆形。第二个代码将最后两个形状移动到开头：十字（4）现在是第一个，圆形（3）现在是第二个，前两个形状移动到末尾：星形（1）现在是第三个，三角形（2）现在是第四个。'
    },
    {
      input: ['circle', 'cross', 'star', 'triangle'],
      intermediate: ['circle', 'star', 'triangle', 'cross'],
      output: ['triangle', 'cross', 'circle', 'star'],
      firstAnswer: '1342',
      secondAnswer: '4213',
      firstOptions: ['1342', '1234', '2341'],
      secondOptions: ['4213', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码保持第一个形状不变，将中间两个形状和最后一个形状向右移动：十字（2）移动到最后，星形（3）到第二个，三角形（4）到第三个。第二个代码将最后一个形状移动到开头：三角形（4）现在是第一个，十字（2）现在是第二个，圆形（1）现在是第三个，星形（3）现在是第四个。'
    },
    {
      input: ['star', 'triangle', 'cross', 'circle'],
      intermediate: ['triangle', 'cross', 'circle', 'star'],
      output: ['star', 'triangle', 'cross', 'circle'],
      firstAnswer: '2341',
      secondAnswer: '4123',
      firstOptions: ['2341', '1234', '3412'],
      secondOptions: ['4123', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将所有形状向左移动一个位置，第一个形状环绕到末尾：星形（1）移动到最后，三角形（2）到第一个，十字（3）到第二个，圆形（4）到第三个。第二个代码将最后一个形状移动到开头，其他形状保持顺序：星形（4）现在是第一个，三角形（1）现在是第二个，十字（2）现在是第三个，圆形（3）现在是第四个。'
    },
    {
      input: ['cross', 'star', 'circle', 'triangle'],
      intermediate: ['star', 'circle', 'triangle', 'cross'],
      output: ['cross', 'star', 'circle', 'triangle'],
      firstAnswer: '2341',
      secondAnswer: '4123',
      firstOptions: ['2341', '1234', '3412'],
      secondOptions: ['4123', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将所有形状向左移动一个位置，第一个形状环绕到末尾：十字（1）移动到最后，星形（2）到第一个，圆形（3）到第二个，三角形（4）到第三个。第二个代码将最后一个形状移动到开头，其他形状保持顺序：十字（4）现在是第一个，星形（1）现在是第二个，圆形（2）现在是第三个，三角形（3）现在是第四个。'
    },
    {
      input: ['triangle', 'circle', 'star', 'cross'],
      intermediate: ['cross', 'triangle', 'circle', 'star'],
      output: ['star', 'cross', 'triangle', 'circle'],
      firstAnswer: '4123',
      secondAnswer: '4123',
      firstOptions: ['4123', '1234', '3412'],
      secondOptions: ['4123', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将最后一个形状移动到开头，其他形状保持顺序：十字（4）现在是第一个，三角形（1）现在是第二个，圆形（2）现在是第三个，星形（3）现在是第四个。第二个代码再次将最后一个形状移动到开头，其他形状保持顺序：星形（4）现在是第一个，十字（1）现在是第二个，三角形（2）现在是第三个，圆形（3）现在是第四个。'
    },
    {
      input: ['circle', 'star', 'triangle', 'cross'],
      intermediate: ['cross', 'circle', 'star', 'triangle'],
      output: ['triangle', 'cross', 'circle', 'star'],
      firstAnswer: '4123',
      secondAnswer: '4123',
      firstOptions: ['4123', '1234', '3412'],
      secondOptions: ['4123', '1234', '2143'],
      difficulty: 4,
      explanation: '第一个代码将最后一个形状移动到开头，其他形状保持顺序：十字（4）现在是第一个，圆形（1）现在是第二个，星形（2）现在是第三个，三角形（3）现在是第四个。第二个代码再次将最后一个形状移动到开头，其他形状保持顺序：三角形（4）现在是第一个，十字（1）现在是第二个，圆形（2）现在是第三个，星形（3）现在是第四个。'
    }
  ];

  multiStepCases.forEach((c, idx) => {
    questions.push({
      id: `switch-multi-${idx + 1}`,
      type: 'aon_deductive_switch',
      content: '找出两个正确的代码 - 第一个代码更改输入，第二个代码将结果更改为输出',
      options: [],
      correctAnswer: `${c.firstAnswer}-${c.secondAnswer}`,
      explanation: c.explanation,
      difficulty: c.difficulty,
      isAonStyle: true,
      switchChallengeData: {
        inputShapes: c.input as ShapeType[],
        outputShapes: c.output as ShapeType[],
        options: [],
        intermediateShapes: c.intermediate as ShapeType[],
        firstCodeOptions: c.firstOptions,
        secondCodeOptions: c.secondOptions,
        isMultiStep: true
      }
    });
  });

  return questions;
}

function generateGridChallengeQuestions(): Question[] {
  const questions: Question[] = [];

  const shapes = ['circle', 'triangle', 'cross', 'star'] as ShapeType[];

  function generateValidGrid(): { grid: (ShapeType | null)[][], missing: { row: number, col: number }, answer: ShapeType } {
    const grid: ShapeType[][] = [];
    const usedRows: Set<string>[] = [new Set(), new Set(), new Set(), new Set()];
    const usedCols: Set<string>[] = [new Set(), new Set(), new Set(), new Set()];

    for (let row = 0; row < 4; row++) {
      grid[row] = [];
      const availableShapes = [...shapes].sort(() => Math.random() - 0.5);
      for (let col = 0; col < 4; col++) {
        for (const shape of availableShapes) {
          if (!usedRows[row].has(shape) && !usedCols[col].has(shape)) {
            grid[row][col] = shape;
            usedRows[row].add(shape);
            usedCols[col].add(shape);
            break;
          }
        }
      }
    }

    const missingRow = Math.floor(Math.random() * 4);
    const missingCol = Math.floor(Math.random() * 4);
    const answer = grid[missingRow][missingCol];
    const gridWithNull = grid.map((row, r) => 
      row.map((shape, c) => (r === missingRow && c === missingCol ? null : shape))
    );

    return { grid: gridWithNull, missing: { row: missingRow, col: missingCol }, answer };
  }

  for (let i = 0; i < 100; i++) {
    const { grid, missing, answer } = generateValidGrid();
    const difficulty = i < 30 ? 1 : (i < 70 ? 2 : 3);
    
    questions.push({
      id: `grid-${i + 1}`,
      type: 'aon_gap_challenge',
      content: '每个方格必须包含一个形状。每个形状在每行和每列中只能出现一次。哪个形状应该替换问号？',
      options: shapes,
      correctAnswer: answer,
      explanation: `第 ${missing.row + 1} 行已经包含：${grid[missing.row].filter(s => s !== null).join('、')}。第 ${missing.col + 1} 列已经包含：${grid.map(row => row[missing.col]).filter(s => s !== null).join('、')}。缺失的形状是 ${answer}。`,
      difficulty,
      isAonStyle: true,
      gridChallengeData: {
        grid,
        missingPosition: missing
      }
    });
  }

  return questions;
}

function generateScalesIxQuestions(): Question[] {
  const questions: Question[] = [];

  const patterns = [
    {
      allShapes: ['triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'circle', 'triangle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 7,
      difficulty: 1,
      explanation: '第8个是圆形，其他都是三角形。',
    },
    {
      allShapes: ['circle', 'circle', 'circle', 'star', 'circle', 'circle', 'circle', 'circle', 'circle'],
      oddOneOut: 'star',
      oddOneOutIndex: 3,
      difficulty: 1,
      explanation: '第4个是星形，其他都是圆形。',
    },
    {
      allShapes: ['square', 'square', 'triangle', 'square', 'square', 'square', 'square', 'square', 'square'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 2,
      difficulty: 1,
      explanation: '第3个是三角形，其他都是正方形。',
    },
    {
      allShapes: ['cross', 'cross', 'cross', 'cross', 'diamond', 'cross', 'cross', 'cross', 'cross'],
      oddOneOut: 'diamond',
      oddOneOutIndex: 4,
      difficulty: 2,
      explanation: '第5个是菱形，其他都是十字形。',
    },
    {
      allShapes: ['star', 'circle', 'star', 'star', 'star', 'star', 'star', 'star', 'star'],
      oddOneOut: 'circle',
      oddOneOutIndex: 1,
      difficulty: 2,
      explanation: '第2个是圆形，其他都是星形。',
    },
    {
      allShapes: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'triangle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 8,
      difficulty: 2,
      explanation: '第9个是三角形，其他都是六边形。',
    },
    {
      allShapes: ['diamond', 'diamond', 'square', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond'],
      oddOneOut: 'square',
      oddOneOutIndex: 2,
      difficulty: 2,
      explanation: '第3个是正方形，其他都是菱形。',
    },
    {
      allShapes: ['circle', 'star', 'circle', 'circle', 'circle', 'circle', 'star', 'circle', 'circle'],
      oddOneOut: 'star',
      oddOneOutIndex: 1,
      difficulty: 3,
      explanation: '虽然第7个也是星形，但第2个星形的位置打破了模式，它是第一个不符合规则的。正确答案是第2个。',
    },
    {
      allShapes: ['triangle', 'triangle', 'square', 'triangle', 'triangle', 'square', 'triangle', 'triangle', 'triangle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是两个三角形、一个正方形重复。第9个应该是正方形，但却是三角形。',
    },
    {
      allShapes: ['circle', 'cross', 'circle', 'cross', 'circle', 'cross', 'circle', 'circle', 'cross'],
      oddOneOut: 'circle',
      oddOneOutIndex: 7,
      difficulty: 3,
      explanation: '模式是圆形和十字交替。第8个应该是十字，但却是圆形。',
    },
    {
      allShapes: ['star', 'star', 'diamond', 'star', 'star', 'diamond', 'star', 'star', 'star'],
      oddOneOut: 'star',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是两个星形、一个菱形重复。第9个应该是菱形，但却是星形。',
    },
    {
      allShapes: ['square', 'hexagon', 'square', 'hexagon', 'square', 'hexagon', 'hexagon', 'hexagon', 'square'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 6,
      difficulty: 4,
      explanation: '模式是正方形和六边形交替。第7个应该是正方形，但却是六边形。',
    },
    {
      allShapes: ['triangle', 'circle', 'square', 'triangle', 'circle', 'square', 'triangle', 'circle', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 8,
      difficulty: 4,
      explanation: '模式是三角形、圆形、正方形重复。第9个应该是正方形，但却是圆形。',
    },
    {
      allShapes: ['cross', 'star', 'diamond', 'cross', 'star', 'diamond', 'cross', 'cross', 'diamond'],
      oddOneOut: 'cross',
      oddOneOutIndex: 7,
      difficulty: 4,
      explanation: '模式是十字、星形、菱形重复。第8个应该是星形，但却是十字。',
    },
    {
      allShapes: ['hexagon', 'triangle', 'circle', 'hexagon', 'triangle', 'circle', 'hexagon', 'triangle', 'triangle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 8,
      difficulty: 4,
      explanation: '模式是六边形、三角形、圆形重复。第9个应该是圆形，但却是三角形。',
    },
    {
      allShapes: ['circle', 'circle', 'cross', 'circle', 'circle', 'cross', 'circle', 'circle', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是两个圆形、一个十字重复。第9个应该是十字，但却是圆形。',
    },
    {
      allShapes: ['star', 'diamond', 'star', 'diamond', 'star', 'diamond', 'star', 'star', 'diamond'],
      oddOneOut: 'star',
      oddOneOutIndex: 7,
      difficulty: 3,
      explanation: '模式是星形和菱形交替。第8个应该是菱形，但却是星形。',
    },
    {
      allShapes: ['square', 'triangle', 'square', 'triangle', 'square', 'triangle', 'square', 'square', 'triangle'],
      oddOneOut: 'square',
      oddOneOutIndex: 7,
      difficulty: 3,
      explanation: '模式是正方形和三角形交替。第8个应该是三角形，但却是正方形。',
    },
    {
      allShapes: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 4,
      difficulty: 4,
      explanation: '所有形状都是六边形，但第5个六边形的大小或方向与其他不同。',
    },
    {
      allShapes: ['cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'star'],
      oddOneOut: 'star',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是星形，其他都是十字形。',
    },
    {
      allShapes: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle', 'circle', 'triangle', 'circle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 7,
      difficulty: 1,
      explanation: '第8个是三角形，其他都是圆形。',
    },
    {
      allShapes: ['star', 'star', 'star', 'star', 'star', 'star', 'star', 'star', 'square'],
      oddOneOut: 'square',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是正方形，其他都是星形。',
    },
    {
      allShapes: ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'cross'],
      oddOneOut: 'cross',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是十字形，其他都是菱形。',
    },
    {
      allShapes: ['hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是圆形，其他都是六边形。',
    },
    {
      allShapes: ['triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'triangle', 'square'],
      oddOneOut: 'square',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是正方形，其他都是三角形。',
    },
    {
      allShapes: ['square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'diamond'],
      oddOneOut: 'diamond',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是菱形，其他都是正方形。',
    },
    {
      allShapes: ['cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'cross', 'hexagon'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 8,
      difficulty: 1,
      explanation: '第9个是六边形，其他都是十字形。',
    },
    {
      allShapes: ['circle', 'cross', 'circle', 'cross', 'circle', 'cross', 'circle', 'cross', 'cross'],
      oddOneOut: 'circle',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是圆形和十字交替。第7个应该是十字，但却是圆形。',
    },
    {
      allShapes: ['triangle', 'square', 'triangle', 'square', 'triangle', 'square', 'triangle', 'square', 'square'],
      oddOneOut: 'square',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是三角形和正方形交替。第9个应该是三角形，但却是正方形。',
    },
    {
      allShapes: ['star', 'diamond', 'star', 'diamond', 'star', 'diamond', 'star', 'diamond', 'diamond'],
      oddOneOut: 'diamond',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是星形和菱形交替。第9个应该是星形，但却是菱形。',
    },
    {
      allShapes: ['hexagon', 'circle', 'hexagon', 'circle', 'hexagon', 'circle', 'hexagon', 'circle', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是六边形和圆形交替。第9个应该是六边形，但却是圆形。',
    },
    {
      allShapes: ['diamond', 'square', 'diamond', 'square', 'diamond', 'square', 'diamond', 'square', 'square'],
      oddOneOut: 'square',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是菱形和正方形交替。第9个应该是菱形，但却是正方形。',
    },
    {
      allShapes: ['cross', 'triangle', 'cross', 'triangle', 'cross', 'triangle', 'cross', 'triangle', 'triangle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是十字和三角形交替。第9个应该是十字，但却是三角形。',
    },
    {
      allShapes: ['square', 'circle', 'square', 'circle', 'square', 'circle', 'square', 'circle', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是正方形和圆形交替。第9个应该是正方形，但却是圆形。',
    },
    {
      allShapes: ['triangle', 'hexagon', 'triangle', 'hexagon', 'triangle', 'hexagon', 'triangle', 'hexagon', 'hexagon'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是三角形和六边形交替。第9个应该是三角形，但却是六边形。',
    },
    {
      allShapes: ['star', 'cross', 'star', 'cross', 'star', 'cross', 'star', 'cross', 'cross'],
      oddOneOut: 'cross',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是星形和十字交替。第9个应该是星形，但却是十字。',
    },
    {
      allShapes: ['circle', 'triangle', 'circle', 'triangle', 'circle', 'triangle', 'circle', 'triangle', 'triangle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 8,
      difficulty: 3,
      explanation: '模式是圆形和三角形交替。第9个应该是圆形，但却是三角形。',
    },
    // 新增模式
    {
      allShapes: ['square', 'square', 'circle', 'square', 'square', 'circle', 'square', 'circle', 'circle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 7,
      difficulty: 3,
      explanation: '模式是两个正方形、一个圆形重复。第8个应该是正方形，但却是圆形。',
    },
    {
      allShapes: ['diamond', 'cross', 'star', 'diamond', 'cross', 'cross', 'diamond', 'cross', 'star'],
      oddOneOut: 'cross',
      oddOneOutIndex: 5,
      difficulty: 4,
      explanation: '模式是菱形、十字、星形重复。第6个应该是星形，但却是十字。',
    },
    {
      allShapes: ['hexagon', 'hexagon', 'triangle', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'hexagon', 'triangle'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 5,
      difficulty: 3,
      explanation: '模式是两个六边形、一个三角形重复。第6个应该是三角形，但却是六边形。',
    },
    {
      allShapes: ['circle', 'circle', 'circle', 'triangle', 'triangle', 'triangle', 'circle', 'triangle', 'circle'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 7,
      difficulty: 4,
      explanation: '模式是三个圆形、三个三角形、三个圆形重复。第8个应该是圆形，但却是三角形。',
    },
    {
      allShapes: ['star', 'square', 'diamond', 'star', 'square', 'square', 'star', 'square', 'diamond'],
      oddOneOut: 'square',
      oddOneOutIndex: 5,
      difficulty: 4,
      explanation: '模式是星形、正方形、菱形重复。第6个应该是菱形，但却是正方形。',
    },
    {
      allShapes: ['cross', 'cross', 'star', 'cross', 'cross', 'star', 'cross', 'star', 'star'],
      oddOneOut: 'star',
      oddOneOutIndex: 7,
      difficulty: 3,
      explanation: '模式是两个十字、一个星形重复。第8个应该是十字，但却是星形。',
    },
    {
      allShapes: ['triangle', 'circle', 'triangle', 'circle', 'triangle', 'circle', 'circle', 'circle', 'triangle'],
      oddOneOut: 'circle',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是三角形和圆形交替。第7个应该是三角形，但却是圆形。',
    },
    {
      allShapes: ['square', 'hexagon', 'square', 'hexagon', 'hexagon', 'hexagon', 'square', 'hexagon', 'square'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 4,
      difficulty: 3,
      explanation: '模式是正方形和六边形交替。第5个应该是正方形，但却是六边形。',
    },
    {
      allShapes: ['diamond', 'diamond', 'cross', 'diamond', 'diamond', 'diamond', 'diamond', 'cross', 'cross'],
      oddOneOut: 'diamond',
      oddOneOutIndex: 5,
      difficulty: 3,
      explanation: '模式是两个菱形、一个十字重复。第6个应该是十字，但却是菱形。',
    },
    {
      allShapes: ['star', 'star', 'star', 'circle', 'circle', 'circle', 'star', 'circle', 'star'],
      oddOneOut: 'circle',
      oddOneOutIndex: 7,
      difficulty: 4,
      explanation: '模式是三个星形、三个圆形、三个星形重复。第8个应该是星形，但却是圆形。',
    },
    {
      allShapes: ['triangle', 'square', 'hexagon', 'triangle', 'square', 'square', 'triangle', 'square', 'hexagon'],
      oddOneOut: 'square',
      oddOneOutIndex: 5,
      difficulty: 4,
      explanation: '模式是三角形、正方形、六边形重复。第6个应该是六边形，但却是正方形。',
    },
    {
      allShapes: ['cross', 'diamond', 'cross', 'diamond', 'cross', 'diamond', 'diamond', 'diamond', 'cross'],
      oddOneOut: 'diamond',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是十字和菱形交替。第7个应该是十字，但却是菱形。',
    },
    {
      allShapes: ['circle', 'star', 'circle', 'star', 'circle', 'star', 'star', 'star', 'circle'],
      oddOneOut: 'star',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是圆形和星形交替。第7个应该是圆形，但却是星形。',
    },
    {
      allShapes: ['hexagon', 'triangle', 'hexagon', 'triangle', 'hexagon', 'triangle', 'triangle', 'triangle', 'hexagon'],
      oddOneOut: 'triangle',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是六边形和三角形交替。第7个应该是六边形，但却是三角形。',
    },
    {
      allShapes: ['square', 'cross', 'square', 'cross', 'square', 'cross', 'cross', 'cross', 'square'],
      oddOneOut: 'cross',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是正方形和十字交替。第7个应该是正方形，但却是十字。',
    },
    {
      allShapes: ['diamond', 'star', 'diamond', 'star', 'diamond', 'star', 'star', 'star', 'diamond'],
      oddOneOut: 'star',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是菱形和星形交替。第7个应该是菱形，但却是星形。',
    },
    {
      allShapes: ['triangle', 'cross', 'triangle', 'cross', 'cross', 'cross', 'triangle', 'cross', 'triangle'],
      oddOneOut: 'cross',
      oddOneOutIndex: 4,
      difficulty: 3,
      explanation: '模式是三角形和十字交替。第5个应该是三角形，但却是十字。',
    },
    {
      allShapes: ['circle', 'square', 'circle', 'square', 'circle', 'square', 'square', 'square', 'circle'],
      oddOneOut: 'square',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是圆形和正方形交替。第7个应该是圆形，但却是正方形。',
    },
    {
      allShapes: ['star', 'hexagon', 'star', 'hexagon', 'star', 'hexagon', 'hexagon', 'hexagon', 'star'],
      oddOneOut: 'hexagon',
      oddOneOutIndex: 6,
      difficulty: 3,
      explanation: '模式是星形和六边形交替。第7个应该是星形，但却是六边形。',
    },
  ];

  patterns.forEach((p, idx) => {
    questions.push({
      id: `scales-ix-${idx + 1}`,
      type: 'aon_inductive_scales',
      content: '观察下面的图形，找出不符合规则的那一个',
      options: [],
      correctAnswer: p.oddOneOutIndex.toString(),
      explanation: p.explanation,
      difficulty: p.difficulty,
      isAonStyle: true,
      scalesIxData: {
        allShapes: p.allShapes as ShapeType[],
        oddOneOut: p.oddOneOut as ShapeType,
        oddOneOutIndex: p.oddOneOutIndex,
      },
    });
  });

  return questions;
}

function generateDigitChallengeQuestions(): Question[] {
  return [
    {
      id: 'digit-1',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '92',
      explanation: '对于第一个数字，你需要一个大于7的数字，这样你才能减去一个数字得到7的结果。你可以使用9或8，然后使用相应的第二个数字（2或1）。',
      difficulty: 1,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? = 7',
        targetNumber: 7
      }
    },
    {
      id: 'digit-2',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '971',
      explanation: '前两个数字的和需要大于15，这样你才能在等式的第二部分减去一个数字。唯一可能的组合是9和7或9和8。8和8是不可能的，因为每个数字在每个问题中只能使用一次。9和7相加等于16，所以你需要减去1。9和8相加等于17，所以你需要减去2。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 15',
        targetNumber: 15
      }
    },
    {
      id: 'digit-3',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '9182',
      explanation: '你需要找到四个数字，当相加并减去两个数字后等于14。如果你选择最小的两个数字1和2作为减法，你需要寻找两个数字的组合，它们的和为17。只有一个可能的解决方案：9和8。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-4',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '685',
      explanation: '你需要找到数字，当括号中的数字相乘后再加上一个数字等于46。记住，你需要先计算括号内的乘法，例如(8×5)=40，然后加上最后一个数字，例如40+6=46。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + (? × ?) = 46',
        targetNumber: 46
      }
    },
    {
      id: 'digit-5',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '9753',
      explanation: '你需要找到两个数字相乘，然后减去另外两个数字，结果为55。首先，你需要寻找相乘后大于55的组合。可能的组合有9×8、9×7和8×7。9×8等于72，但72减去两个数字无法得到55（因为你已经使用了8和9）。8×7等于56，同样没有两个数字可以得到正确结果。而9×7等于63，与55的差是8，所以你需要寻找两个数字相加等于8，例如6+2和5+3（7+1不行，因为你已经在乘法中使用了7）。',
      difficulty: 4,
      isAonStyle: true,
      digitChallengeData: {
        equation: '(? × ?) - ? - ? = 55',
        targetNumber: 55
      }
    },
    {
      id: 'digit-6',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '81',
      explanation: '你需要两个数字，它们的差是7。8-1=7和9-2=7都是有效的解决方案。',
      difficulty: 1,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? = 7',
        targetNumber: 7
      }
    },
    {
      id: 'digit-7',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '982',
      explanation: '9+8-2=15。这是这个等式格式的另一个有效解决方案。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 15',
        targetNumber: 15
      }
    },
    {
      id: 'digit-8',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '8291',
      explanation: '8-2+9-1=14。这是这个等式格式的另一个有效解决方案。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-9',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '467',
      explanation: '4+(6×7)=46。这是这个等式格式的另一个有效解决方案。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + (? × ?) = 46',
        targetNumber: 46
      }
    },
    {
      id: 'digit-10',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '7962',
      explanation: '(7×9)-6-2=55。这是这个等式格式的另一个有效解决方案。',
      difficulty: 4,
      isAonStyle: true,
      digitChallengeData: {
        equation: '(? × ?) - ? - ? = 55',
        targetNumber: 55
      }
    },
    {
      id: 'digit-11',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '761',
      explanation: '7+(6×1)=13。这是等式格式的一个更简单的变体。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + (? × ?) = 13',
        targetNumber: 13
      }
    },
    {
      id: 'digit-12',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '954',
      explanation: '9×5-4=41。这是等式格式的一个更简单的变体。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 41',
        targetNumber: 41
      }
    },
    {
      id: 'digit-13',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '752',
      explanation: '7+5-2=10。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-14',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '863',
      explanation: '8×6-3=45。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 45',
        targetNumber: 45
      }
    },
    {
      id: 'digit-15',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '945',
      explanation: '9+(4×5)=29。这是一个加法和乘法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + (? × ?) = 29',
        targetNumber: 29
      }
    },
    {
      id: 'digit-16',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '8352',
      explanation: '8-3+5-2=8。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? - ? = 8',
        targetNumber: 8
      }
    },
    {
      id: 'digit-17',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '672',
      explanation: '6+7-2=11。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 11',
        targetNumber: 11
      }
    },
    {
      id: 'digit-18',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '987',
      explanation: '9×8-7=65。这是一个乘法和减法的组合等式。',
      difficulty: 4,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 65',
        targetNumber: 65
      }
    },
    {
      id: 'digit-19',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '783',
      explanation: '7+(8×3)=31。这是一个加法和乘法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + (? × ?) = 31',
        targetNumber: 31
      }
    },
    {
      id: 'digit-20',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '9531',
      explanation: '9-5+3+1=8。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? + ? = 8',
        targetNumber: 8
      }
    },
    {
      id: 'digit-21',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '93',
      explanation: '9-3=6。这是一个简单的减法等式。',
      difficulty: 1,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? = 6',
        targetNumber: 6
      }
    },
    {
      id: 'digit-22',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '871',
      explanation: '8+7-1=14。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-23',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '762',
      explanation: '7+6-2=11。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 11',
        targetNumber: 11
      }
    },
    {
      id: 'digit-24',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '981',
      explanation: '9+8-1=16。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 16',
        targetNumber: 16
      }
    },
    {
      id: 'digit-25',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '862',
      explanation: '8+6-2=12。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 12',
        targetNumber: 12
      }
    },
    {
      id: 'digit-26',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '753',
      explanation: '7+5-3=9。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 9',
        targetNumber: 9
      }
    },
    {
      id: 'digit-27',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '972',
      explanation: '9+7-2=14。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-28',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '853',
      explanation: '8+5-3=10。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-29',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '763',
      explanation: '7+6-3=10。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-30',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '963',
      explanation: '9+6-3=12。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 12',
        targetNumber: 12
      }
    },
    {
      id: 'digit-31',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '873',
      explanation: '8+7-3=12。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 12',
        targetNumber: 12
      }
    },
    {
      id: 'digit-32',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '754',
      explanation: '7+5-4=8。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 8',
        targetNumber: 8
      }
    },
    {
      id: 'digit-33',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '983',
      explanation: '9+8-3=14。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-34',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '864',
      explanation: '8+6-4=10。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-35',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '743',
      explanation: '7+4-3=8。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 8',
        targetNumber: 8
      }
    },
    {
      id: 'digit-36',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '973',
      explanation: '9+7-3=13。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 13',
        targetNumber: 13
      }
    },
    {
      id: 'digit-37',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '852',
      explanation: '8+5-2=11。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 11',
        targetNumber: 11
      }
    },
    {
      id: 'digit-38',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '764',
      explanation: '7+6-4=9。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 9',
        targetNumber: 9
      }
    },
    {
      id: 'digit-39',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '962',
      explanation: '9+6-2=13。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 13',
        targetNumber: 13
      }
    },
    {
      id: 'digit-40',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '874',
      explanation: '8+7-4=11。这是一个简单的加减法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? = 11',
        targetNumber: 11
      }
    },
    // 新增数字挑战问题
    {
      id: 'digit-41',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '954',
      explanation: '9-5+4=8。这是一个加减混合的等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? = 8',
        targetNumber: 8
      }
    },
    {
      id: 'digit-42',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '835',
      explanation: '8×3-5=19。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 19',
        targetNumber: 19
      }
    },
    {
      id: 'digit-43',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '725',
      explanation: '7+2×5=17。这是一个加法和乘法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? × ? = 17',
        targetNumber: 17
      }
    },
    {
      id: 'digit-44',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '639',
      explanation: '6×3+9=27。这是一个乘法和加法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? + ? = 27',
        targetNumber: 27
      }
    },
    {
      id: 'digit-45',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '546',
      explanation: '5×4-6=14。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-46',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '9876',
      explanation: '9-8+7+6=14。这是一个加减混合的等式。',
      difficulty: 4,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? + ? = 14',
        targetNumber: 14
      }
    },
    {
      id: 'digit-47',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '8723',
      explanation: '8+7-2-3=10。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-48',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '7612',
      explanation: '7+6+1-2=12。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? + ? - ? = 12',
        targetNumber: 12
      }
    },
    {
      id: 'digit-49',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '936',
      explanation: '9×3-6=21。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 21',
        targetNumber: 21
      }
    },
    {
      id: 'digit-50',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '654',
      explanation: '6+5+4=15。这是一个简单的加法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? + ? = 15',
        targetNumber: 15
      }
    },
    {
      id: 'digit-51',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '981',
      explanation: '9-8+1=2。这是一个加减混合的等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? = 2',
        targetNumber: 2
      }
    },
    {
      id: 'digit-52',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '743',
      explanation: '7×4-3=25。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 25',
        targetNumber: 25
      }
    },
    {
      id: 'digit-53',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '862',
      explanation: '8×6+2=50。这是一个乘法和加法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? + ? = 50',
        targetNumber: 50
      }
    },
    {
      id: 'digit-54',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '972',
      explanation: '9×7-2=61。这是一个乘法和减法的组合等式。',
      difficulty: 4,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 61',
        targetNumber: 61
      }
    },
    {
      id: 'digit-55',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '653',
      explanation: '6×5+3=33。这是一个乘法和加法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? + ? = 33',
        targetNumber: 33
      }
    },
    {
      id: 'digit-56',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '9875',
      explanation: '9-8+7+5=13。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? + ? = 13',
        targetNumber: 13
      }
    },
    {
      id: 'digit-57',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '8732',
      explanation: '8+7-3-2=10。这是一个加减混合的等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? - ? - ? = 10',
        targetNumber: 10
      }
    },
    {
      id: 'digit-58',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '765',
      explanation: '7+6+5=18。这是一个简单的加法等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? + ? + ? = 18',
        targetNumber: 18
      }
    },
    {
      id: 'digit-59',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '963',
      explanation: '9-6+3=6。这是一个加减混合的等式。',
      difficulty: 2,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? - ? + ? = 6',
        targetNumber: 6
      }
    },
    {
      id: 'digit-60',
      type: 'aon_digit_challenge',
      content: '选择数字1-9（每个数字只能使用一次）来正确完成等式',
      options: [],
      correctAnswer: '852',
      explanation: '8×5-2=38。这是一个乘法和减法的组合等式。',
      difficulty: 3,
      isAonStyle: true,
      digitChallengeData: {
        equation: '? × ? - ? = 38',
        targetNumber: 38
      }
    }
  ];
}

function generateGridInductiveQuestions(): Question[] {
  const questions: Question[] = [];

  const gridChallenges = [
    {
      examples: [
        [
          ['circle', 'cross', 'cross'],
          ['square', 'cross', 'cross'],
          ['triangle', 'cross', 'cross']
        ],
        [
          ['square', 'cross', 'cross'],
          ['triangle', 'cross', 'cross'],
          ['circle', 'cross', 'cross']
        ]
      ],
      questions: [
        [
          ['circle', 'cross', 'cross'],
          ['triangle', 'cross', 'cross'],
          ['square', 'cross', 'cross']
        ],
        [
          ['triangle', 'cross', 'cross'],
          ['square', 'cross', 'cross'],
          ['circle', 'cross', 'cross']
        ],
        [
          ['cross', 'cross', 'circle'],
          ['cross', 'cross', 'triangle'],
          ['cross', 'cross', 'square']
        ],
        [
          ['square', 'cross', 'cross'],
          ['circle', 'cross', 'cross'],
          ['triangle', 'cross', 'cross']
        ]
      ],
      answer: '1,2',
      explanation: '规则：第一列包含不同的形状，第二和第三列都是十字'
    },
    {
      examples: [
        [
          ['square', 'square', 'square'],
          ['square', 'square', 'square'],
          ['triangle', 'circle', 'cross']
        ],
        [
          ['triangle', 'triangle', 'triangle'],
          ['triangle', 'triangle', 'triangle'],
          ['circle', 'cross', 'square']
        ]
      ],
      questions: [
        [
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross'],
          ['square', 'triangle', 'circle']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle']
        ],
        [
          ['square', 'triangle', 'cross'],
          ['square', 'triangle', 'cross'],
          ['square', 'triangle', 'cross']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['triangle', 'square', 'cross']
        ]
      ],
      answer: '1,4',
      explanation: '规则：前两行都是相同的形状，第三行包含三个不同的形状'
    },
    {
      examples: [
        [
          ['circle', 'cross', 'cross'],
          ['triangle', 'cross', 'cross'],
          ['square', 'cross', 'cross']
        ],
        [
          ['square', 'cross', 'cross'],
          ['circle', 'cross', 'cross'],
          ['triangle', 'cross', 'cross']
        ]
      ],
      questions: [
        [
          ['cross', 'cross', 'circle'],
          ['cross', 'cross', 'triangle'],
          ['cross', 'cross', 'square']
        ],
        [
          ['triangle', 'cross', 'cross'],
          ['square', 'cross', 'cross'],
          ['circle', 'cross', 'cross']
        ],
        [
          ['circle', 'cross', 'cross'],
          ['square', 'cross', 'cross'],
          ['triangle', 'cross', 'cross']
        ],
        [
          ['cross', 'circle', 'cross'],
          ['cross', 'triangle', 'cross'],
          ['cross', 'square', 'cross']
        ]
      ],
      answer: '2,3',
      explanation: '规则：第一列包含不同的形状，第二和第三列都是十字'
    },
    {
      examples: [
        [
          ['square', 'square', 'square'],
          ['square', 'square', 'square'],
          ['triangle', 'circle', 'cross']
        ],
        [
          ['triangle', 'triangle', 'triangle'],
          ['triangle', 'triangle', 'triangle'],
          ['circle', 'cross', 'square']
        ]
      ],
      questions: [
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['square', 'triangle', 'cross']
        ],
        [
          ['square', 'square', 'square'],
          ['triangle', 'triangle', 'triangle'],
          ['circle', 'circle', 'circle']
        ],
        [
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross'],
          ['triangle', 'square', 'circle']
        ],
        [
          ['circle', 'triangle', 'square'],
          ['circle', 'triangle', 'square'],
          ['circle', 'triangle', 'square']
        ]
      ],
      answer: '1,3',
      explanation: '规则：前两行都是相同的形状，第三行包含三个不同的形状'
    },
    {
      examples: [
        [
          ['circle', 'cross', 'cross'],
          ['square', 'cross', 'cross'],
          ['triangle', 'cross', 'cross']
        ],
        [
          ['triangle', 'cross', 'cross'],
          ['circle', 'cross', 'cross'],
          ['square', 'cross', 'cross']
        ]
      ],
      questions: [
        [
          ['square', 'cross', 'cross'],
          ['triangle', 'cross', 'cross'],
          ['circle', 'cross', 'cross']
        ],
        [
          ['cross', 'square', 'cross'],
          ['cross', 'triangle', 'cross'],
          ['cross', 'circle', 'cross']
        ],
        [
          ['circle', 'cross', 'cross'],
          ['triangle', 'cross', 'cross'],
          ['square', 'cross', 'cross']
        ],
        [
          ['cross', 'cross', 'square'],
          ['cross', 'cross', 'triangle'],
          ['cross', 'cross', 'circle']
        ]
      ],
      answer: '1,3',
      explanation: '规则：第一列包含不同的形状，第二和第三列都是十字'
    },
    {
      examples: [
        [
          ['square', 'square', 'square'],
          ['square', 'square', 'square'],
          ['triangle', 'circle', 'cross']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['square', 'triangle', 'cross']
        ]
      ],
      questions: [
        [
          ['triangle', 'triangle', 'triangle'],
          ['triangle', 'triangle', 'triangle'],
          ['circle', 'square', 'cross']
        ],
        [
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross'],
          ['triangle', 'circle', 'square']
        ],
        [
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle']
        ],
        [
          ['circle', 'square', 'triangle'],
          ['circle', 'square', 'triangle'],
          ['circle', 'square', 'triangle']
        ]
      ],
      answer: '1,2',
      explanation: '规则：前两行都是相同的形状，第三行包含三个不同的形状'
    },
    // 新增网格归纳问题
    {
      examples: [
        [
          ['circle', 'triangle', 'square'],
          ['circle', 'triangle', 'square'],
          ['circle', 'triangle', 'square']
        ],
        [
          ['square', 'circle', 'triangle'],
          ['square', 'circle', 'triangle'],
          ['square', 'circle', 'triangle']
        ]
      ],
      questions: [
        [
          ['triangle', 'square', 'circle'],
          ['triangle', 'square', 'circle'],
          ['triangle', 'square', 'circle']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['triangle', 'triangle', 'triangle'],
          ['square', 'square', 'square']
        ],
        [
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle']
        ],
        [
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross']
        ]
      ],
      answer: '1,3',
      explanation: '规则：每列包含相同的形状，从左到右依次排列'
    },
    {
      examples: [
        [
          ['cross', 'circle', 'cross'],
          ['circle', 'cross', 'circle'],
          ['cross', 'circle', 'cross']
        ],
        [
          ['circle', 'cross', 'circle'],
          ['cross', 'circle', 'cross'],
          ['circle', 'cross', 'circle']
        ]
      ],
      questions: [
        [
          ['cross', 'circle', 'cross'],
          ['circle', 'cross', 'circle'],
          ['cross', 'circle', 'cross']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle']
        ],
        [
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross'],
          ['cross', 'cross', 'cross']
        ],
        [
          ['circle', 'cross', 'circle'],
          ['cross', 'circle', 'cross'],
          ['circle', 'cross', 'circle']
        ]
      ],
      answer: '1,4',
      explanation: '规则：圆形和十字交替排列，形成棋盘模式'
    },
    {
      examples: [
        [
          ['square', 'square', 'triangle'],
          ['square', 'square', 'triangle'],
          ['cross', 'cross', 'triangle']
        ],
        [
          ['circle', 'circle', 'cross'],
          ['circle', 'circle', 'cross'],
          ['triangle', 'triangle', 'cross']
        ]
      ],
      questions: [
        [
          ['triangle', 'triangle', 'circle'],
          ['triangle', 'triangle', 'circle'],
          ['square', 'square', 'circle']
        ],
        [
          ['cross', 'cross', 'square'],
          ['cross', 'cross', 'square'],
          ['circle', 'circle', 'square']
        ],
        [
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle'],
          ['square', 'triangle', 'circle']
        ],
        [
          ['circle', 'cross', 'triangle'],
          ['circle', 'cross', 'triangle'],
          ['circle', 'cross', 'triangle']
        ]
      ],
      answer: '1,2',
      explanation: '规则：第三列是相同的形状，前两列是另一种相同的形状'
    },
    {
      examples: [
        [
          ['circle', 'cross', 'circle'],
          ['cross', 'circle', 'cross'],
          ['circle', 'cross', 'circle']
        ],
        [
          ['triangle', 'square', 'triangle'],
          ['square', 'triangle', 'square'],
          ['triangle', 'square', 'triangle']
        ]
      ],
      questions: [
        [
          ['square', 'circle', 'square'],
          ['circle', 'square', 'circle'],
          ['square', 'circle', 'square']
        ],
        [
          ['cross', 'triangle', 'cross'],
          ['triangle', 'cross', 'triangle'],
          ['cross', 'triangle', 'cross']
        ],
        [
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
          ['circle', 'circle', 'circle']
        ],
        [
          ['square', 'square', 'square'],
          ['square', 'square', 'square'],
          ['square', 'square', 'square']
        ]
      ],
      answer: '1,2',
      explanation: '规则：形状以棋盘模式交替排列，第一行和第三行相同'
    }
  ];

  gridChallenges.forEach((challenge, idx) => {
    questions.push({
      id: `grid-inductive-${idx + 1}`,
      type: 'aon_inductive_grid',
      content: '观察左侧网格的规则，选择右侧两个遵循相同规则的网格',
      options: [],
      correctAnswer: challenge.answer,
      explanation: challenge.explanation,
      difficulty: 3,
      isAonStyle: true,
      gridInductiveData: {
        exampleGrids: challenge.examples as (string | null)[][][],
        questionGrids: challenge.questions as (string | null)[][][],
        correctPairs: challenge.answer.split(',').map(Number) as [number, number]
      }
    });
  });

  return questions;
}

function generateBasicVerbalQuestions(): Question[] {
  return [
    {
      id: 'verbal-1',
      type: 'aon_verbal',
      content: '该公司开始业务时销售不同的皮革制品，这些制品是从意大利以外的地方采购的。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '突出显示的句子明确说明该业务开始时销售进口皮革制品。"皮革制品"与"不同的皮革制品"含义相似，而它们是"进口"的意味着它们是"从意大利以外的地方采购的"。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '关于公司\n\n历史：Puccia是一家家族拥有的时尚公司，成立于意大利米兰，已经运营了40年。该业务开始时向富裕客户销售进口皮革制品，随着业务增长，家族决定自己制作皮革制品。\n\n他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。\n\n运营：自Puccia成立以来，公司已发展到在全球拥有超过300家门店，雇用12,000名员工。其总部位于意大利米兰。'
    },
    {
      id: 'verbal-2',
      type: 'aon_verbal',
      content: 'Puccia的价值观包括走出已知路径并尝试新的做事方式。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: 'Puccia的价值观表明他们"敢于不同思考"并"挑战现状"。两者都指的是一种接受新的和不同寻常的想法和行动的行为。"走出已知路径并尝试新的方式"具有类似的含义。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '价值观\n\n大胆 - 像我们的设计一样，我们在工作的各个方面都很大胆。我们敢于不同思考，并鼓励每个人都这样做。\n\n勇敢 - 我们在工作中表现出勇气。我们相信冒险，无畏地挑战现状并坚持我们的价值观。\n\n值得信赖 - 我们作为一个由杰出个人组成的全球连接团队工作，为了有效运作，我们依赖我们的同事。'
    },
    {
      id: 'verbal-3',
      type: 'aon_verbal',
      content: 'Puccia的新创意总监启动了一个新方向，其中声明公司计划减少浪费。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '我们无法确定公司减少浪费的决定是否由新创意总监启动。文章只说他们在创意总监到来的同时引入了新方向，但既没有提到减少浪费与"新方向"倡议之间的直接联系，也没有说明谁负责启动它。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '企业战略\n\n总体目标：Puccia的目标是创造让消费者感到特别的奢侈品。\n\n新方向：自从新创意总监到来后，该品牌决定扩大目标消费者并正在创建一个中性系列。他们还计划减少浪费并增加可持续发展努力。\n\n长期：人们相信Puccia最终将在未来5年内出售业务，并正在做出与此相一致的战略决策。'
    },
    {
      id: 'verbal-4',
      type: 'aon_verbal',
      content: '设计师可以加入Puccia的时装学校，该学校在其专门的在线平台上提供关于最新时尚的课程。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '尽管陈述的第一部分是正确的，但它声称时装学校提供在线课程。突出显示的部分说时装学校提供"现场课程"，这意味着它们在学校的建筑中进行。这与课程可在线获得的说法相矛盾。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '位置\n\n零售商店：商店位于欧洲、北美和亚洲。最强劲的市场在欧洲，拥有略超过160家门店。亚洲是下一个最强劲的市场，但其电子商务业务是全球最强劲的市场。澳大利亚和俄罗斯存在扩张机会，澳大利亚的第一家门店将在未来12个月内开业。\n\n工作室：工作室位于米兰、伦敦和加利福尼亚，是设计师合作和生产商品的创意场所。米兰工作室还设有一所时装学校，有抱负的设计师可以参加现场课程来发展他们的技能并了解时尚的最新技术和趋势。\n\n仓库：在米兰、伦敦和加利福尼亚有3个"超级"仓库，支持产品的全球分销。仓库运营在全球雇用5000名员工。'
    },
    {
      id: 'verbal-5',
      type: 'aon_verbal',
      content: '由于社交媒体广告，公司网站的流量在30-50岁女性群体中有所增加。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '文章说网站流量由于社交媒体广告而增加。但它没有说明为什么会这样。\n\n注意：在上一段中提到"最大的人口统计群体是30-50岁的女性"，所以人们可能会得出结论，这个人口统计群体一定增加了，使陈述为真。然而，这个人口统计群体属于社交媒体存在，而不是公司的网站。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '市场营销\n\n社交媒体：该品牌在社交媒体上拥有多平台存在。数据显示，最大的人口统计群体是30-50岁的女性。\n\n网站：由于社交媒体广告，网站流量多年来一直在增加。自推出新订阅者15%折扣促销以来，网站订阅者也有所增加，然而数据显示这些订阅者不会转化为重复购买。'
    },
    {
      id: 'verbal-6',
      type: 'aon_verbal',
      content: 'Puccia的总部与他们的一个工作室位于同一城市。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '从"关于公司"表格中，我们知道总部在米兰。从"位置"表格中，我们知道在米兰有一个工作室。因此，总部和一个工作室位于同一城市。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '关于公司\n\n历史：Puccia是一家家族拥有的时尚公司，成立于意大利米兰，已经运营了40年。该业务开始时向富裕客户销售进口皮革制品，随着业务增长，家族决定自己制作皮革制品。\n\n他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。\n\n运营：自Puccia成立以来，公司已发展到在全球拥有超过300家门店，雇用12,000名员工。其总部位于意大利米兰。\n\n位置\n\n零售商店：商店位于欧洲、北美和亚洲。最强劲的市场在欧洲，拥有略超过160家门店。亚洲是下一个最强劲的市场，但其电子商务业务是全球最强劲的市场。澳大利亚和俄罗斯存在扩张机会，澳大利亚的第一家门店将在未来12个月内开业。\n\n工作室：工作室位于米兰、伦敦和加利福尼亚，是设计师合作和生产商品的创意场所。米兰工作室还设有一所时装学校，有抱负的设计师可以参加现场课程来发展他们的技能并了解时尚的最新技术和趋势。\n\n仓库：在米兰、伦敦和加利福尼亚有3个"超级"仓库，支持产品的全球分销。仓库运营在全球雇用5000名员工。'
    },
    {
      id: 'verbal-7',
      type: 'aon_verbal',
      content: 'Puccia计划在未来一年内在俄罗斯开设他们的第一家门店。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '文章指出，澳大利亚的第一家门店将在未来12个月内开业，而不是俄罗斯。虽然俄罗斯被提到为扩张机会，但没有提到在未来一年内在那里开设门店。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '位置\n\n零售商店：商店位于欧洲、北美和亚洲。最强劲的市场在欧洲，拥有略超过160家门店。亚洲是下一个最强劲的市场，但其电子商务业务是全球最强劲的市场。澳大利亚和俄罗斯存在扩张机会，澳大利亚的第一家门店将在未来12个月内开业。\n\n工作室：工作室位于米兰、伦敦和加利福尼亚，是设计师合作和生产商品的创意场所。米兰工作室还设有一所时装学校，有抱负的设计师可以参加现场课程来发展他们的技能并了解时尚的最新技术和趋势。\n\n仓库：在米兰、伦敦和加利福尼亚有3个"超级"仓库，支持产品的全球分销。仓库运营在全球雇用5000名员工。'
    },
    {
      id: 'verbal-8',
      type: 'aon_verbal',
      content: '该公司在仓库运营中雇用的人员比任何其他部门都多。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '我们知道仓库运营在全球雇用5000名员工，总员工数为12,000。然而，我们没有关于其他部门员工数量的信息来进行比较。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '关于公司\n\n运营：自Puccia成立以来，公司已发展到在全球拥有超过300家门店，雇用12,000名员工。其总部位于意大利米兰。\n\n位置\n\n仓库：在米兰、伦敦和加利福尼亚有3个"超级"仓库，支持产品的全球分销。仓库运营在全球雇用5000名员工。'
    },
    {
      id: 'verbal-9',
      type: 'aon_verbal',
      content: 'Puccia的产品扩张从手袋开始，然后添加了其他产品类别。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章明确指出："他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。"这证实了扩张从手袋开始，然后添加了其他类别。',
      difficulty: 1,
      isAonStyle: true,
      dataSheet: '关于公司\n\n历史：Puccia是一家家族拥有的时尚公司，成立于意大利米兰，已经运营了40年。该业务开始时向富裕客户销售进口皮革制品，随着业务增长，家族决定自己制作皮革制品。\n\n他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。'
    },
    {
      id: 'verbal-10',
      type: 'aon_verbal',
      content: '15%折扣促销成功地将新订阅者转化为重复客户。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '文章指出："然而数据显示这些订阅者不会转化为重复购买。"这直接与促销成功将订阅者转化为重复客户的说法相矛盾。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '市场营销\n\n网站：由于社交媒体广告，网站流量多年来一直在增加。自推出新订阅者15%折扣促销以来，网站订阅者也有所增加，然而数据显示这些订阅者不会转化为重复购买。'
    },
    {
      id: 'verbal-11',
      type: 'aon_verbal',
      content: '在Puccia，大胆和勇敢本质上是相同的价值观。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '虽然这两种价值观都涉及勇气，但它们是不同的："大胆"强调不同思考，而"勇敢"强调冒险和挑战现状。它们相关但本质上不是相同的价值观。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '价值观\n\n大胆 - 像我们的设计一样，我们在工作的各个方面都很大胆。我们敢于不同思考，并鼓励每个人都这样做。\n\n勇敢 - 我们在工作中表现出勇气。我们相信冒险，无畏地挑战现状并坚持我们的价值观。'
    },
    {
      id: 'verbal-12',
      type: 'aon_verbal',
      content: 'Puccia肯定会在未来五年内被出售。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '文章说"人们相信Puccia最终将在未来5年内出售业务" - 这是一种信念，不是明确的陈述。我们不能确定它一定会发生。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '企业战略\n\n长期：人们相信Puccia最终将在未来5年内出售业务，并正在做出与此相一致的战略决策。'
    },
    // 新增Verbal问题
    {
      id: 'verbal-13',
      type: 'aon_verbal',
      content: 'Puccia的电子商务业务在欧洲市场表现最强劲。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '文章明确指出："亚洲是下一个最强劲的市场，但其电子商务业务是全球最强劲的市场。"这与陈述中电子商务业务在欧洲表现最强劲的说法相矛盾。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '位置\n\n零售商店：商店位于欧洲、北美和亚洲。最强劲的市场在欧洲，拥有略超过160家门店。亚洲是下一个最强劲的市场，但其电子商务业务是全球最强劲的市场。澳大利亚和俄罗斯存在扩张机会，澳大利亚的第一家门店将在未来12个月内开业。'
    },
    {
      id: 'verbal-14',
      type: 'aon_verbal',
      content: 'Puccia的价值观包括团队合作和相互依赖。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: 'Puccia的价值观中"值得信赖"部分提到："我们作为一个由杰出个人组成的全球连接团队工作，为了有效运作，我们依赖我们的同事。"这表明团队合作和相互依赖是其价值观的一部分。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '价值观\n\n大胆 - 像我们的设计一样，我们在工作的各个方面都很大胆。我们敢于不同思考，并鼓励每个人都这样做。\n\n勇敢 - 我们在工作中表现出勇气。我们相信冒险，无畏地挑战现状并坚持我们的价值观。\n\n值得信赖 - 我们作为一个由杰出个人组成的全球连接团队工作，为了有效运作，我们依赖我们的同事。'
    },
    {
      id: 'verbal-15',
      type: 'aon_verbal',
      content: 'Puccia的可持续发展努力包括减少浪费。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章明确指出："他们还计划减少浪费并增加可持续发展努力。"这表明减少浪费是其可持续发展努力的一部分。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '企业战略\n\n总体目标：Puccia的目标是创造让消费者感到特别的奢侈品。\n\n新方向：自从新创意总监到来后，该品牌决定扩大目标消费者并正在创建一个中性系列。他们还计划减少浪费并增加可持续发展努力。\n\n长期：人们相信Puccia最终将在未来5年内出售业务，并正在做出与此相一致的战略决策。'
    },
    {
      id: 'verbal-16',
      type: 'aon_verbal',
      content: 'Puccia的米兰工作室是其唯一设有时装学校的工作室。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章明确指出："米兰工作室还设有一所时装学校"，而没有提到其他工作室设有时装学校，因此可以推断米兰工作室是唯一设有时装学校的工作室。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '位置\n\n工作室：工作室位于米兰、伦敦和加利福尼亚，是设计师合作和生产商品的创意场所。米兰工作室还设有一所时装学校，有抱负的设计师可以参加现场课程来发展他们的技能并了解时尚的最新技术和趋势。'
    },
    {
      id: 'verbal-17',
      type: 'aon_verbal',
      content: 'Puccia的网站订阅者增加是由于社交媒体广告的影响。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '文章提到网站流量由于社交媒体广告而增加，同时也提到自推出新订阅者15%折扣促销以来，网站订阅者也有所增加。但没有明确说明订阅者增加的具体原因，因此无法确定是否是由于社交媒体广告的影响。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '市场营销\n\n社交媒体：该品牌在社交媒体上拥有多平台存在。数据显示，最大的人口统计群体是30-50岁的女性。\n\n网站：由于社交媒体广告，网站流量多年来一直在增加。自推出新订阅者15%折扣促销以来，网站订阅者也有所增加，然而数据显示这些订阅者不会转化为重复购买。'
    },
    {
      id: 'verbal-18',
      type: 'aon_verbal',
      content: 'Puccia的产品类别包括手袋、鞋类、配饰、女装和男装。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章明确指出："他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。"这证实了产品类别包括这些项目。',
      difficulty: 1,
      isAonStyle: true,
      dataSheet: '关于公司\n\n历史：Puccia是一家家族拥有的时尚公司，成立于意大利米兰，已经运营了40年。该业务开始时向富裕客户销售进口皮革制品，随着业务增长，家族决定自己制作皮革制品。\n\n他们的产品线从手袋开始，随后添加了鞋类、配饰、女装和男装。'
    },
    {
      id: 'verbal-19',
      type: 'aon_verbal',
      content: 'Puccia的仓库数量与其工作室数量相同。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章提到工作室位于米兰、伦敦和加利福尼亚，共3个；仓库也在米兰、伦敦和加利福尼亚有3个"超级"仓库。因此仓库数量与工作室数量相同。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '位置\n\n工作室：工作室位于米兰、伦敦和加利福尼亚，是设计师合作和生产商品的创意场所。\n\n仓库：在米兰、伦敦和加利福尼亚有3个"超级"仓库，支持产品的全球分销。'
    },
    {
      id: 'verbal-20',
      type: 'aon_verbal',
      content: 'Puccia的社交媒体存在主要针对30-50岁的女性。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '文章明确指出："数据显示，最大的人口统计群体是30-50岁的女性。"这表明其社交媒体存在主要针对这一群体。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '市场营销\n\n社交媒体：该品牌在社交媒体上拥有多平台存在。数据显示，最大的人口统计群体是30-50岁的女性。'
    },
    {
      id: 'verbal-evig-1',
      type: 'aon_verbal',
      content: '作为强化其市场定位战略的一部分，爱威格主要专注于它的国际新兴品牌。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「战略」表单原文完全一致',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-2',
      type: 'aon_verbal',
      content: '根据企业管理原则，爱威格的股东只能在股东会议中进行匿名投票。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '无法判断',
      explanation: '表单只说股东有权表决，未提投票方式',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-3',
      type: 'aon_verbal',
      content: '在美国，爱威格还供应洗涤剂。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「基地」表单：美国提供洗衣液和清洁剂',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-4',
      type: 'aon_verbal',
      content: '如果监事会必须同意执行委员会的某一决定，那么这一决定一定包括高级管理层薪酬的决定。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '监事会需同意的还包括"公司战略"，不只是薪酬',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-5',
      type: 'aon_verbal',
      content: '相对于针对年长男性的品牌，爱威格收购的品牌更多针对年长女性。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '无法判断',
      explanation: '表单提到年长女士和男士，但没比较数量',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-6',
      type: 'aon_verbal',
      content: '沃华德·诺尔斯博士在工业企业工作的年份比消费品生产商久。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '无法判断',
      explanation: '工业企业10年，消费品生产商年数未说明',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-7',
      type: 'aon_verbal',
      content: '爱威格清洁和洗涤产品部的顾客包括餐饮业的小公司。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「组织结构」表单明确提到',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-8',
      type: 'aon_verbal',
      content: '爱威格清洁和洗涤产品部门的目标群体只有私人家庭和餐饮或酒店业的公司。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '表单用词是"通常"，"只有"太绝对',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-9',
      type: 'aon_verbal',
      content: '只要有洗涤剂的国家，顾客就无法买到洗衣液。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '「基地」表单：在部分提供清洁剂的国家，也提供洗涤剂',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-10',
      type: 'aon_verbal',
      content: '在维护其所有现有品牌的过程中，爱威格为其国际新兴品牌腾出资源。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '表单说出售其他品牌腾出资源，不是维护所有品牌',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-11',
      type: 'aon_verbal',
      content: '爱威格供应的化妆品还包括面部和护发产品。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「产品和服务」表单明确提到',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-12',
      type: 'aon_verbal',
      content: '爱威格的国内附属企业也有责任遵守企业管理原则。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '无法判断',
      explanation: '表单只提执行委员会、监事会和伞式组织，未提"国内附属企业"',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-13',
      type: 'aon_verbal',
      content: '美容护肤品部提供身体护理产品和其他产品。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「产品和服务」表单：身体护理用品、美容产品、脸部、护发产品',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-14',
      type: 'aon_verbal',
      content: '汉斯·帕里斯博士受雇于名为 Roger & Tample 的美国消费品生产商。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '表单说的是"弗洛卡佩化妆品公司"',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-15',
      type: 'aon_verbal',
      content: '在爱威格学徒实习完后，劳拉·西蒙斯随即在该公司的管理发展部工作了一段时间。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「执行委员会」表单原文完全一致',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-16',
      type: 'aon_verbal',
      content: '在澳大利亚，爱威格化妆品和身体护理产品部门的首选目标客户并不是年轻女性。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '「基地」表单：澳大利亚倾向于提供针对年长女性的化妆品',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-17',
      type: 'aon_verbal',
      content: '爱威格执行委员会参与整个公司的行政管理。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '正确',
      explanation: '伞式组织为执行委员会管理整个集团提供支持',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    },
    {
      id: 'verbal-evig-18',
      type: 'aon_verbal',
      content: '爱威格的美容护肤品部仅面向女性群体。',
      options: ['正确', '错误', '无法判断'],
      correctAnswer: '错误',
      explanation: '「产品和服务」表单明确说"顾客既有女性，又有男性"',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: `组织结构

伞式组织：该组织为执行委员会管理整个集团提供支持。并非所有伞式组织的成员都是执行委员会的一员。汉斯帕里斯是执行委员会的委员。该伞式组织属下有三大产品部门：
清洁和洗涤（CW）：顾客通常是私人家庭和从事餐饮业或酒店业的大型或小型公司。大体说来，每个品牌会有各自的产品定位。CW生产和供应清洁剂产品。
化妆品和身体护理（CB）：该领域是爱威格公司最重要的部门，它为年龄较大的问题肌肤人群提供化妆品和身体护理用品。顾客既有女性，又有男性。
胶水（GH）：GH生产黏合剂和其他化合物。由于这个领域相当边缘，长期看来公司可能会从该领域撤出，虽然其具有重要战略意义。

执行委员会

汉斯·帕里斯博士：董事会主席兼工业工程师。他已经加入公司五年之久。在此之前，在曼海姆大学和密歇根大学取得博士学位以后，他在美国的弗洛卡佩化妆品公司工作了十年。
劳拉·西蒙斯：人力资源(HR)负责人。在爱威格完成学徒实习后，她在管理发展部门工作了一段时间，然后深造了心理学，之后又回到爱威格。经历了各种出国调动后，她成为人力资源负责人。
迈克尔·富勒：财务负责人，具有律师资格。首先，他作为工业工程师在一家跨国工业工程企业工作，然后来到爱威格成为法务部负责人，三年以后，又成为财务负责人。
沃华德·诺尔斯博士：营销/分销负责人兼注册经济师。之前的十年里，他受聘于美国一家工业企业和日本一家消费品生产商。随后，他加入了爱威格的董事会。

基地

化妆品和身体护理：在美国提供针对少女及年轻女士的化妆品，而在澳大利亚、日本、新加坡和巴西倾向于提供针对年长女性的化妆品。
清洁和洗涤：除了欧洲、美国和亚洲，在澳大利亚也提供洗衣液和清洁剂。在部分提供了清洁剂的国家，爱威格也提供洗涤剂。
胶水：区域焦点领域有欧洲、亚洲、北美及南美洲。在这些国家生产的粘合剂是为了贸易和建设而生产的。
区域焦点：在欧洲，尤其是在德国，爱威格的各个业务部门都占强势地位。如果将员工数量作为衡量标准，那么爱威格最重要的子公司在法兰克福。

产品和服务

粘合剂：除了特殊胶水，粘合剂还包括万能胶水、特殊材质专用粘合剂和胶水，以及固体胶。
清洁剂：爱威格生产各种通用的和专用的洗衣液及洗涤剂。随着产品日益多样化，爱威格还生产用于除水垢、抵抗细菌和真菌以及清洗多种特殊表面的特殊洗涤产品。
美容用品：在这方面，该公司生产身体护理用品，包括身体乳、油和霜。化妆品包括美容产品和脸部、护发产品。所有化妆品和身体护理产品都是针对男性或女性量身定做。
顾客咨询：关于粘合剂、洗衣液和清洁剂的问题都通过服务热线和电子邮件处理，旨在尽快妥善解答问题。

目标

企业管理原则：重要的是，执行委员会、监事会和伞式组织都有责任遵守这些原则。它包括：
股东权益：股东有权参与年度股东大会，并在会上行使表决权。
执行委员会和监事会的职责：执行委员会决定公司战略，并必须例行知会股东公司状况。执行委员会就公司战略和公司高管薪酬做决策时，须由监事会批准。
薪酬：执行委员会成员的薪酬由监事会决定，而执行委员会决定高级管理层的薪酬。
透明性：只有采用季度财务报告才能确保透明性。

战略

市场定位的强化
国际性新兴品牌：爱威格已在美国收购了些以年轻女士为目标客群的化妆品生产品牌。其中部分品牌同时也将年长女士与男士列为目标客群。为了配合这一战略，公司出售了其他品牌，以为新兴品牌腾出资源。
国际一线品牌：这些品牌的市场定位，可以通过优质的市场增长及其他来提高。此外，可以通过品牌家族的一体化营销管控来构建协同效应，并以此降低成本。
具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。`
    }
  ];
}

function generateBasicNumericalQuestions(): Question[] {
  return [
    {
      id: 'numerical-1',
      type: 'aon_numerical',
      content: '在第8财年，研究成本超过700万美元。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '答案可以通过在表格中找到"研究"和"第8年"来确定。在这里你可以看到成本为7,256。我们还可以看到这些数字以千美元为单位，因此你需要将给定的值乘以1,000。结果是720万，该陈述是正确的。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    },
    {
      id: 'numerical-2',
      type: 'aon_numerical',
      content: '鞋类和配饰的产品收入总和为3200万美元。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '你首先需要在图表中识别相关信息 - 鞋类和配饰是图表中的两个独立部分。你可以计算出它们占产品收入的45%（38% + 7%）。在图表下方，你还可以看到总产品收入为8600万美元。从这里，你可以计算出确切的金额，即8600万美元的45%，即38.7。然而，估计这个值可能更快更容易。45%几乎是50%，即总数的一半。8600万美元的50%是4300万美元。这与陈述中的3200万美元有很大差异。因此，该陈述很可能是错误的。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '产品收入\n\n- 夹克：20%\n- 手袋：35%\n- 鞋类：38%\n- 配饰：7%\n\n本年度的总产品收入为8600万美元。'
    },
    {
      id: 'numerical-3',
      type: 'aon_numerical',
      content: '第6财年的社交媒体线索比第3财年高6%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '表格没有提供第3财年的数据，因此我们无法确定第6财年的配饰收入是否比第3财年高6%。请记住，所有信息都可以在单个数据表中找到 - 你不需要跨多个信息表比较数据。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '线索生成\n\n财年        第6年    第5年    第4年\n社交媒体    10,005    9,345     8,990\n新闻通讯    3,500     4,620     5,620\n广告牌      2,500     2,450     2,345\n网站        1,254     1,500     1,367\n皮革展会    20,000    17,670    16,564\n时装秀      10,376    8,345     7,891\n其他        1,017     940       821\n总计        48,652    44,870    43,598'
    },
    {
      id: 'numerical-4',
      type: 'aon_numerical',
      content: '第6财年北美的员工比第5财年多1,500,000人。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '一旦我们在图表中找到北美，我们需要计算第5财年和第6财年之间的员工差异。正确的计算是3850 - 2300 = 1550。图表侧面的说明显示这是以千为单位，因此这代表1,550,000名员工。这意味着该陈述是错误的。数字很接近，但陈述不是要求近似值。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '员工\n\n财年        第4年    第5年    第6年\n亚洲        2,000     3,000     3,150\n欧洲        4,000     4,154     5,000\n北美        2,000     2,300     3,850\n\n员工数量以千为单位'
    },
    {
      id: 'numerical-5',
      type: 'aon_numerical',
      content: '与第FY+4财年相比，第FY+3财年的配饰和服装生产预测多200万件。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '无法确定',
      explanation: '我们可以看到FY+3年有配饰的信息，为3300万件。然而，没有FY+4年的信息。因此，我们无法确定增长会是多少。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '预测\n\n财年        鞋类    配饰    服装    手袋\nFY+1        1.5     25      9       9\nFY+2        1.2     27      8.2     10\nFY+3        1.2     33      7.2     10\n\n生产数量（百万）'
    },
    {
      id: 'numerical-6',
      type: 'aon_numerical',
      content: '在第8财年，娱乐成本为4,250,000美元。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '查看成本表格，第8年的娱乐成本为4,250千美元，即4,250,000美元。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    },
    {
      id: 'numerical-7',
      type: 'aon_numerical',
      content: '手袋和夹克占产品收入的一半以上。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '手袋占35%，夹克占20%，总计占产品收入的55%。55%超过50%（一半），所以该陈述是正确的。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '产品收入\n\n- 夹克：20%\n- 手袋：35%\n- 鞋类：38%\n- 配饰：7%\n\n本年度的总产品收入为8600万美元。'
    },
    {
      id: 'numerical-8',
      type: 'aon_numerical',
      content: '从第4年到第6年，总线索生成增加了超过10%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第4年的总数是43,598，第6年的总数是48,652。增加量为48,652 - 43,598 = 5,054。5,054 / 43,598 ≈ 11.6%，超过10%。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '线索生成\n\n财年        第6年    第5年    第4年\n社交媒体    10,005    9,345     8,990\n新闻通讯    3,500     4,620     5,620\n广告牌      2,500     2,450     2,345\n网站        1,254     1,500     1,367\n皮革展会    20,000    17,670    16,564\n时装秀      10,376    8,345     7,891\n其他        1,017     940       821\n总计        48,652    44,870    43,598'
    },
    {
      id: 'numerical-9',
      type: 'aon_numerical',
      content: '从第5年到第6年，亚洲的员工数量减少了。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '第5年亚洲有3,000名员工，第6年有3,150名。这是增加了150名员工，而不是减少。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '员工\n\n财年        第4年    第5年    第6年\n亚洲        2,000     3,000     3,150\n欧洲        4,000     4,154     5,000\n北美        2,000     2,300     3,850\n\n员工数量以千为单位'
    },
    {
      id: 'numerical-10',
      type: 'aon_numerical',
      content: '鞋类生产预测在所示的所有财年中保持完全相同。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '鞋类生产在FY+1年为150万件，FY+2年为120万件，FY+3年为120万件。从FY+1到FY+2有所减少，因此并非在所有年份都完全相同。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '预测\n\n财年        鞋类    配饰    服装    手袋\nFY+1        1.5     25      9       9\nFY+2        1.2     27      8.2     10\nFY+3        1.2     33      7.2     10\n\n生产数量（百万）'
    },
    {
      id: 'numerical-11',
      type: 'aon_numerical',
      content: '从第8年到第10年，总成本每年都在减少。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '总成本在第8年为21,292，第9年为24,930，第10年为34,134。这显示每年都在增加，而不是减少。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    },
    {
      id: 'numerical-12',
      type: 'aon_numerical',
      content: '鞋类产生的收入比手袋多。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '鞋类占产品收入的38%，而手袋占35%。38%大于35%，所以鞋类产生的收入更多。',
      difficulty: 1,
      isAonStyle: true,
      dataSheet: '产品收入\n\n- 夹克：20%\n- 手袋：35%\n- 鞋类：38%\n- 配饰：7%\n\n本年度的总产品收入为8600万美元。'
    },
    // 新增Numerical问题
    {
      id: 'numerical-13',
      type: 'aon_numerical',
      content: '第10年的研究成本比第8年增加了超过100%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第8年的研究成本为7,256千美元，第10年为15,240千美元。计算增长率：(15,240 - 7,256) / 7,256 * 100% ≈ 109.9%，超过了100%。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    },
    {
      id: 'numerical-14',
      type: 'aon_numerical',
      content: '第6财年的皮革展会线索是社交媒体线索的两倍。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第6财年的皮革展会线索为20,000，社交媒体线索为10,005，20,000约为10,005的两倍。',
      difficulty: 2,
      isAonStyle: true,
      dataSheet: '线索生成\n\n财年        第6年    第5年    第4年\n社交媒体    10,005    9,345     8,990\n新闻通讯    3,500     4,620     5,620\n广告牌      2,500     2,450     2,345\n网站        1,254     1,500     1,367\n皮革展会    20,000    17,670    16,564\n时装秀      10,376    8,345     7,891\n其他        1,017     940       821\n总计        48,652    44,870    43,598'
    },
    {
      id: 'numerical-15',
      type: 'aon_numerical',
      content: 'FY+3年的配饰生产预测比FY+1年增加了32%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: 'FY+1年的配饰生产预测为25百万，FY+3年为33百万。计算增长率：(33 - 25) / 25 * 100% = 32%，与陈述一致。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '预测\n\n财年        鞋类    配饰    服装    手袋\nFY+1        1.5     25      9       9\nFY+2        1.2     27      8.2     10\nFY+3        1.2     33      7.2     10\n\n生产数量（百万）'
    },
    {
      id: 'numerical-16',
      type: 'aon_numerical',
      content: '第10年的软件成本比第9年增加了15.7%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第9年的软件成本为6,250千美元，第10年为7,230千美元。计算增长率：(7,230 - 6,250) / 6,250 * 100% ≈ 15.7%，与陈述一致。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    },
    {
      id: 'numerical-17',
      type: 'aon_numerical',
      content: '第6财年的新闻通讯线索比第5财年减少了24.2%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第5财年的新闻通讯线索为4,620，第6财年为3,500。计算减少率：(4,620 - 3,500) / 4,620 * 100% ≈ 24.2%，与陈述一致。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '线索生成\n\n财年        第6年    第5年    第4年\n社交媒体    10,005    9,345     8,990\n新闻通讯    3,500     4,620     5,620\n广告牌      2,500     2,450     2,345\n网站        1,254     1,500     1,367\n皮革展会    20,000    17,670    16,564\n时装秀      10,376    8,345     7,891\n其他        1,017     940       821\n总计        48,652    44,870    43,598'
    },
    {
      id: 'numerical-18',
      type: 'aon_numerical',
      content: '夹克和配饰的产品收入总和为23.22万美元。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '错误',
      explanation: '夹克占20%，配饰占7%，总和为27%。总产品收入为8600万美元，27%的8600万美元是23.22百万美元，即2322万美元，而不是23.22万美元。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '产品收入\n\n- 夹克：20%\n- 手袋：35%\n- 鞋类：38%\n- 配饰：7%\n\n本年度的总产品收入为8600万美元。'
    },
    {
      id: 'numerical-19',
      type: 'aon_numerical',
      content: 'FY+2年的服装生产预测比FY+1年减少了8.9%。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: 'FY+1年的服装生产预测为9百万，FY+2年为8.2百万。计算减少率：(9 - 8.2) / 9 * 100% ≈ 8.9%，与陈述一致。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '预测\n\n财年        鞋类    配饰    服装    手袋\nFY+1        1.5     25      9       9\nFY+2        1.2     27      8.2     10\nFY+3        1.2     33      7.2     10\n\n生产数量（百万）'
    },
    {
      id: 'numerical-20',
      type: 'aon_numerical',
      content: '第10年的总成本是第8年的1.6倍。',
      options: ['正确', '错误', '无法确定'],
      correctAnswer: '正确',
      explanation: '第8年的总成本为21,292千美元，第10年为34,134千美元。计算倍数：34,134 / 21,292 ≈ 1.6，与陈述一致。',
      difficulty: 3,
      isAonStyle: true,
      dataSheet: '成本\n\n财年        第10年    第9年    第8年\n娱乐        5,156      4,230     4,250\n研究        15,240     8,960     7,256\n营销        6,000      5,000     4,000\n软件        7,230      6,250     5,256\n能源        248        150       170\n差旅        260        340       360\n总成本      34,134     24,930    21,292\n\n所有数据以千美元为单位'
    }
  ];
}

function generateAppliedNumeracyQuestions(): Question[] {
  return [
    {
      id: 'applied-1',
      type: 'aon_applied_numeracy',
      content: '一块土地长2.86公里。这是多少米？',
      options: ['286米', '2,860米', '28.6米', '28,600米'],
      correctAnswer: '2,860米',
      explanation: '1公里 = 1000米。因此2.86公里 = 2.86 * 1000 = 2,860米。',
      difficulty: 1,
      isAonStyle: true
    },
    {
      id: 'applied-2',
      type: 'aon_applied_numeracy',
      content: '飞机需要1分钟飞行8,500米。它的飞行速度是多少公里每小时？',
      options: ['141.67公里每小时', '0.14公里每小时', '705公里每小时', '510公里每小时'],
      correctAnswer: '510公里每小时',
      explanation: '速度 = 距离 / 时间。1分钟 = 1/60小时。因此，速度 = 8.5公里 / (1/60小时) = 510公里每小时。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-3',
      type: 'aon_applied_numeracy',
      content: '5名工人需要10小时粉刷一个房间。3名工人需要多长时间？',
      options: ['16.67小时', '12小时', '6小时', '18小时'],
      correctAnswer: '16.67小时',
      explanation: '粉刷房间所需的总工时 = 5名工人 * 10小时 = 50工时。因此，如果你只有3名工人，同样的任务将需要50工时 / 3名工人 = 16.67小时。注意，在一些问题中，你可以快速排除一些答案。例如，在这个问题中，如果你有更少的工人，完成任务应该需要更多的时间。因此，6小时明显不正确。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-4',
      type: 'aon_applied_numeracy',
      content: '18个盒子售价53.50美元。24个盒子多少钱？',
      options: ['77.50美元', '71.33美元', '59.50美元', '40.13美元'],
      correctAnswer: '71.33美元',
      explanation: '每个盒子的成本 = 53.50美元 / 18 = 2.97美元（略向下取整）。24个盒子的成本 = 2.97美元 * 24 = 71.28美元 - 因此这是最接近的答案。虽然你可以精确计算，但还有两种其他技术可能帮助你回答：i) 18/24简化为3/4。因此，可能更容易除以3然后乘以4。ii) 你可以将盒子的成本从53.50美元近似为54美元。54/18 = 3美元。24*3美元 = 72美元。由于18个盒子的实际成本略低于54美元，你知道24个的成本会略低于72美元。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-5',
      type: 'aon_applied_numeracy',
      content: '一件商品售价145美元，现在将以28%的折扣出售。现在它的价格是多少？',
      options: ['40.60美元', '117美元', '104.40美元', '140.94美元'],
      correctAnswer: '104.40美元',
      explanation: '要计算一个数字的28%，你可以乘以0.28（或除以100然后乘以28）。这是28%的折扣。这意味着现在的成本是100%-28% = 72%（或0.72）。因此，你可以采用两种方法：i) 将145美元乘以0.72（直接给出答案）。145美元 * 0.72 = 104.40美元。ii) 将145美元乘以0.28。这给你折扣金额40.60美元。现在从原始成本中减去这个金额：145美元 - 40.60美元 = 104.40美元。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-6',
      type: 'aon_applied_numeracy',
      content: '一个长方形花园长12米，宽8米。它的面积是多少平方米？',
      options: ['80平方米', '96平方米', '100平方米', '120平方米'],
      correctAnswer: '96平方米',
      explanation: '长方形的面积 = 长 * 宽 = 12 * 8 = 96平方米。',
      difficulty: 1,
      isAonStyle: true
    },
    {
      id: 'applied-7',
      type: 'aon_applied_numeracy',
      content: '一辆汽车在2.5小时内行驶180公里。它的平均速度是多少公里每小时？',
      options: ['60公里/小时', '72公里/小时', '75公里/小时', '80公里/小时'],
      correctAnswer: '72公里/小时',
      explanation: '平均速度 = 总距离 / 总时间 = 180公里 / 2.5小时 = 72公里/小时。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-8',
      type: 'aon_applied_numeracy',
      content: '一个正方形房间的边长为6米。房间的面积是多少平方米？',
      options: ['24平方米', '30平方米', '36平方米', '42平方米'],
      correctAnswer: '36平方米',
      explanation: '正方形的面积 = 边长 * 边长 = 6 * 6 = 36平方米。',
      difficulty: 1,
      isAonStyle: true
    },
    {
      id: 'applied-9',
      type: 'aon_applied_numeracy',
      content: '如果10升水将容器填充到25%的容量，容器的总容量是多少？',
      options: ['20升', '30升', '40升', '50升'],
      correctAnswer: '40升',
      explanation: '如果10升 = 25%，那么1% = 10 / 25 = 0.4升。因此100% = 0.4 * 100 = 40升。或者，25%是1/4，所以总容量 = 10 * 4 = 40升。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-10',
      type: 'aon_applied_numeracy',
      content: '一个圆形花园的半径为5米。它的周长是多少？（使用π = 3.14）',
      options: ['15.7米', '31.4米', '62.8米', '78.5米'],
      correctAnswer: '31.4米',
      explanation: '圆的周长 = 2 * π * 半径 = 2 * 3.14 * 5 = 31.4米。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'applied-11',
      type: 'aon_applied_numeracy',
      content: '将4,500克转换为千克。',
      options: ['0.45千克', '4.5千克', '45千克', '450千克'],
      correctAnswer: '4.5千克',
      explanation: '1千克 = 1000克。因此4,500克 = 4,500 / 1000 = 4.5千克。',
      difficulty: 1,
      isAonStyle: true
    },
    {
      id: 'applied-12',
      type: 'aon_applied_numeracy',
      content: '一种产品的价格从80美元上涨到100美元。百分比增长是多少？',
      options: ['20%', '25%', '30%', '35%'],
      correctAnswer: '25%',
      explanation: '增长金额 = 100美元 - 80美元 = 20美元。百分比增长 = (增长 / 原始价格) * 100 = (20 / 80) * 100 = 25%。',
      difficulty: 2,
      isAonStyle: true
    }
  ];
}

function generateAPReasoningQuestions(): Question[] {
  return [
    {
      id: 'ap-1',
      type: 'aon_ap_reasoning',
      content: '一些工作日班的员工也工作双班。',
      options: [
        '所有工作日班的员工也工作双班。',
        '一些工作日班的员工不工作双班。',
        '没有工作日班的员工工作双班。',
        '一些工作双班的员工不工作日班。',
        '一些工作双班的员工也工作日班。'
      ],
      correctAnswer: '一些工作双班的员工也工作日班。',
      explanation: '题目中说"一些工作日班的员工也工作双班"，这意味着工作日班和双班之间有重叠。因此，必然存在一些工作双班的员工也工作日班。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-2',
      type: 'aon_ap_reasoning',
      content: '所有前计算机科学专业的学生都成为了分析师。没有前文学专业的学生成为分析师。',
      options: [
        '所有前文学专业的学生也是前计算机科学专业的学生。',
        '所有不是前文学专业的学生都是前计算机科学专业的学生。',
        '一些前计算机科学专业的学生不是前文学专业的学生。',
        '没有不是前计算机科学专业的学生不是前文学专业的学生。',
        '一些前文学专业的学生也是前计算机科学专业的学生。'
      ],
      correctAnswer: '一些前计算机科学专业的学生不是前文学专业的学生。',
      explanation: '因为所有前计算机科学专业的学生都成为了分析师，而没有前文学专业的学生成为分析师，所以必然存在一些前计算机科学专业的学生不是前文学专业的学生。',
      difficulty: 3,
      isAonStyle: true
    },
    {
      id: 'ap-3',
      type: 'aon_ap_reasoning',
      content: 'BrightPath Solutions的所有首席顾问都有超过一年的经验。所有运行高管研讨会的顾问都拥有工商管理硕士（MBA）学位。所有处理多个研讨会主题的顾问都是首席顾问。所有提供金融研讨会的顾问都拥有MBA学位。Jordan运行高管研讨会并处理多个研讨会主题。',
      options: [
        'Jordan有超过一年的经验。',
        'Jordan拥有MBA学位。',
        'Jordan是首席顾问。',
        'Jordan提供金融研讨会。',
        '所有处理多个研讨会主题的顾问都有超过一年的经验。'
      ],
      correctAnswer: 'Jordan提供金融研讨会。',
      explanation: 'Jordan处理多个研讨会主题，因此是首席顾问，拥有超过一年的经验。Jordan运行高管研讨会，因此拥有MBA学位。但没有信息表明Jordan提供金融研讨会。',
      difficulty: 3,
      isAonStyle: true
    },
    {
      id: 'ap-4',
      type: 'aon_ap_reasoning',
      content: '所有参加公司培训的员工都获得了晋升。有些参加培训的员工是新员工。',
      options: [
        '所有新员工都参加了培训。',
        '所有获得晋升的员工都参加了培训。',
        '有些新员工获得了晋升。',
        '没有新员工获得晋升。',
        '所有新员工都获得了晋升。'
      ],
      correctAnswer: '有些新员工获得了晋升。',
      explanation: '有些参加培训的员工是新员工，而所有参加培训的员工都获得了晋升，因此必然有些新员工获得了晋升。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-5',
      type: 'aon_ap_reasoning',
      content: '所有经理都有MBA学位。有些经理是女性。',
      options: [
        '所有女性都有MBA学位。',
        '所有有MBA学位的人都是经理。',
        '有些女性有MBA学位。',
        '没有女性有MBA学位。',
        '所有女性都是经理。'
      ],
      correctAnswer: '有些女性有MBA学位。',
      explanation: '有些经理是女性，而所有经理都有MBA学位，因此必然有些女性有MBA学位。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-6',
      type: 'aon_ap_reasoning',
      content: '所有工程师都懂编程。所有懂编程的人都懂数学。',
      options: [
        '所有懂数学的人都是工程师。',
        '所有工程师都懂数学。',
        '有些懂数学的人不是工程师。',
        '没有工程师懂数学。',
        '所有懂数学的人都懂编程。'
      ],
      correctAnswer: '所有工程师都懂数学。',
      explanation: '所有工程师都懂编程，而所有懂编程的人都懂数学，因此所有工程师都懂数学。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-7',
      type: 'aon_ap_reasoning',
      content: '有些销售经理有销售经验。所有有销售经验的人都懂市场营销。',
      options: [
        '所有销售经理都懂市场营销。',
        '有些销售经理懂市场营销。',
        '所有懂市场营销的人都有销售经验。',
        '没有销售经理懂市场营销。',
        '所有懂市场营销的人都是销售经理。'
      ],
      correctAnswer: '有些销售经理懂市场营销。',
      explanation: '有些销售经理有销售经验，而所有有销售经验的人都懂市场营销，因此有些销售经理懂市场营销。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-8',
      type: 'aon_ap_reasoning',
      content: '所有财务分析师都懂Excel。有些财务分析师懂Python。',
      options: [
        '所有懂Excel的人都是财务分析师。',
        '有些懂Python的人懂Excel。',
        '所有懂Python的人都是财务分析师。',
        '没有财务分析师懂Excel。',
        '所有懂Excel的人都懂Python。'
      ],
      correctAnswer: '有些懂Python的人懂Excel。',
      explanation: '有些财务分析师懂Python，而所有财务分析师都懂Excel，因此有些懂Python的人懂Excel。',
      difficulty: 2,
      isAonStyle: true
    },
    {
      id: 'ap-9',
      type: 'aon_ap_reasoning',
      content: '所有项目经理都有PMP认证。没有实习生有PMP认证。',
      options: [
        '所有实习生都是项目经理。',
        '有些实习生是项目经理。',
        '没有项目经理是实习生。',
        '所有有PMP认证的人都是项目经理。',
        '有些项目经理是实习生。'
      ],
      correctAnswer: '没有项目经理是实习生。',
      explanation: '所有项目经理都有PMP认证，而没有实习生有PMP认证，因此没有项目经理是实习生。',
      difficulty: 3,
      isAonStyle: true
    },
    {
      id: 'ap-10',
      type: 'aon_ap_reasoning',
      content: '有些软件开发者使用Java。所有使用Java的人都懂面向对象编程。',
      options: [
        '所有软件开发者都懂面向对象编程。',
        '有些软件开发者懂面向对象编程。',
        '所有懂面向对象编程的人都使用Java。',
        '没有软件开发者懂面向对象编程。',
        '所有懂面向对象编程的人都是软件开发者。'
      ],
      correctAnswer: '有些软件开发者懂面向对象编程。',
      explanation: '有些软件开发者使用Java，而所有使用Java的人都懂面向对象编程，因此有些软件开发者懂面向对象编程。',
      difficulty: 2,
      isAonStyle: true
    }
  ];
}

export const switchChallengeQuestions = generateSwitchChallengeQuestions();
export const gridChallengeQuestions = generateGridChallengeQuestions();
export const scalesIxQuestions = generateScalesIxQuestions();
export const digitChallengeQuestions = generateDigitChallengeQuestions();
export const gridInductiveQuestions = generateGridInductiveQuestions();
export const basicVerbalQuestions = generateBasicVerbalQuestions();
export const basicNumericalQuestions = generateBasicNumericalQuestions();
export const appliedNumeracyQuestions = generateAppliedNumeracyQuestions();
export const apReasoningQuestions = generateAPReasoningQuestions();

// 生成3x3网格填充题目
function generateGridFillQuestions(): Question[] {
  const questions: Question[] = [];
  
  const gridFillCases = [
    {
      grid: [
        ['circle', 'triangle', 'square'],
        ['triangle', 'square', 'circle'],
        ['square', null, 'triangle']
      ],
      missingPosition: { row: 2, col: 1 },
      options: [
        [['circle', 'triangle', 'square'], ['triangle', 'square', 'circle'], ['square', 'circle', 'triangle']],
        [['circle', 'circle', 'circle'], ['triangle', 'triangle', 'triangle'], ['square', 'square', 'square']],
        [['square', 'triangle', 'circle'], ['square', 'triangle', 'circle'], ['square', 'triangle', 'circle']],
        [['cross', 'cross', 'cross'], ['cross', 'cross', 'cross'], ['cross', 'cross', 'cross']],
        [['triangle', 'square', 'circle'], ['triangle', 'square', 'circle'], ['triangle', 'square', 'circle']],
        [['square', 'circle', 'triangle'], ['square', 'circle', 'triangle'], ['square', 'circle', 'triangle']]
      ],
      correctAnswer: '0',
      difficulty: 2,
      explanation: '规则：每一行的形状按顺序循环排列'
    },
    {
      grid: [
        ['cross', 'circle', 'cross'],
        ['circle', 'cross', 'circle'],
        ['cross', null, 'cross']
      ],
      missingPosition: { row: 2, col: 1 },
      options: [
        [['cross', 'circle', 'cross'], ['circle', 'cross', 'circle'], ['cross', 'circle', 'cross']],
        [['circle', 'circle', 'circle'], ['circle', 'circle', 'circle'], ['circle', 'circle', 'circle']],
        [['cross', 'cross', 'cross'], ['cross', 'cross', 'cross'], ['cross', 'cross', 'cross']],
        [['circle', 'cross', 'circle'], ['cross', 'circle', 'cross'], ['circle', 'cross', 'circle']],
        [['cross', 'cross', 'circle'], ['cross', 'circle', 'cross'], ['circle', 'cross', 'cross']],
        [['circle', 'circle', 'cross'], ['circle', 'cross', 'circle'], ['cross', 'circle', 'circle']]
      ],
      correctAnswer: '0',
      difficulty: 2,
      explanation: '规则：圆形和十字交替排列，形成棋盘模式'
    },
    {
      grid: [
        ['square', 'square', 'triangle'],
        ['square', 'square', 'triangle'],
        ['cross', null, 'triangle']
      ],
      missingPosition: { row: 2, col: 1 },
      options: [
        [['triangle', 'triangle', 'circle'], ['triangle', 'triangle', 'circle'], ['square', 'square', 'circle']],
        [['cross', 'cross', 'square'], ['cross', 'cross', 'square'], ['circle', 'circle', 'square']],
        [['square', 'triangle', 'circle'], ['square', 'triangle', 'circle'], ['square', 'triangle', 'circle']],
        [['cross', 'cross', 'triangle'], ['cross', 'cross', 'triangle'], ['cross', 'cross', 'triangle']],
        [['square', 'square', 'circle'], ['square', 'square', 'circle'], ['cross', 'cross', 'circle']],
        [['triangle', 'triangle', 'triangle'], ['triangle', 'triangle', 'triangle'], ['triangle', 'triangle', 'triangle']]
      ],
      correctAnswer: '3',
      difficulty: 2,
      explanation: '规则：第一列和第二列的形状相同，第三列都是三角形'
    }
  ];
  
  gridFillCases.forEach((c, idx) => {
    questions.push({
      id: `grid-fill-${idx + 1}`,
      type: 'aon_inductive_grid_fill',
      content: '选择正确的网格来完成模式',
      options: [],
      correctAnswer: c.correctAnswer,
      explanation: c.explanation,
      difficulty: c.difficulty,
      isAonStyle: true,
      gridFillData: {
        grid: c.grid,
        missingPosition: c.missingPosition,
        options: c.options
      }
    });
  });
  
  return questions;
}

export const gridFillQuestions = generateGridFillQuestions();

// ============================================================================
// 注意：该文件中的许多静态题库（如 SwitchChallenge, GridChallenge 等）已被废弃，
// 实际项目目前使用的是 src/utils/questionGenerators.ts 中的动态算法生成器。
// 这些静态题库仅被保留作为回退(fallback)以及部分纯文本题型(如 aon_verbal)的数据源。
// ============================================================================

export const allQuestions = [
  ...switchChallengeQuestions,
  ...gridChallengeQuestions,
  ...scalesIxQuestions,
  ...digitChallengeQuestions,
  ...gridInductiveQuestions,
  ...gridFillQuestions,
  ...basicVerbalQuestions,
  ...basicNumericalQuestions,
  ...appliedNumeracyQuestions,
  ...apReasoningQuestions
];

export const getQuestionsByType = (type: string) => {
  if (type === 'random') {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  }
  switch (type) {
    case 'aon_deductive_switch':
      return switchChallengeQuestions;
    case 'aon_gap_challenge':
      return gridChallengeQuestions;
    case 'aon_inductive_scales':
      return scalesIxQuestions;
    case 'aon_digit_challenge':
      return digitChallengeQuestions;
    case 'aon_inductive_grid':
      return gridInductiveQuestions;
    case 'aon_inductive_grid_fill':
      return gridFillQuestions;
    case 'aon_verbal': {
      // 筛选出属于同一套题干的18道题（以 'verbal-evig' 为前缀），并进行打乱
      const evigQuestions = basicVerbalQuestions.filter(q => q.id.startsWith('verbal-evig-'));
      const otherVerbalQuestions = basicVerbalQuestions.filter(q => !q.id.startsWith('verbal-evig-'));
      
      // 如果我们有足够的evig题目，就返回18道打乱的。否则混入其他题目
      if (evigQuestions.length >= 18) {
        return evigQuestions.sort(() => 0.5 - Math.random()).slice(0, 18);
      }
      return basicVerbalQuestions.sort(() => 0.5 - Math.random()).slice(0, 18);
    }
    case 'aon_numerical':
      return basicNumericalQuestions;
    case 'aon_applied_numeracy':
      return appliedNumeracyQuestions;
    case 'aon_ap_reasoning':
      return apReasoningQuestions;
    default:
      return [];
  }
};
