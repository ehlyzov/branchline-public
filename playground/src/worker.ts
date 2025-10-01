type WorkerRequest = {
  code: string;
  input: string;
  trace: boolean;
};

type WorkerResponse = {
  success: boolean;
  outputJson: string | null;
  errorMessage: string | null;
  line: number | null;
  column: number | null;
  explainJson: string | null;
  explainHuman: string | null;
};

import kotlinStdlibUrl from '../../interpreter/build/dist/js/productionLibrary/kotlin-kotlin-stdlib.js?url';
import serializationCoreUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-serialization-kotlinx-serialization-core.js?url';
import serializationJsonUrl from '../../interpreter/build/dist/js/productionLibrary/kotlinx-serialization-kotlinx-serialization-json.js?url';
import interpreterUrl from '../../interpreter/build/dist/js/productionLibrary/branchline-interpreter.js?url';

type PlaygroundFacade = {
  run(program: string, inputJson: string, enableTracing: boolean): WorkerResponse;
};

const INTERPRETER_GLOBAL = 'io.github.ehlyzov.branchline-public:interpreter';

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
  const { code, input, trace } = event.data;
  try {
    const runner = await loadFacade();
    const result = runner.run(code, input, trace) as WorkerResponse;
    self.postMessage(result satisfies WorkerResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallback: WorkerResponse = {
      success: false,
      outputJson: null,
      errorMessage: message,
      line: null,
      column: null,
      explainJson: null,
      explainHuman: null
    };
    self.postMessage(fallback);
  }
};

export {};
