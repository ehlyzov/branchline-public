type InputFormat = 'json' | 'xml';
type ContractMode = 'off' | 'warn' | 'strict';
type OutputFormat = 'json' | 'json-compact' | 'json-canonical' | 'xml' | 'xml-compact';

type SharedStorageSpec = {
  name: string;
  kind: 'SINGLE' | 'MANY';
};

type WorkerRequest = {
  requestId: number;
  code: string;
  input: string;
  trace: boolean;
  inspect: boolean;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  includeContracts: boolean;
  contractsMode: ContractMode;
  contractsDebug: boolean;
  shared: SharedStorageSpec[];
};

type WorkerResponse = {
  requestId: number;
  success: boolean;
  outputJson: string | null;
  errorMessage: string | null;
  line: number | null;
  column: number | null;
  explainJson: string | null;
  explainHuman: string | null;
  inputContractJson: string | null;
  outputContractJson: string | null;
  contractSource: string | null;
  contractWarnings: string | null;
  inspectResult: PlaygroundInspectPayload | null;
  inspectError: string | null;
};

import type {
  PlaygroundDiagnostic,
  PlaygroundInspectPayload,
  PlaygroundSubsetCompatibility
} from './playground-state';
import kotlinStdlibUrl from '../../interpreter/build/dist/js/productionLibrary/kotlin-kotlin-stdlib.js?url';
import immutableCollectionsUrl from '../../interpreter/build/dist/js/productionLibrary/Kotlin-Immutable-Collections-kotlinx-collections-immutable.js?url';
import atomicfuUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-atomicfu.js?url';
import coroutinesCoreUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-coroutines-core.js?url';
import serializationCoreUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-serialization-kotlinx-serialization-core.js?url';
import serializationJsonUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-serialization-kotlinx-serialization-json.js?url';
import interpreterUrl from '../../interpreter/build/dist/js/productionLibrary/branchline-interpreter.js?url';
import { XMLParser } from 'fast-xml-parser';

type PlaygroundFacade = {
  run(program: string, inputJson: string, enableTracing: boolean, includeContracts: boolean): WorkerResponse;
  inspect?(program: string, sharedJsonConfig: string | null): RawPlaygroundInspectResult;
  runWithShared?(
    program: string,
    inputJson: string,
    enableTracing: boolean,
    includeContracts: boolean,
    sharedJsonConfig: string | null
  ): WorkerResponse;
  runWithContracts?(
    program: string,
    inputJson: string,
    enableTracing: boolean,
    includeContracts: boolean,
    contractsMode: ContractMode,
    contractsDebug: boolean,
    sharedJsonConfig: string | null,
    outputFormat: OutputFormat
  ): WorkerResponse;
};

type RawPlaygroundInspectResult = {
  success: boolean;
  normalizedSource: string | null;
  subsetCompatibility: string;
  diagnosticsJson: string;
  warningsJson: string;
  featureUsageJson: string;
  transformsJson: string;
  inspectJson: string | null;
  errorMessage: string | null;
};

const INTERPRETER_GLOBAL = 'io.github.ehlyzov.branchline:interpreter';

let facadePromise: Promise<PlaygroundFacade> | null = null;
const loadedScripts = new Set<string>();

