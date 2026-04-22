import fs from 'fs';

const filePath = 'src/data/questions.ts';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。\`;`;

const newStr = `具有区域性优势的品牌：为了在本地生产，爱威格收购了不同的欧洲化妆品厂商，它们能够更灵活地应对当地需求的变动。

股东大会

股东会议议程：
年度账目以及财务报告已提交。有关年度净利润分配的
决议：执行委员会与监事会向股东建议派发0.10欧元的股息。如果年度净利润以这种方式使用，那么股东必须获得多数表决同意
新一届监事会选举：现已收到多个提名。所有被提名的个体都相当熟悉爱威格公司集团，而赫伯特·布朗（银钢有限公司），皮特·桑德斯（律师）以及彼得拉·汉普顿（运动轿车有限公司）等人获得监事会多数选票。\`;`;

content = content.replace(new RegExp(targetStr.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'), 'g'), newStr);

fs.writeFileSync(filePath, content);
console.log('Done updating dataSheet');
