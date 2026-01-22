import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(process.cwd(), filepath);
};

const getFileExtension = (filepath) => path.extname(filepath).toLowerCase();

const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  const extension = getFileExtension(filepath);

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { parseFile, getAbsolutePath, getFileExtension };
