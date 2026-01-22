const makeIndent = (depth) => ' '.repeat(depth * 4 - 2)

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat(depth * 4 - 4)
  const entries = Object.entries(value)

  const lines = entries.map(([key, val]) => {
    return `${indent}${key}: ${stringify(val, depth + 1)}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (diff, depth = 1) => {
  const indent = makeIndent(depth)

  const lines = diff.map((node) => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`
      case 'removed':
        return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`
      case 'changed': {
        const oldStr = stringify(node.oldValue, depth + 1)
        const newStr = stringify(node.newValue, depth + 1)
        return `${indent}- ${key}: ${oldStr}\n${indent}+ ${key}: ${newStr}`
      }
      case 'nested': {
        const childrenStr = formatStylish(node.children, depth + 1)
        return `${indent}  ${key}: {\n${childrenStr}\n${indent}  }`
      }
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  const result = lines.join('\n')
  return depth === 1 ? `{\n${result}\n}` : result
}

export default formatStylish
