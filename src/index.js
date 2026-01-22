import { parseFile } from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  // Временный вывод для проверки
  return `Comparing files:\n${JSON.stringify(data1, null, 2)}\n${JSON.stringify(data2, null, 2)}`;
};

export default genDiff;