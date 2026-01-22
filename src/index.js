import _ from 'lodash';
import { parseFile } from './parsers.js';

const formatValue = (value) => {
  // Для строк возвращаем как есть (без кавычек)
  if (typeof value === 'string') {
    return value;
  }
  // Для булевых значений возвращаем как есть
  if (typeof value === 'boolean') {
    return value.toString();
  }
  // Для чисел возвращаем как есть
  if (typeof value === 'number') {
    return value.toString();
  }
  // Для null, undefined и других
  return String(value);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // Получаем все уникальные ключи и сортируем их
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const diffLines = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const hasInFirst = _.has(data1, key);
    const hasInSecond = _.has(data2, key);

    // Ключ есть только в первом файле
    if (!hasInSecond) {
      return `  - ${key}: ${formatValue(value1)}`;
    }

    // Ключ есть только во втором файле
    if (!hasInFirst) {
      return `  + ${key}: ${formatValue(value2)}`;
    }

    // Ключ есть в обоих файлах, но значения разные
    if (!_.isEqual(value1, value2)) {
      return `  - ${key}: ${formatValue(value1)}\n  + ${key}: ${formatValue(value2)}`;
    }

    // Ключ есть в обоих файлах и значения одинаковые
    return `    ${key}: ${formatValue(value1)}`;
  });

  return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;
