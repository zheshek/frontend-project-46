import { parseFile } from './parsers.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildDiff(data1, data2);

  if (format === 'stylish') {
    return `{\n${formatStylish(diff)}\n}`;
  }

  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;
