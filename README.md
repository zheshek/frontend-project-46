# Difference Calculator (gendiff)

[![Tests](https://github.com/zheshek/frontend-project-46/actions/workflows/test.yml/badge.svg)](https://github.com/zheshek/frontend-project-46/actions/workflows/test.yml)

A command-line utility for finding differences between configuration files.

## Installation

### As a CLI tool:
```bash
npm install -g @hexlet/code
As a library:
bash
npm install @hexlet/code
Usage
CLI Usage
bash
gendiff [options] <filepath1> <filepath2>
Options:
-V, --version - output version number

-f, --format <type> - output format: stylish, plain, json (default: stylish)

-h, --help - display help

Examples:
Compare two JSON files (default stylish format):
bash
gendiff file1.json file2.json
Compare with plain format:
bash
gendiff file1.json file2.json --format plain
# or
gendiff file1.json file2.json -f plain
Compare with JSON format:
bash
gendiff file1.json file2.json --format json
Compare YAML files:
bash
gendiff file1.yml file2.yml
Mixed formats (JSON and YAML):
bash
gendiff file1.json file2.yml
Supported Formats
Input Formats:
JSON (.json)

YAML (.yml, .yaml)

Output Formats:
1. Stylish (default)
Human-readable tree format with +/- indicators:

```
{
common: {
+ follow: false
setting1: Value 1
- setting2: 200
- setting3: true
+ setting3: null
+ setting4: blah blah
}
}
```

2. Plain
Flat text description of changes:

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
```

3. JSON
Machine-readable JSON output:

```json
[
{
"key": "follow",
"type": "added",
"value": false
},
{
"key": "setting2",
"type": "removed",
"value": 200
}
]
```

Library Usage
You can also use it as a library in your JavaScript/Node.js projects:

```javascript
import genDiff from '@hexlet/code';

// Compare files
const diff = genDiff('file1.json', 'file2.json');
console.log(diff);

// With specific format
const plainDiff = genDiff('file1.yml', 'file2.yml', 'plain');
const jsonDiff = genDiff('file1.json', 'file2.json', 'json');
```

Development
Setup:
```bash
git clone https://github.com/zheshek/frontend-project-46.git
cd frontend-project-46
npm install
```

Available Commands:
npm test - run tests

npm run lint - run linter

npm run gendiff - run CLI tool

npm run coverage - generate test coverage

Project Structure:
```
frontend-project-46/
├── src/
│ ├── index.js # Main entry point
│ ├── parsers.js # File parsers (JSON/YAML)
│ ├── buildDiff.js # Diff building logic
│ └── formatters/ # Output formatters
│ ├── index.js # Formatter factory
│ ├── stylish.js # Stylish formatter
│ ├── plain.js # Plain formatter
│ └── json.js # JSON formatter
├── bin/
│ └── gendiff.js # CLI entry point
├── fixtures/ # Test data
├── tests/ # Test files
└── .github/workflows/ # CI configuration
```

Requirements
Node.js 14.x or higher

npm 6.x or higher

Demo
https://asciinema.org/a/YOUR_ASCII_CAST_ID.svg

Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

License
ISC
