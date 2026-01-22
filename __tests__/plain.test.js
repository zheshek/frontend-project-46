import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('Plain formatter', () => {
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  test('should format nested JSON in plain format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const result = genDiff(file1, file2, 'plain');
    expect(result).toBe(expected);
  });

  test('should format nested YAML in plain format', () => {
    const file1 = getFixturePath('nested1.yml');
    const file2 = getFixturePath('nested2.yml');
    const result = genDiff(file1, file2, 'plain');
    expect(result).toBe(expected);
  });

  test('should format flat JSON in plain format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const result = genDiff(file1, file2, 'plain');
    expect(result).toContain("Property 'follow' was removed");
    expect(result).toContain("Property 'timeout' was updated");
  });
});