async function loadScript(url: string): Promise<void> {
  if (loadedScripts.has(url)) {
    return;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load interpreter bundle: ${url}`);
  }

  const source = await response.text();
  (0, eval)(source);
  loadedScripts.add(url);
}

function loadFacade(): Promise<PlaygroundFacade> {
  if (!facadePromise) {
    facadePromise = (async () => {
      const globalScope = self as typeof self & Record<string, unknown>;

      if (!globalScope[INTERPRETER_GLOBAL]) {
        await loadScript(kotlinStdlibUrl);
        await loadScript(immutableCollectionsUrl);
        await loadScript(atomicfuUrl);
        await loadScript(coroutinesCoreUrl);
        await loadScript(serializationCoreUrl);
        await loadScript(serializationJsonUrl);
        await loadScript(interpreterUrl);
      }

      const moduleRoot = globalScope[INTERPRETER_GLOBAL] as Record<string, unknown> | undefined;
      if (!moduleRoot) {
        throw new Error('Branchline interpreter module failed to initialize.');
      }

      const playgroundNamespace = (moduleRoot['playground'] ?? moduleRoot) as Record<string, unknown>;
      const facadeEntry = playgroundNamespace['PlaygroundFacade'];

      if (facadeEntry && typeof facadeEntry === 'object' && typeof (facadeEntry as PlaygroundFacade).run === 'function') {
        return facadeEntry as PlaygroundFacade;
      }

      if (typeof facadeEntry === 'function') {
        try {
          const maybeInstance = (facadeEntry as () => PlaygroundFacade)();
          if (maybeInstance && typeof maybeInstance.run === 'function') {
            return maybeInstance;
          }
        } catch (_error) {
          // ignore and fall back to getter resolution
        }
      }

      const getter = playgroundNamespace['PlaygroundFacade_getInstance'];
      if (typeof getter === 'function') {
        const instance = (getter as () => PlaygroundFacade)();
        if (instance && typeof instance.run === 'function') {
          return instance;
        }
      }

      throw new Error('Unable to resolve Branchline playground facade.');
    })();
  }
  return facadePromise;
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const {
    requestId,
    code,
    input,
    trace,
    inspect,
    inputFormat,
    outputFormat = 'json',
    includeContracts,
    contractsMode,
    contractsDebug,
    shared
  } = event.data;
  const sharedOffset = shared.length ? shared.length + 1 : 0;
  const wrapperAdjustment = computeWrapperAdjustment(code, sharedOffset);
  let inspectResult: PlaygroundInspectPayload | null = null;
  let inspectError: string | null = null;
  try {
    const runner = await loadFacade();
    const sharedJson = shared.length ? JSON.stringify(shared) : null;
    if (inspect) {
      try {
        inspectResult = runInspect(runner, code, sharedJson, wrapperAdjustment);
      } catch (error) {
        inspectError = error instanceof Error ? error.message : String(error);
      }
    }
    const payload = prepareInput(input, inputFormat);
    const result = runner.runWithContracts
      ? runner.runWithContracts(code, payload, trace, includeContracts, contractsMode, contractsDebug, sharedJson, outputFormat)
      : runner.runWithShared
        ? runner.runWithShared(code, payload, trace, includeContracts, sharedJson)
        : runner.run(code, payload, trace, includeContracts);
    const adjusted: WorkerResponse = {
      ...adjustResultForWrapper(result, wrapperAdjustment),
      requestId,
      inspectResult,
      inspectError
    };
    self.postMessage(adjusted satisfies WorkerResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallback: WorkerResponse = {
      requestId,
      success: false,
      outputJson: null,
      errorMessage: message,
      line: null,
      column: null,
      explainJson: null,
      explainHuman: null,
      inputContractJson: null,
      outputContractJson: null,
      contractSource: null,
      contractWarnings: null,
      inspectResult,
      inspectError
    };
    self.postMessage(fallback);
  }
};

export {};

function runInspect(
  runner: PlaygroundFacade,
  code: string,
  sharedJson: string | null,
  wrapperAdjustment: WrapperAdjustment | null
): PlaygroundInspectPayload {
  if (typeof runner.inspect !== 'function') {
    throw new Error('Branchline playground facade does not expose inspect.');
  }

  const raw = runner.inspect(code, sharedJson);
  return adjustInspectForWrapper(decodeInspectResult(raw), wrapperAdjustment);
}

function decodeInspectResult(raw: RawPlaygroundInspectResult): PlaygroundInspectPayload {
  return {
    success: raw.success,
    normalizedSource: raw.normalizedSource ?? null,
    subsetCompatibility: normalizeSubsetCompatibility(raw.subsetCompatibility),
    diagnostics: parseJsonArray<PlaygroundDiagnostic>(raw.diagnosticsJson),
    warnings: parseJsonArray<PlaygroundDiagnostic>(raw.warningsJson),
    featureUsage: parseFeatureUsage(raw.featureUsageJson),
    transforms: parseJsonArray<unknown>(raw.transformsJson),
    rawJson: raw.inspectJson
  };
}

function normalizeSubsetCompatibility(value: string): PlaygroundSubsetCompatibility {
  if (value === 'COMPATIBLE' || value === 'INCOMPATIBLE' || value === 'UNKNOWN') {
    return value;
  }
  return 'UNKNOWN';
}

function parseFeatureUsage(raw: string): { features: string[] } {
  const value = parseJsonValue(raw);
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return { features: [] };
  }
  const features = (value as { features?: unknown }).features;
  return {
    features: Array.isArray(features) ? features.filter((item): item is string => typeof item === 'string') : []
  };
}

function parseJsonArray<T>(raw: string): T[] {
  const value = parseJsonValue(raw);
  return Array.isArray(value) ? (value as T[]) : [];
}

function parseJsonValue(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

const xmlParser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  textNodeName: '#text',
  trimValues: true,
  parseTagValue: false,
  parseAttributeValue: false,
  ignoreDeclaration: true
});

function prepareInput(raw: string, format: InputFormat): string {
  if (format === 'xml') {
    if (!raw.trim()) {
      return '{}';
    }

    let parsed: unknown;
    try {
      parsed = xmlParser.parse(raw);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to parse XML input: ${message}`);
    }

    const root = parseOrderedXmlRoot(parsed);
    const mapped = root ? mapXmlInput(root) : {};
    return JSON.stringify(mapped);
  }

  return raw;
}

