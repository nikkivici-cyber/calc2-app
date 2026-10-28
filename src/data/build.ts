import type { PracticeQuestion, Subtopic } from './types';

// Helpers that keep the lesson files compact. Write LaTeX in String.raw (`r`) strings
// so backslashes stay single, and never write "${" inside them.
export const r = String.raw;

export type UnitInfo = { unit_id: string; unit_title: string };

// The correct answer goes first; options are shuffled when displayed.
export function mc(o: {
  id: string;
  question: string;
  answer: string;
  wrong: string[];
  hint?: string;
  solution: string[];
}): PracticeQuestion {
  return {
    id: o.id,
    question: o.question,
    options: [o.answer, ...o.wrong],
    correct_index: 0,
    hint: o.hint,
    solution: o.solution,
  };
}

export function lesson(
  unit: UnitInfo,
  o: {
    section: string;
    title: string;
    formula: string;
    takeaway: string;
    sample: { question: string; steps: string[] };
    questions: PracticeQuestion[];
  },
): Subtopic {
  return {
    ...unit,
    subtopic_id: `sec_${o.section.replace('.', '_')}`,
    section: o.section,
    title: o.title,
    overview: { formula: o.formula, key_takeaway: o.takeaway },
    sample_question: o.sample,
    practice_questions: o.questions,
  };
}
