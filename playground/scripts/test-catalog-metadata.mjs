import assert from 'node:assert/strict';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(root, 'src', 'playground-catalog.ts');
const tempDir = join(root, '.tmp-catalog-tests');
const tempModule = join(tempDir, 'playground-catalog.mjs');

await mkdir(tempDir, { recursive: true });

try {
  const source = await readFile(sourcePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true
    },
    fileName: sourcePath
  });
  await writeFile(tempModule, output.outputText);

  const catalog = await import(`${pathToFileURL(tempModule).href}?v=${Date.now()}`);
  const examples = [
    {
      id: 'hello-transform',
      title: 'Hello',
      category: 'getting-started',
      tags: ['minimal', 'ai-canonical'],
      aiSubset: 'compatible'
    },
    {
      id: 'shared-memory-read',
      title: 'Shared Memory',
      category: 'advanced',
      tags: ['shared-memory'],
      aiSubset: 'incompatible'
    },
    {
      id: 'legacy',
      title: 'Legacy descriptor',
      tags: []
    }
  ];

  assert.deepEqual(
    catalog.catalogCategoryOptions(examples).map((option) => option.value),
    ['all', 'advanced', 'getting-started', '__uncategorized__']
  );
  assert.deepEqual(
    catalog.filterCatalogExamples(examples, { category: 'advanced', aiSubset: 'all' }).map((item) => item.id),
    ['shared-memory-read']
  );
  assert.deepEqual(
    catalog.filterCatalogExamples(examples, { category: 'all', aiSubset: 'compatible' }).map((item) => item.id),
    ['hello-transform']
  );
  assert.deepEqual(
    catalog.filterCatalogExamples(examples, { category: '__uncategorized__', aiSubset: 'unknown' }).map((item) => item.id),
    ['legacy']
  );
  assert.equal(catalog.catalogCategoryLabel('__uncategorized__'), 'Uncategorized');
  assert.equal(catalog.catalogAiSubsetLabel('incompatible'), 'AI incompatible');
  assert.deepEqual(catalog.visibleCatalogTags(['a', 'b', 'c', 'd']), ['a', 'b', 'c']);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
