import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

const getFileExtension = (filepath) => {
  if (typeof filepath !== 'string') {
    // Если передали не строку, вернём пустую строку
    return ''
  }
  const ext = path.extname(filepath)
  // Гарантируем что всегда вернём строку
  return ext ? ext.toLowerCase() : ''
}

const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  const extension = getFileExtension(filepath)

  switch (extension) {
    case '.json':
      return JSON.parse(content)
    case '.yml':
    case '.yaml':
      return yaml.load(content)
    default:
      // Проверяем содержимое файла если расширение не определилось
      try {
        // Пробуем сначала как JSON
        return JSON.parse(content)
      } catch (jsonError) {
        // Пробуем как YAML
        try {
          return yaml.load(content)
        } catch (yamlError) {
          throw new Error(`Unsupported file format. Tried JSON and YAML, but failed: ${jsonError.message}`)
        }
      }
  }
}

export { parseFile, getAbsolutePath, getFileExtension }
