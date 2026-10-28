import { BLOCK1, BLOCK1_LESSONS } from './lessons/block1';
import { BLOCK2, BLOCK2_LESSONS } from './lessons/block2';
import { BLOCK3, BLOCK3_LESSONS } from './lessons/block3';
import { BLOCK4, BLOCK4_LESSONS } from './lessons/block4';
import { BLOCK1_PRACTICE, BLOCK2_PRACTICE, BLOCK3_PRACTICE, BLOCK4_PRACTICE } from './lessons/practice';
import type { PracticeQuestion, Subtopic } from './types';

export const PRACTICE_SESSION_SIZE = 20;

export type PracticeSession = {
  session_id: string;
  unit_id: string;
  unit_title: string;
  title: string;
  own_questions: PracticeQuestion[]; // always included
  pool: PracticeQuestion[]; // the block's lesson questions, sampled to fill the session
};

export type PlanItem =
  | { kind: 'lesson'; id: string; title: string; unit_id: string; lesson: Subtopic }
  | { kind: 'practice'; id: string; title: string; unit_id: string; session: PracticeSession };

export type Exam = { exam_id: string; title: string; covers: string; after_id: string };

const BLOCKS = [
  { unit: BLOCK1, lessons: BLOCK1_LESSONS, practice: BLOCK1_PRACTICE },
  { unit: BLOCK2, lessons: BLOCK2_LESSONS, practice: BLOCK2_PRACTICE },
  { unit: BLOCK3, lessons: BLOCK3_LESSONS, practice: BLOCK3_PRACTICE },
  { unit: BLOCK4, lessons: BLOCK4_LESSONS, practice: BLOCK4_PRACTICE },
];

const SUBTOPICS: Subtopic[] = BLOCKS.flatMap((b) => b.lessons);

const SESSIONS: PracticeSession[] = BLOCKS.map((b, i) => ({
  session_id: `practice_block_${i + 1}`,
  unit_id: b.unit.unit_id,
  unit_title: b.unit.unit_title,
  title: `Block ${i + 1} Practice`,
  own_questions: b.practice,
  pool: b.lessons.flatMap((l) => l.practice_questions),
}));

// The daily plan: one item per day — each block's lessons, then its practice session.
export const PLAN: PlanItem[] = BLOCKS.flatMap((b, i) => [
  ...b.lessons.map(
    (l): PlanItem => ({ kind: 'lesson', id: l.subtopic_id, title: l.title, unit_id: l.unit_id, lesson: l }),
  ),
  { kind: 'practice', id: SESSIONS[i].session_id, title: SESSIONS[i].title, unit_id: b.unit.unit_id, session: SESSIONS[i] },
]);

export const UNITS = BLOCKS.map((b) => ({
  ...b.unit,
  items: PLAN.filter((p) => p.unit_id === b.unit.unit_id),
}));

// Exam dates from the syllabus, shown in the course list after the last item they cover.
export const EXAMS: Exam[] = [
  { exam_id: 'midterm_1', title: 'Midterm Exam 1', covers: '5.5, 6.1–6.5, 6.7, 7.1–7.2', after_id: 'sec_7_2' },
  { exam_id: 'midterm_2', title: 'Midterm Exam 2', covers: '7.3–7.8, 11.1', after_id: 'sec_11_1' },
  { exam_id: 'midterm_3', title: 'Midterm Exam 3', covers: '11.2–11.10', after_id: 'practice_block_3' },
  { exam_id: 'final', title: 'Final Exam', covers: 'everything (comprehensive)', after_id: 'practice_block_4' },
];

export function dayNumber(id: string): number {
  return PLAN.findIndex((p) => p.id === id) + 1;
}

export function getPlanItem(id: string): PlanItem | undefined {
  return PLAN.find((p) => p.id === id);
}

export function getSubtopic(id: string): Subtopic | undefined {
  return SUBTOPICS.find((s) => s.subtopic_id === id);
}

export function getSession(id: string): PracticeSession | undefined {
  return SESSIONS.find((s) => s.session_id === id);
}

export function itemLabel(item: PlanItem): string {
  return item.kind === 'lesson' ? `§${item.lesson.section} ${item.title}` : item.title;
}

export type QuestionWithSource = PracticeQuestion & { source_title: string; unit_title: string };

// Master question list — the Bookmark Bank filters this by bookmarked ids.
export const ALL_QUESTIONS: QuestionWithSource[] = [
  ...SUBTOPICS.flatMap((s) =>
    s.practice_questions.map((q) => ({ ...q, source_title: `§${s.section} ${s.title}`, unit_title: s.unit_title })),
  ),
  ...SESSIONS.flatMap((s) => s.own_questions.map((q) => ({ ...q, source_title: s.title, unit_title: s.unit_title }))),
];

export const LESSON_OF_QUESTION = new Map(
  SUBTOPICS.flatMap((s) => s.practice_questions.map((q) => [q.id, s] as const)),
);
