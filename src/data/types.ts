// Content schema. Text fields may mix plain text, **bold**, inline $...$ and display $$...$$ LaTeX.

export type PracticeQuestion = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  hint?: string;
  solution: string[]; // full worked solution, one step per entry
};

export type Subtopic = {
  subtopic_id: string;
  number: string; // lesson number within the course, e.g. "2.1" (block 2, lesson 1)
  section: string; // textbook section, e.g. "7.1"
  title: string;
  unit_id: string;
  unit_title: string;
  overview: {
    formula: string;
    key_takeaway: string;
  };
  sample_question: {
    question: string;
    steps: string[];
  };
  practice_questions: PracticeQuestion[];
};

export type Unit = {
  unit_id: string;
  unit_title: string;
  subtopics: Subtopic[];
};
