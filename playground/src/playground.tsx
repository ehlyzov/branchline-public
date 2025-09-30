import React from 'react';
import './monaco-environment';
import * as monaco from 'monaco-editor';
import { BRANCHLINE_LANGUAGE_ID, ensureBranchlineLanguage } from './branchline-language';
import './playground.css';

const DEFAULT_PROGRAM = `LET fullName = msg.first_name + " " + msg.last_name;
LET loyalty = msg.loyalty_tier ?? "standard";

OUTPUT {
    id: msg.id,
    full_name: fullName,
    loyalty_tier: loyalty,
    shipping_city: msg.address.city
}`;

const DEFAULT_INPUT = `{
  "id": 42,
  "first_name": "Ada",
  "last_name": "Lovelace",
  "loyalty_tier": null,
  "address": {
    "city": "London"
  }
}`;

type RawExample = {
  title: string;
  description?: string;
  program: string | string[];
  input: unknown;
  trace?: boolean;
};

type ExampleModule = {
  default: RawExample;
};

type PlaygroundExample = {
  id: string;
  title: string;
  description?: string;
  program: string;
  input: string;
  enableTracing: boolean;
};

const exampleModules = import.meta.glob<ExampleModule>('../examples/*.json', {
  eager: true
});

function normalizeExample(id: string, raw: RawExample): PlaygroundExample {
  const program = Array.isArray(raw.program) ? raw.program.join('\n') : raw.program ?? DEFAULT_PROGRAM;
  let input = '';

  if (typeof raw.input === 'string') {
    input = raw.input;
  } else {
    input = JSON.stringify(raw.input, null, 2);
  }

  return {
    id,
    title: raw.title,
    description: raw.description,
    program,
    input: input || DEFAULT_INPUT,
    enableTracing: Boolean(raw.trace)
  };
}

type WorkerResult = {
  success: boolean;
  outputJson: string | null;
  errorMessage: string | null;
  line: number | null;
  column: number | null;
  explainJson: string | null;
  explainHuman: string | null;
};

