import { parseFile } from './src/parsers.js'

// Тестируем с разными путями
const testPaths = [
  'file.json',
  'file.yml',
  'file.yaml',
  '/absolute/path/file.json',
  './relative/path/file.yml',
  'file'  // без расширения
]

testPaths.forEach((filepath) => {
  console.log(`Testing: ${filepath}`)
  console.log(`  extname: ${require('path').extname(filepath)}`)
  try {
    // Это выбросит ошибку для файла без расширения
    const data = parseFile(filepath)
    console.log(`  Success: ${typeof data}`)
  } catch (error) {
    console.log(`  Error: ${error.message}`)
  }
  console.log('---')
})
