"use client";

import * as React from "react";

export interface ProgressContextValue {
  /** Whether the slim bar is currently visible/animating. */
  isLoading: boolean;
  /** Current progress value, 0–100. */
  progress: number;
  /** Start (or restart) the loading animation. Safe to call repeatedly. */
  start: () => void;
  /** Complete and hide the bar. */
  done: () => void;
  /** Manually set the progress value (0–100). */
  set: (value: number) => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

// Tunable timing/easing constants for the auto-increment animation.
const START_VALUE = 8;
const MAX_AUTO_VALUE = 92;
const TICK_MS = 200;
const DONE_DELAY_MS = 300;
// Safety net in case a navigation never resolves (e.g. aborted route change).
const SAFETY_TIMEOUT_MS = 8000;

export interface ProgressProviderProps {
  children: React.ReactNode;
}

/**
 * Provides page-transition progress state to the tree. Pair with
 * `<SlimBar />` (from `@gad/ui/slim-bar`) which reads this context and
 * automatically starts/stops the bar on route changes.
 */
export function ProgressProvider({ children }: ProgressProviderProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const isLoadingRef = React.useRef(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const safetyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearTimers = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, []);

  const done = React.useCallback(() => {
    if (!isLoadingRef.current) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    setProgress(100);
    hideTimeoutRef.current = setTimeout(() => {
      isLoadingRef.current = false;
      setIsLoading(false);
      setProgress(0);
      hideTimeoutRef.current = null;
    }, DONE_DELAY_MS);
  }, []);

  const start = React.useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    clearTimers();
    setIsLoading(true);
    setProgress(START_VALUE);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_AUTO_VALUE) return prev;
        const remaining = MAX_AUTO_VALUE - prev;
        const increment = Math.max(remaining * 0.1, 0.5);
        return Math.min(prev + increment, MAX_AUTO_VALUE);
      });
    }, TICK_MS);

    safetyTimeoutRef.current = setTimeout(() => {
      done();
    }, SAFETY_TIMEOUT_MS);
  }, [clearTimers, done]);

  const set = React.useCallback((value: number) => {
    setProgress(Math.min(Math.max(value, 0), 100));
  }, []);

  React.useEffect(() => clearTimers, [clearTimers]);

  const value = React.useMemo<ProgressContextValue>(
    () => ({ isLoading, progress, start, done, set }),
    [isLoading, progress, start, done, set],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a <ProgressProvider>");
  }
  return ctx;
}
