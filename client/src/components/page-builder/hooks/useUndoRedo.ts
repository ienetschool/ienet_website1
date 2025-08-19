import { useState, useCallback, useRef } from 'react';
import type { PageData } from './usePageBuilder';

export interface UndoRedoState {
  past: PageData[];
  present: PageData;
  future: PageData[];
}

export function useUndoRedo(initialState: any) {
  const [state, setState] = useState<UndoRedoState>({
    past: [],
    present: { id: '', elements: initialState || [] },
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    setState(prev => {
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future]
      };
    });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setState(prev => {
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture
      };
    });
  }, [canRedo]);

  const pushState = useCallback((newState: PageData) => {
    setState(prev => ({
      past: [...prev.past, prev.present],
      present: newState,
      future: []
    }));
  }, []);

  const reset = useCallback((newState: PageData) => {
    setState({
      past: [],
      present: newState,
      future: []
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({
      past: [],
      present: prev.present,
      future: []
    }));
  }, []);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    pushState,
    reset,
    clearHistory,
    present: state.present
  };
}