type XmlElementNode = {
  name: string;
  attributes: Record<string, string>;
  namespaces: Record<string, string>;
  children: XmlNodeChild[];
};

type XmlNodeChild =
  | { kind: 'element'; value: XmlElementNode }
  | { kind: 'text'; value: string };

type ParsedXmlAttributes = {
  attributes: Record<string, string>;
  namespaces: Record<string, string>;
};

function parseOrderedXmlRoot(value: unknown): XmlElementNode | null {
  const entries = asDynamicArray(value);
  if (entries == null) {
    return null;
  }
  for (const entry of entries) {
    const element = parseOrderedXmlEntry(entry);
    if (element != null) {
      return element;
    }
  }
  return null;
}

function parseOrderedXmlEntry(entry: unknown): XmlElementNode | null {
  if (entry == null || typeof entry !== 'object') {
    return null;
  }
  const dynamicEntry = entry as Record<string, unknown>;
  const keys = Object.keys(dynamicEntry);
  let elementName: string | null = null;
  for (const key of keys) {
    if (key === ':@' || key === '#text') continue;
    elementName = key;
    break;
  }
  if (elementName == null) {
    return null;
  }
  const parsedAttributes = parseOrderedXmlAttributes(dynamicEntry[':@']);
  const children = parseOrderedXmlChildren(dynamicEntry[elementName]);
  return {
    name: elementName,
    attributes: parsedAttributes.attributes,
    namespaces: parsedAttributes.namespaces,
    children
  };
}

function parseOrderedXmlChildren(value: unknown): XmlNodeChild[] {
  const entries = asDynamicArray(value);
  if (entries == null) {
    return [];
  }
  const children: XmlNodeChild[] = [];
  for (const entry of entries) {
    if (entry == null || typeof entry !== 'object') continue;
    const dynamicEntry = entry as Record<string, unknown>;
    const text = dynamicString(dynamicEntry['#text']);
    if (text != null) {
      children.push({ kind: 'text', value: text });
      continue;
    }
    const element = parseOrderedXmlEntry(dynamicEntry);
    if (element != null) {
      children.push({ kind: 'element', value: element });
    }
  }
  return children;
}

function parseOrderedXmlAttributes(value: unknown): ParsedXmlAttributes {
  const attributes: Record<string, string> = {};
  const namespaces: Record<string, string> = {};
  if (value == null || typeof value !== 'object') {
    return { attributes, namespaces };
  }
  const dynamicValue = value as Record<string, unknown>;
  for (const key of Object.keys(dynamicValue)) {
    const attrName = key.startsWith('@') ? key.substring(1) : key;
    const attrValue = dynamicString(dynamicValue[key]) ?? '';
    if (attrName === 'xmlns') {
      namespaces['$'] = attrValue;
    } else if (attrName.startsWith('xmlns:')) {
      namespaces[attrName.substring('xmlns:'.length)] = attrValue;
    } else {
      attributes[attrName] = attrValue;
    }
  }
  return { attributes, namespaces };
}

function mapXmlInput(root: XmlElementNode): Record<string, unknown> {
  return {
    [root.name]: mapXmlElement(root)
  };
}

function mapXmlElement(node: XmlElementNode): unknown {
  const result: Record<string, unknown> = {};
  if (Object.keys(node.namespaces).length > 0) {
    result['@xmlns'] = { ...node.namespaces };
  }
  for (const [name, value] of Object.entries(node.attributes)) {
    result[`@${name}`] = value;
  }
  const textSegments: string[] = [];
  let hasElementChildren = false;
  for (const child of node.children) {
    if (child.kind === 'element') {
      hasElementChildren = true;
      appendElementValue(result, child.value.name, mapXmlElement(child.value));
      continue;
    }
    const normalized = child.value.trim();
    if (normalized.length > 0) {
      textSegments.push(normalized);
    }
  }
  if (hasElementChildren) {
    appendMixedText(result, textSegments);
  } else if (textSegments.length > 0) {
    appendPureText(result, textSegments);
  }
  return Object.keys(result).length === 0 ? '' : result;
}

function appendElementValue(result: Record<string, unknown>, name: string, value: unknown): void {
  const existing = result[name];
  if (existing == null) {
    result[name] = value;
    return;
  }
  if (Array.isArray(existing)) {
    existing.push(value);
    return;
  }
  result[name] = [existing, value];
}

