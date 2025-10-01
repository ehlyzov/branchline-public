import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import editorWorkerUrl from 'monaco-editor/esm/vs/editor/editor.worker?worker&url';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import cssWorkerUrl from 'monaco-editor/esm/vs/language/css/css.worker?worker&url';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import htmlWorkerUrl from 'monaco-editor/esm/vs/language/html/html.worker?worker&url';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import jsonWorkerUrl from 'monaco-editor/esm/vs/language/json/json.worker?worker&url';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import tsWorkerUrl from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker&url';

type MonacoEnvironment = {
  getWorker(moduleId: string, label: string): Worker;
  getWorkerUrl?(moduleId: string, label: string): string;
};

type WorkerFactory = () => Worker;

type WorkerResolver = {
  worker: WorkerFactory;
  url: string;
};

const factories: Record<string, WorkerResolver> = {
  json: { worker: () => new JsonWorker(), url: jsonWorkerUrl },
  css: { worker: () => new CssWorker(), url: cssWorkerUrl },
  scss: { worker: () => new CssWorker(), url: cssWorkerUrl },
  less: { worker: () => new CssWorker(), url: cssWorkerUrl },
  html: { worker: () => new HtmlWorker(), url: htmlWorkerUrl },
  handlebars: { worker: () => new HtmlWorker(), url: htmlWorkerUrl },
  razor: { worker: () => new HtmlWorker(), url: htmlWorkerUrl },
  typescript: { worker: () => new TsWorker(), url: tsWorkerUrl },
  javascript: { worker: () => new TsWorker(), url: tsWorkerUrl }
};

const defaultResolver: WorkerResolver = {
  worker: () => new EditorWorker(),
  url: editorWorkerUrl
};

const globalScope = globalThis as typeof globalThis & {
  MonacoEnvironment?: MonacoEnvironment;
};

if (!globalScope.MonacoEnvironment) {
  globalScope.MonacoEnvironment = {
    getWorker(_moduleId, label) {
      const resolver = factories[label] ?? defaultResolver;
      return resolver.worker();
    },
    getWorkerUrl(_moduleId, label) {
      const resolver = factories[label] ?? defaultResolver;
      return resolver.url;
    }
  };
}
