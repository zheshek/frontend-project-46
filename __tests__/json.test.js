import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename)

describe('JSON formatter', () => {
  test('should format diff as JSON string', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const result = genDiff(file1, file2, 'json')

    // Проверяем, что это валидный JSON
    expect(() => JSON.parse(result)).not.toThrow()

    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed.length).toBeGreaterThan(0)
  })

  test('should contain diff structure in JSON', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const result = JSON.parse(genDiff(file1, file2, 'json'))

    const node = result.find((n) => n.key === 'timeout')
    expect(node).toBeDefined()
    expect(node.type).toBe('changed')
    expect(node.oldValue).toBe(50)
    expect(node.newValue).toBe(20)
  })
})
