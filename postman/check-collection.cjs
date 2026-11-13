const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const read = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, name), 'utf8'));
const collection = read('SAMS.postman_collection.json');
const environment = read('SAMS.local.postman_environment.json');
assert.match(collection.info.schema, /collection\/v2\.1\.0/);
assert.ok(environment.values.some(v => v.key === 'baseUrl' && v.enabled));
const failures = [];
let requests = 0;
let examples = 0;
function visit(items) {
  for (const item of items) {
    if (item.item) { visit(item.item); continue; }
    requests++;
    try {
      assert.ok(item.name, 'Missing request name');
      assert.ok(item.request?.method, 'Missing HTTP method');
      assert.ok(item.request?.url, 'Missing URL');
      assert.ok(item.request?.description, 'Missing request description');
      assert.ok(item.response?.length, 'Missing saved response example');
      for (const example of item.response) {
        assert.ok(Number.isInteger(example.code), 'Example has no HTTP status');
        assert.equal(example.originalRequest.method, item.request.method, 'Example method differs');
        assert.equal(example.originalRequest.url, item.request.url, 'Example URL differs');
      }
      const tests = (item.event || []).filter(e => e.listen === 'test');
      assert.ok(tests.length, 'Missing response tests');
      assert.ok(tests.some(e => e.script.exec.join('\n').includes('pm.test(')), 'Missing assertion');
      for (const event of item.event || []) {
        new vm.Script(event.script.exec.join('\n'), { filename: `${item.name}:${event.listen}` });
      }
      examples += (item.response || []).length;
    } catch (error) { failures.push(`${item.name}: ${error.message}`); }
  }
}
visit(collection.item);
assert.ok(requests > 0, 'Collection has no requests');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${requests} documented requests and their scripts; ${examples} saved examples. No API requests sent.`);
}
