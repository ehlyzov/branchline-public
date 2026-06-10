export type PlaygroundSubsetCompatibility = 'COMPATIBLE' | 'INCOMPATIBLE' | 'UNKNOWN';

export type PlaygroundSourceSpan = {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

export type PlaygroundDiagnosticPayload = {
  operation?: string;
  targetPath?: string;
  expectedKind?: string;
  actualKind?: string;
  expected?: unknown;
  actual?: unknown;
  hint?: string;
};

export type PlaygroundDiagnostic = {
  code: string;
  message: string;
  severity: 'ERROR' | 'WARNING';
  category: string;
  span: PlaygroundSourceSpan | null;
  payload: PlaygroundDiagnosticPayload | null;
};

export type PlaygroundFeatureUsage = {
  features: string[];
};

export type PlaygroundInspectPayload = {
  success: boolean;
  normalizedSource: string | null;
  subsetCompatibility: PlaygroundSubsetCompatibility;
  diagnostics: PlaygroundDiagnostic[];
  warnings: PlaygroundDiagnostic[];
  featureUsage: PlaygroundFeatureUsage;
  transforms: unknown[];
  rawJson: string | null;
};

export type PlaygroundInspectState = {
  requestId: number;
  isLoading: boolean;
  error: string | null;
  result: PlaygroundInspectPayload | null;
};

export type PlaygroundState = {
  inspect: PlaygroundInspectState;
};

export type ReceiveInspectResultOutcome = {
  state: PlaygroundState;
  accepted: boolean;
};

export function createInitialPlaygroundState(): PlaygroundState {
  return {
    inspect: {
      requestId: 0,
      isLoading: false,
      error: null,
      result: null
    }
  };
}

export function startInspectRequest(state: PlaygroundState, requestId: number): PlaygroundState {
  return {
    ...state,
    inspect: {
      ...state.inspect,
      requestId,
      isLoading: true,
      error: null
    }
  };
}

export function cancelInspectRequest(
  state: PlaygroundState,
  requestId: number,
  error: string | null = null
): PlaygroundState {
  return {
    ...state,
    inspect: {
      ...state.inspect,
      requestId,
      isLoading: false,
      error,
      result: null
    }
  };
}

export function receiveInspectResult(
  state: PlaygroundState,
  requestId: number,
  result: PlaygroundInspectPayload | null,
  error: string | null
): ReceiveInspectResultOutcome {
  if (requestId !== state.inspect.requestId) {
    return { state, accepted: false };
  }

  return {
    state: {
      ...state,
      inspect: {
        requestId,
        isLoading: false,
        error,
        result
      }
    },
    accepted: true
  };
}