function appendMixedText(result: Record<string, unknown>, segments: string[]): void {
  let index = 1;
  for (const segment of segments) {
    result[`$${index}`] = segment;
    index += 1;
  }
}

function appendPureText(result: Record<string, unknown>, segments: string[]): void {
  const value = segments.length === 1 ? segments[0] : segments.join('');
  result['$'] = value;
  result['#text'] = value;
}

function asDynamicArray(value: unknown): unknown[] | null {
  return Array.isArray(value) ? value : null;
}

function dynamicString(value: unknown): string | null {
  if (value == null) return null;
  return String(value);
}

type WrapperAdjustment = {
  lineOffset: number;
  lineMap: number[];
  indentedLines: boolean[];
  originalLineCount: number;
  lastContentLine: number;
};

function computeWrapperAdjustment(code: string, sharedOffset: number): WrapperAdjustment | null {
  if (/\bTRANSFORM\b/i.test(code)) {
    return null;
  }

  const originalLines = code.split(/\r?\n/);

  let firstContent = 0;
  while (firstContent < originalLines.length && originalLines[firstContent].trim() === '') {
    firstContent += 1;
  }

  let lastContent = originalLines.length - 1;
  while (lastContent >= firstContent && originalLines[lastContent].trim() === '') {
    lastContent -= 1;
  }

  const hasContent = firstContent <= lastContent;
  const trimmedLines = hasContent
    ? originalLines.slice(firstContent, lastContent + 1)
    : ([] as string[]);
  const lineMap = trimmedLines.map((_, index) => firstContent + index + 1);
  const indentedLines = trimmedLines.map((line) => line.trim().length > 0);

  return {
    lineOffset: 3 + sharedOffset,
    lineMap,
    indentedLines,
    originalLineCount: originalLines.length || 1,
    lastContentLine: hasContent ? lastContent + 1 : 1
  };
}

function adjustResultForWrapper(
  result: WorkerResponse,
  adjustment: WrapperAdjustment | null
): WorkerResponse {
  if (!adjustment || result.success || result.line == null) {
    return result;
  }

  const relativeLine = result.line - adjustment.lineOffset;
  if (relativeLine < 1) {
    return result;
  }

  const trimmedIndex = relativeLine - 1;
  let line = result.line;
  let column = result.column;

  if (trimmedIndex >= 0 && trimmedIndex < adjustment.lineMap.length) {
    line = adjustment.lineMap[trimmedIndex];
    if (column != null && adjustment.indentedLines[trimmedIndex]) {
      column = Math.max(1, column - 4);
    }
  } else {
    line = Math.min(adjustment.originalLineCount, adjustment.lastContentLine);
  }

  return {
    ...result,
    line,
    column
  };
}

function adjustInspectForWrapper(
  result: PlaygroundInspectPayload,
  adjustment: WrapperAdjustment | null
): PlaygroundInspectPayload {
  if (!adjustment) {
    return result;
  }

  return {
    ...result,
    diagnostics: result.diagnostics.map((diagnostic) => adjustDiagnosticForWrapper(diagnostic, adjustment)),
    warnings: result.warnings.map((diagnostic) => adjustDiagnosticForWrapper(diagnostic, adjustment))
  };
}

function adjustDiagnosticForWrapper(
  diagnostic: PlaygroundDiagnostic,
  adjustment: WrapperAdjustment
): PlaygroundDiagnostic {
  if (diagnostic.span == null) {
    return diagnostic;
  }

  const start = adjustPositionForWrapper(
    diagnostic.span.startLine,
    diagnostic.span.startColumn,
    adjustment
  );
  const end = adjustPositionForWrapper(
    diagnostic.span.endLine,
    diagnostic.span.endColumn,
    adjustment
  );

  return {
    ...diagnostic,
    span: {
      startLine: start.line,
      startColumn: start.column,
      endLine: end.line,
      endColumn: end.column
    }
  };
}

function adjustPositionForWrapper(
  rawLine: number,
  rawColumn: number,
  adjustment: WrapperAdjustment
): { line: number; column: number } {
  const relativeLine = rawLine - adjustment.lineOffset;
  if (relativeLine < 1) {
    return { line: rawLine, column: rawColumn };
  }

  const trimmedIndex = relativeLine - 1;
  if (trimmedIndex >= 0 && trimmedIndex < adjustment.lineMap.length) {
    const line = adjustment.lineMap[trimmedIndex];
    const column = adjustment.indentedLines[trimmedIndex]
      ? Math.max(1, rawColumn - 4)
      : rawColumn;
    return { line, column };
  }

  return {
    line: Math.min(adjustment.originalLineCount, adjustment.lastContentLine),
    column: rawColumn
  };
}
