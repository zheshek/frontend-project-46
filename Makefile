install:
npm ci

gendiff:
node bin/gendiff.js

lint:
npx eslint .

test:
npm test

test-watch:
npm test -- --watch

test-coverage:
npm test -- --coverage
