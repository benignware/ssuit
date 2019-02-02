#!/usr/bin/env node
const fs = require('fs');
const sass = require('node-sass');
const path = require('path');
const assert = require('assert');
const postcss = require('postcss');

const packageJSON = require('../package.json');

describe(`${packageJSON.name}`, () => {
  it('renders correctly', () => {
    const { css } = sass.renderSync({
      file: path.resolve(__dirname, './fixtures/src/scss/index.scss'),
      includePaths: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, './fixtures/src')
      ]
    });

    const expectedFile = path.join(__dirname, 'expected/index.css');
    const { plugins } = require(path.resolve(__dirname, 'fixtures/postcss.config.js'));
    const { css: actual } = postcss(plugins).process(css);

    let expected = '';

    if (fs.existsSync(expectedFile)) {
      expected = fs.readFileSync(expectedFile, 'utf-8');
    } else {
      expected = actual;
      dir = path.join(__dirname, 'expected');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(expectedFile, actual, 'utf-8');
    }

    assert.equal(actual, expected);
  });
});
