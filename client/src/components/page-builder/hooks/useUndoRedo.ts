import { useState, useCallback } from "react";
import type { PageData } from "../AdvancedPageBuilder";

interface HistoryState {
  past: PageData[];
  present: PageData;
  future: PageData[];
}

export function useUndoRedo(initialState: PageData) {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const pushState = useCallback((newState: PageData) => {
    setHistory(prevHistory => ({
      past: [...prevHistory.past, prevHistory.present],
      present: newState,
      future: []
    }));
  }, []);

  const undo = useCallback(() => {
    if (!canUndo) return;

    setHistory(prevHistory => {
      const previous = prevHistory.past[prevHistory.past.length - 1];
      const newPast = prevHistory.past.slice(0, prevHistory.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [prevHistory.present, ...prevHistory.future]
      };
    });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setHistory(prevHistory => {
      const next = prevHistory.future[0];
      const newFuture = prevHistory.future.slice(1);

      return {
        past: [...prevHistory.past, prevHistory.present],
        present: next,
        future: newFuture
      };
    });
  }, [canRedo]);

  const reset = useCallback((newState: PageData) => {
    setHistory({
      past: [],
      present: newState,
      future: []
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory(prevHistory => ({
      past: [],
      present: prevHistory.present,
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
    present: history.present
  };
}