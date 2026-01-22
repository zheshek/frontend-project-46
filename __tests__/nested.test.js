import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Nested structures comparison', () => {
  test('should compare nested JSON files', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const result = genDiff(file1, file2);
    
    expect(result).toContain('+ follow: false');
    expect(result).toContain('- setting2: 200');
    expect(result).toContain('- setting3: true');
    expect(result).toContain('+ setting3: null');
    expect(result).toContain('- wow:');
    expect(result).toContain('+ wow: so much');
    expect(result).toContain('- group2: {');
    expect(result).toContain('+ group3: {');
  });

  test('should compare nested YAML files', () => {
    const file1 = getFixturePath('nested1.yml');
    const file2 = getFixturePath('nested2.yml');
    const result = genDiff(file1, file2);
    
    expect(result).toContain('+ follow: false');
    expect(result).toContain('- setting2: 200');
    expect(result).toContain('- wow:');
    expect(result).toContain('+ wow: so much');
  });
});
