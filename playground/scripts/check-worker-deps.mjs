import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const workerPath = resolve(root, 'playground/src/worker.ts');
const interpreterPath = resolve(root, 'interpreter/build/dist/js/productionLibrary/branchline-interpreter.js');

const worker = readFileSync(workerPath, 'utf8');
const interpreter = readFileSync(interpreterPath, 'utf8');

const dependencyLine = interpreter.match(/define\(\['exports',\s*([^]+?)\],\s*factory\)/);
if (!dependencyLine) {
  throw new Error(`Unable to read Kotlin/JS dependencies from ${interpreterPath}`);
}

const dependencies = [...dependencyLine[1].matchAll(/'\.\/([^']+\.js)'/g)].map((match) => match[1]);
const importEntries = [...worker.matchAll(/import\s+(\w+)\s+from\s+'[^']+\/([^/']+\.js)\?url';/g)]
  .map((match) => ({ variable: match[1], file: match[2] }));
const imports = importEntries.map((entry) => entry.file);

const missing = dependencies.filter((dependency) => !imports.includes(dependency));
if (missing.length > 0) {
  throw new Error(`playground worker is missing Kotlin/JS dependencies: ${missing.join(', ')}`);
}

const loadCalls = [...worker.matchAll(/await\s+loadScript\((\w+)\);/g)].map((match) => match[1]);
const variableByFile = new Map(importEntries.map((entry) => [entry.file, entry.variable]));
const interpreterVariable = variableByFile.get('branchline-interpreter.js');
const interpreterLoad = loadCalls.indexOf(interpreterVariable);

for (const dependency of dependencies) {
  const dependencyVariable = variableByFile.get(dependency);
  const dependencyLoad = loadCalls.indexOf(dependencyVariable);
  if (dependencyLoad < 0) {
    throw new Error(`${dependency} is imported but not loaded by playground worker`);
  }
  if (dependencyLoad > interpreterLoad) {
    throw new Error(`${dependency} must be loaded before branchline-interpreter.js`);
  }
}
