const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function renderRows(patch) {
  const context = vm.createContext({ document: { addEventListener() {} } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'renderer.js'), 'utf8'), context);
  const target = {};
  context.renderDiff(target, patch);
  return Array.from(target.innerHTML.matchAll(/<tr class="([^"]+)">(.*?)<\/tr>/g), row => ({
    type: row[1],
    cells: Array.from(row[2].matchAll(/<td[^>]*>(.*?)<\/td>/g), cell => cell[1]),
  })).filter(row => row.type !== 'diff-hunk');
}

test('preserves import changes and subsequent line numbers', () => {
  const rows = renderRows('@@ -4,2 +4,3 @@\n-import A\n+import B\n+import C\n const value = 1;');
  assert.deepEqual(rows, [
    { type: 'diff-del', cells: ['4', '', 'import A'] },
    { type: 'diff-add', cells: ['', '4', 'import B'] },
    { type: 'diff-add', cells: ['', '5', 'import C'] },
    { type: 'diff-ctx', cells: ['5', '6', 'const value = 1;'] },
  ]);
});

for (const [name, before, after] of [
  ['string content', 'const s = "a b";', 'const s = "ab";'],
  ['indentation', '    run()', 'run()'],
]) {
  test(`preserves whitespace changes in ${name}`, () => {
    assert.deepEqual(renderRows(`@@ -1 +1 @@\n-${before}\n+${after}`), [
      { type: 'diff-del', cells: ['1', '', before] },
      { type: 'diff-add', cells: ['', '1', after] },
    ]);
  });
}
