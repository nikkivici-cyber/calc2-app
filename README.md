# Calc II Study

Expo (SDK 58) + Expo Router app for Calculus II review, built around **one lesson a day**.

Content follows the syllabus in 4 blocks: 27 lessons (one per textbook section: 5.5, 6.1–6.7, 7.1–7.8,
11.1–11.10, 10.1–10.4), each with a guided example and 5 practice questions with hints and full worked
solutions, plus a 20-question **Block Practice** session at the end of each block (31 days in total).
Midterm and final exams are marked in the course list.

- **Today tab:** today's lesson, streak, and whether you're on track, ahead or behind the one-a-day plan.
- **Daily reminder:** a local notification at the time you pick, only if today's lesson isn't finished yet.
  It's scheduled on the device, so no server or API key is needed (iOS/Android only).
- **Formulas tab:** searchable formula sheet — trig identities plus every formula and technique in the syllabus.
- **Course tab / iPad sidebar:** every lesson, so students can work ahead of the plan.
- A lesson is **complete** once every practice question has been answered correctly (retries allowed).

## Run

```bash
npm install
npx expo start        # scan the QR code with Expo Go, or press w for web
```

## Structure

- `src/app/(tabs)/index.tsx` — Today tab (daily plan, streak, reminder settings)
- `src/app/(tabs)/course.tsx` — Course tab: all lessons by unit (the "glossary")
- `src/app/(tabs)/bookmarks.tsx` — Bookmark Bank tab (re-attempt saved questions)
- `src/app/subtopic/[id].tsx` — 3-stage subtopic screen: concept & formula → guided sample (reveal step by step) → practice set
- `src/components/PracticeQuestionCard.tsx` — multiple choice, bookmark toggle, feedback, retry (options are shuffled on display)
- `src/components/MathText.tsx` / `.web.tsx` — renders text with `**bold**`, `$inline$` and `$$display$$` LaTeX via KaTeX
- `src/lib/progress.tsx` — plan start date, correct answers, completed lessons, streak, reminder settings (AsyncStorage)
- `src/lib/reminders.ts` — keeps a rolling week of local reminders in sync with progress
- `src/components/CourseList.tsx` — lesson list used by the Course tab and the iPad sidebar
- `src/lib/bookmarks.tsx` — bookmarked ids, persisted with AsyncStorage
- `src/data/lessons/block1-4.ts` — lessons; `src/data/lessons/practice.ts` — block practice questions
- `src/data/formulas.ts` — formula sheet content (`src/app/(tabs)/formulas.tsx` renders it)
- `src/data/content.ts` — assembles the daily plan (lessons + practice sessions) and exam markers
- `src/app/practice/[id].tsx` — block practice session (20 questions, first-try score, new set)

## Adding content

Add a `lesson(...)` with `mc(...)` questions to the right block file in `src/data/lessons/` (array order = day order). Write LaTeX inside `` r`...` `` strings
(single backslashes, e.g. `` r`$\int x\,dx$` ``). Put the correct answer in `answer` and distractors in `wrong` — options are shuffled on display. Question `id`s must be unique and should never change, because bookmarks are stored by id.

Note: on iOS/Android, KaTeX is loaded from the jsDelivr CDN, so math needs an internet connection.

Reminders need a real device. They work in Expo Go for local notifications; for an App Store / TestFlight build use
`npx eas-cli@latest build -p ios`.

## Web preview

`node scripts/build-web-single.mjs` builds the whole app into one self-contained file, `dist-single/index.html`
(JS, KaTeX CSS and fonts inlined). Open it in a browser or host it anywhere. Reminders don't run on the web.
