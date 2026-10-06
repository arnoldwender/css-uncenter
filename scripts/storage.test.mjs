import assert from 'node:assert/strict';
import { after, beforeEach, test } from 'node:test';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Exercise actual storage helpers without adding a browser or test dependency.
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'css-uncenter-storage-'));
for (const name of ['constants', 'utils']) {
  const source = await readFile(name === 'utils' && process.env.STORAGE_UTILS_FILE
    ? process.env.STORAGE_UTILS_FILE : new URL(`../src/${name}.ts`, import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 },
  }).outputText.replace('"./constants"', '"./constants.mjs"');
  await writeFile(join(temporaryDirectory, `${name}.mjs`), compiled);
}
const helpers = await import(pathToFileURL(join(temporaryDirectory, 'utils.mjs')).href);
const data = new Map();
globalThis.localStorage = {
  getItem: key => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, String(value)),
};
beforeEach(() => data.clear());
after(() => rm(temporaryDirectory, { recursive: true }));

// A syntactically valid JSON value can still be invalid application state.
test('corrupt achievement shapes recover without dropping valid known progress', () => {
  for (const raw of ['null', '{}', '42', '"first-uncenter"', '{broken']) {
    data.set('css-uncenter-achievements', raw);
    assert.deepEqual(helpers.getUnlockedAchievements(), [], raw);
  }
  data.set('css-uncenter-achievements', JSON.stringify(['first-uncenter', null, 'obsolete', 'first-uncenter']));
  assert.deepEqual(helpers.getUnlockedAchievements(), ['first-uncenter']);
  helpers.saveAchievements(['first-uncenter', 'obsolete', 'first-uncenter']);
  assert.deepEqual(JSON.parse(data.get('css-uncenter-achievements')), ['first-uncenter']);
});

// Reject partial parses and unsafe numbers before the next write propagates NaN.
test('invalid counters recover and subsequent updates persist finite values', () => {
  for (const raw of ['invalid', '25garbage', 'NaN', 'Infinity', '-1', '1.5', '9007199254740992']) {
    data.set('css-uncenter-high-score', raw);
    data.set('css-uncenter-global-counter', raw);
    assert.equal(helpers.getHighScore(), 0, raw);
    assert.equal(helpers.getGlobalCounter(), 0, raw);
    helpers.setHighScore(25);
    assert.equal(helpers.getHighScore(), 25);
    assert.equal(helpers.incrementGlobalCounter(), 1);
  }
});

// Keep progress monotonic and the counter representable at its numeric boundary.
test('valid progress survives lower scores and counter overflow', () => {
  helpers.setHighScore(225);
  helpers.setHighScore(0);
  helpers.setHighScore(NaN);
  helpers.setHighScore(Infinity);
  assert.equal(helpers.getHighScore(), 225);
  data.set('css-uncenter-global-counter', String(Number.MAX_SAFE_INTEGER));
  assert.equal(helpers.incrementGlobalCounter(), Number.MAX_SAFE_INTEGER);
});

// Storage failures must not prevent using the application in memory.
test('unavailable storage returns defaults and ignores persistence errors', () => {
  const available = globalThis.localStorage;
  globalThis.localStorage = {
    getItem() { throw new Error('Storage blocked'); },
    setItem() { throw new Error('Storage blocked'); },
  };
  try {
    assert.equal(helpers.getHighScore(), 0);
    assert.equal(helpers.getGlobalCounter(), 0);
    assert.equal(helpers.incrementGlobalCounter(), 0);
    assert.deepEqual(helpers.getUnlockedAchievements(), []);
    assert.doesNotThrow(() => helpers.setHighScore(25));
    assert.doesNotThrow(() => helpers.saveAchievements(['first-uncenter']));
  } finally {
    globalThis.localStorage = available;
  }
});
