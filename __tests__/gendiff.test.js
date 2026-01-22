import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)

describe('Flat files comparison', () => {
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  test('should compare flat JSON files correctly', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('should compare flat YAML files correctly', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('should compare JSON and YAML files', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yml')
    expect(genDiff(file1, file2)).toBe(expected)
  })

  test('should work with identical files', () => {
    const file1 = getFixturePath('file1.json')
    const result = genDiff(file1, file1)
    expect(result).toContain('host: hexlet.io')
    expect(result).toContain('timeout: 50')
  })
})