export function BranchlinePlayground() {
  const programContainerRef = React.useRef<HTMLDivElement | null>(null);
  const inputContainerRef = React.useRef<HTMLDivElement | null>(null);
  const outputRef = React.useRef<HTMLPreElement | null>(null);
  const programEditorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const inputEditorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const workerRef = React.useRef<Worker>();

  const [isRunning, setIsRunning] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [output, setOutput] = React.useState('');
  const [traceHuman, setTraceHuman] = React.useState<string | null>(null);
  const [traceJson, setTraceJson] = React.useState<string | null>(null);
  const [isTracingEnabled, setIsTracingEnabled] = React.useState(false);
  const tracingRef = React.useRef(isTracingEnabled);
  const examples = React.useMemo(() => {
    const items: PlaygroundExample[] = Object.entries(exampleModules).map(([path, module]) => {
      const filename = path.split('/').pop() ?? 'example';
      const id = filename.replace(/\.json$/i, '');
      return normalizeExample(id, module.default);
    });

    if (items.length === 0) {
      items.push(
        normalizeExample('starter', {
          title: 'Starter playground example',
          description: 'Begin with a minimal Branchline transform body and an accompanying JSON message.',
          program: DEFAULT_PROGRAM,
          input: JSON.parse(DEFAULT_INPUT)
        })
      );
    }

    return items.sort((a, b) => a.title.localeCompare(b.title));
  }, []);
  const [selectedExampleId, setSelectedExampleId] = React.useState(() => examples[0]?.id ?? '');
  const selectedExample = React.useMemo(
    () => examples.find((item) => item.id === selectedExampleId) ?? null,
    [examples, selectedExampleId]
  );

  const run = React.useCallback(() => {
    const program = programEditorRef.current?.getValue() ?? '';
    const input = inputEditorRef.current?.getValue() ?? '';
    setIsRunning(true);
    setError(null);
    setTraceHuman(null);
    setTraceJson(null);
    workerRef.current?.postMessage({ code: program, input, trace: tracingRef.current });
  }, []);

  React.useEffect(() => {
    ensureBranchlineLanguage();

    if (programContainerRef.current && !programEditorRef.current) {
      programEditorRef.current = monaco.editor.create(programContainerRef.current, {
        value: selectedExample?.program ?? DEFAULT_PROGRAM,
        language: BRANCHLINE_LANGUAGE_ID,
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14
      });
      programEditorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => run());
    }

    if (inputContainerRef.current && !inputEditorRef.current) {
      inputEditorRef.current = monaco.editor.create(inputContainerRef.current, {
        value: selectedExample?.input ?? DEFAULT_INPUT,
        language: 'json',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14
      });
    }

    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    workerRef.current.onmessage = (event: MessageEvent<WorkerResult>) => {
      const result = event.data;
      setIsRunning(false);

      if (programEditorRef.current) {
        const model = programEditorRef.current.getModel();
        if (model) {
          if (result.success) {
            monaco.editor.setModelMarkers(model, 'branchline', []);
          } else {
            const line = result.line ?? 1;
            const column = result.column ?? 1;
            monaco.editor.setModelMarkers(model, 'branchline', [
              {
                startLineNumber: line,
                startColumn: column,
                endLineNumber: line,
                endColumn: column + 1,
                message: result.errorMessage ?? 'Error',
                severity: monaco.MarkerSeverity.Error
              }
            ]);
          }
        }
      }

      if (result.success) {
        setError(null);
        setOutput(result.outputJson ?? 'null');
        setTraceHuman(result.explainHuman ?? null);
        setTraceJson(result.explainJson ?? null);
        if (outputRef.current) {
          outputRef.current.textContent = result.outputJson ?? 'null';
        }
      } else {
        const location =
          result.line != null && result.column != null
            ? ` (line ${result.line}, column ${result.column})`
            : '';
        const message = result.errorMessage ?? 'Unexpected error';
        const formatted = `${message}${location}`;
        setError(formatted);
        setOutput('');
        setTraceHuman(null);
        setTraceJson(null);
        if (outputRef.current) {
          outputRef.current.textContent = '';
        }
      }
    };

    return () => {
      workerRef.current?.terminate();
      programEditorRef.current?.dispose();
      inputEditorRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!programEditorRef.current || !inputEditorRef.current) {
      return;
    }

    const program = selectedExample?.program ?? DEFAULT_PROGRAM;
    const input = selectedExample?.input ?? DEFAULT_INPUT;

    if (programEditorRef.current.getValue() !== program) {
      programEditorRef.current.setValue(program);
    }

    if (inputEditorRef.current.getValue() !== input) {
      inputEditorRef.current.setValue(input);
    }

    setError(null);
    setOutput('');
    setTraceHuman(null);
    setTraceJson(null);
    if (outputRef.current) {
      outputRef.current.textContent = '';
    }

    setIsTracingEnabled(selectedExample?.enableTracing ?? false);
  }, [selectedExample]);

  React.useEffect(() => {
    tracingRef.current = isTracingEnabled;
  }, [isTracingEnabled]);

  return (
    <div className="branchline-playground">
      <header className="playground-header">
        <div className="playground-title">
          <h2>Branchline Playground</h2>
          <p>
            Explore Branchline transformations with curated scenarios. Pick an example, tweak the editors, and run the
            program. Switching examples restores their original content.
          </p>
        </div>
        <div className="playground-controls">
          <label className="playground-select">
            <span>Example</span>
            <select
              value={selectedExampleId}
              onChange={(event) => setSelectedExampleId(event.target.value)}
            >
              {examples.map((example) => (
                <option key={example.id} value={example.id}>
                  {example.title}
                </option>
              ))}
            </select>
          </label>
          <label className="playground-toggle">
            <input
              type="checkbox"
              checked={isTracingEnabled}
              onChange={(event) => setIsTracingEnabled(event.target.checked)}
            />
            <span>Enable tracing (EXPLAIN)</span>
          </label>
          <button className="playground-button" onClick={run} disabled={isRunning}>
            {isRunning ? 'Running…' : 'Run ▶'}
          </button>
        </div>
      </header>

      {selectedExample?.description ? (
        <div className="example-description">{selectedExample.description}</div>
      ) : null}

      <div className="playground-note">
        Examples are loaded from <code>playground/examples</code>. Add a new file there and refresh the page to see it here.
        The editor shows only the body of <code>TRANSFORM</code>; use the <code>msg</code> variable to reference the incoming payload.
        Toggle tracing when you need <code>EXPLAIN(...)</code> provenance output.
      </div>

      <main className="playground-main">
        <div className="playground-column">
          <section className="panel panel--editor">
            <header className="panel-header">
              <div>
                <h3>Branchline Program</h3>
                <p>Use ⌘/Ctrl + Enter to run the playground.</p>
              </div>
            </header>
            <div ref={programContainerRef} className="editor-surface" />
          </section>
        </div>
        <div className="playground-column">
          <section className="panel panel--editor">
            <header className="panel-header">
              <div>
                <h3>Input JSON</h3>
                <p>Provide the object bound to <code>msg</code>.</p>
              </div>
            </header>
            <div ref={inputContainerRef} className="editor-surface" />
          </section>
          <section className="panel">
            <header className="panel-header">
              <div>
                <h3>Output</h3>
                <p>The result of executing your Branchline program.</p>
              </div>
            </header>
            {error ? (
              <div className="panel-error">{error}</div>
            ) : (
              <>
                <pre ref={outputRef} className="panel-output">
                  {output || 'Run the playground to view JSON output.'}
                </pre>
                {traceHuman || traceJson ? (
                  <div className="panel-trace">
                    <div className="panel-subheader">Trace explanations</div>
                    {traceHuman ? (
                      <pre className="panel-output panel-output--trace">{traceHuman}</pre>
                    ) : null}
                    {traceJson ? (
                      <details className="panel-trace-structured">
                        <summary>View structured provenance JSON</summary>
                        <pre className="panel-output panel-output--trace">{traceJson}</pre>
                      </details>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
