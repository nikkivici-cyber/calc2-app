// Content schema. Text fields may mix plain text, **bold**, inline $...$ and display $$...$$ LaTeX.

export type PracticeQuestion = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
};

export type Subtopic = {
  subtopic_id: string;
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
