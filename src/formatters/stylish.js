const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1);
    return `${currentIndent}${key}: ${formattedValue}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = depth * 4 - 2;
  const indent = ' '.repeat(indentSize);

  const lines = diff.map((node) => {
    const { key, type } = node;

    switch (type) {
      case 'added': {
        const { value } = node;
        const formattedValue = stringify(value, depth + 1);
        return `${indent}+ ${key}: ${formattedValue}`;
      }
      case 'removed': {
        const { value } = node;
        const formattedValue = stringify(value, depth + 1);
        return `${indent}- ${key}: ${formattedValue}`;
      }
      case 'unchanged': {
        const { value } = node;
        const formattedValue = stringify(value, depth + 1);
        return `${indent}  ${key}: ${formattedValue}`;
      }
      case 'changed': {
        const { oldValue, newValue } = node;
        const oldFormatted = stringify(oldValue, depth + 1);
        const newFormatted = stringify(newValue, depth + 1);
        return `${indent}- ${key}: ${oldFormatted}\n${indent}+ ${key}: ${newFormatted}`;
      }
      case 'nested': {
        const { children } = node;
        const formattedChildren = formatStylish(children, depth + 1);
        const nestedIndent = ' '.repeat(indentSize - 2);
        return `${indent}  ${key}: {\n${formattedChildren}\n${nestedIndent}  }`;
      }
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });

  const result = lines.join('\n');
  return depth === 1 ? `{\n${result}\n}` : result;
};

export default formatStylish;
