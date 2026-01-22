const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const buildPath = (path, key) => (path ? `${path}.${key}` : key)

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const { key, type } = node
    const currentPath = buildPath(path, key)

    switch (type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
      case 'removed':
        return `Property '${currentPath}' was removed`
      case 'changed': {
        const oldValue = stringify(node.oldValue)
        const newValue = stringify(node.newValue)
        return `Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`
      }
      case 'nested':
        return formatPlain(node.children, currentPath)
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
