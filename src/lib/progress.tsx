import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';

import { LESSON_OF_QUESTION, PLAN, type PlanItem } from '../data/content';
import type { Subtopic } from '../data/types';
import { addDays, dayKey, daysBetween } from './dates';
import { syncReminders } from './reminders';

const STORAGE_KEY = 'calc2.progress.v1';

type Reminder = { enabled: boolean; hour: number; minute: number };

type ProgressState = {
  startedOn: string | null; // day the plan started (first launch)
  correct: Record<string, true>; // questionId -> answered correctly at least once
  completedOn: Record<string, string>; // plan item id -> day it was completed
  reminder: Reminder;
};

const INITIAL: ProgressState = {
  startedOn: null,
  correct: {},
  completedOn: {},
  reminder: { enabled: true, hour: 19, minute: 0 },
};

export type ScheduleStatus = { kind: 'on_track' } | { kind: 'ahead'; days: number } | { kind: 'behind'; days: number };

type ProgressValue = {
  loaded: boolean;
  today: string;
  planDay: number; // 1-based day of the plan that "today" is
  nextUp: PlanItem | null; // first unfinished item in plan order
  doneToday: PlanItem[]; // items completed today
  completedCount: number;
  streak: number;
  status: ScheduleStatus;
  reminder: Reminder;
  isComplete: (id: string) => boolean;
  correctCount: (lesson: Subtopic) => number;
  markCorrect: (questionId: string) => void;
  markComplete: (id: string) => void;
  setReminder: (r: Partial<Reminder>) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(INITIAL);
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState(dayKey());

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const saved: Partial<ProgressState> = raw ? JSON.parse(raw) : {};
        setState({ ...INITIAL, ...saved, startedOn: saved.startedOn ?? dayKey() });
      })
      .catch(() => setState({ ...INITIAL, startedOn: dayKey() }))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, loaded]);

  // Roll "today" over when the app comes back to the foreground on a new day.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') setToday(dayKey());
    });
    return () => sub.remove();
  }, []);

  const derived = useMemo(() => {
    // Only count items that exist in the current plan (old saved ids are ignored).
    const done = PLAN.filter((p) => state.completedOn[p.id]);
    const completedCount = done.length;
    const nextUp = PLAN.find((p) => !state.completedOn[p.id]) ?? null;
    const doneToday = done.filter((p) => state.completedOn[p.id] === today);
    const planDay = state.startedOn ? daysBetween(state.startedOn, today) + 1 : 1;

    // Days with at least one completed item, counted back from today (or yesterday,
    // so the streak isn't shown as broken before today's lesson is done).
    const activeDays = new Set(done.map((p) => state.completedOn[p.id]));
    let streak = 0;
    let cursor = activeDays.has(today) ? today : addDays(today, -1);
    while (activeDays.has(cursor)) {
      streak++;
      cursor = addDays(cursor, -1);
    }

    // Target: one item per day. By the end of today, `planDay` items should be done.
    const target = Math.min(planDay, PLAN.length);
    let status: ScheduleStatus = { kind: 'on_track' };
    if (completedCount > target) status = { kind: 'ahead', days: completedCount - target };
    else if (completedCount < target - 1) status = { kind: 'behind', days: target - 1 - completedCount };

    return { completedCount, nextUp, doneToday, planDay, streak, status };
  }, [state.completedOn, state.startedOn, today]);

  // Keep the device's scheduled reminders in sync with progress.
  useEffect(() => {
    if (!loaded) return;
    const { nextUp, doneToday } = derived;
    syncReminders({
      ...state.reminder,
      doneToday: doneToday.length > 0,
      next: nextUp ? { day: PLAN.indexOf(nextUp) + 1, title: nextUp.title } : null,
    }).catch(() => {});
  }, [loaded, derived, state.reminder]);

  // A lesson is complete once every one of its practice questions has been answered correctly.
  const markCorrect = useCallback((questionId: string) => {
    setState((prev) => {
      if (prev.correct[questionId]) return prev;
      const correct = { ...prev.correct, [questionId]: true as const };
      const lesson = LESSON_OF_QUESTION.get(questionId);
      let completedOn = prev.completedOn;
      if (lesson && !completedOn[lesson.subtopic_id] && lesson.practice_questions.every((q) => correct[q.id])) {
        completedOn = { ...completedOn, [lesson.subtopic_id]: dayKey() };
      }
      return { ...prev, correct, completedOn };
    });
    setToday(dayKey());
  }, []);

  const markComplete = useCallback((id: string) => {
    setState((prev) =>
      prev.completedOn[id] ? prev : { ...prev, completedOn: { ...prev.completedOn, [id]: dayKey() } },
    );
    setToday(dayKey());
  }, []);

  const setReminder = useCallback((r: Partial<Reminder>) => {
    setState((prev) => ({ ...prev, reminder: { ...prev.reminder, ...r } }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((prev) => ({ ...INITIAL, reminder: prev.reminder, startedOn: dayKey() }));
  }, []);

  const value = useMemo<ProgressValue>(
    () => ({
      loaded,
      today,
      ...derived,
      reminder: state.reminder,
      isComplete: (id) => !!state.completedOn[id],
      correctCount: (s) => s.practice_questions.filter((q) => state.correct[q.id]).length,
      markCorrect,
      markComplete,
      setReminder,
      resetProgress,
    }),
    [loaded, today, derived, state, markCorrect, markComplete, setReminder, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
