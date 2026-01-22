#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing ${filepath1} and ${filepath2}`);
    if (options.format) {
      console.log(`Format: ${options.format}`);
    }
  })
  .parse(process.argv);