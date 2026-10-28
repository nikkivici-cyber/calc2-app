import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ScrollViewInstance } from 'react-native';

import CourseShell from '../../components/CourseShell';
import PracticeQuestionCard from '../../components/PracticeQuestionCard';
import { PLAN, PRACTICE_SESSION_SIZE, dayNumber, getPlanItem, getSession } from '../../data/content';
import type { PracticeQuestion } from '../../data/types';
import { CONTENT_MAX_WIDTH, useIsWide } from '../../lib/layout';
import { switchItem } from '../../lib/navigation';
import { useProgress } from '../../lib/progress';
import { colors } from '../../lib/theme';

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// The block's own mixed questions, topped up to PRACTICE_SESSION_SIZE from its lessons.
function buildSet(own: PracticeQuestion[], pool: PracticeQuestion[]): PracticeQuestion[] {
  const fill = shuffle(pool).slice(0, Math.max(0, PRACTICE_SESSION_SIZE - own.length));
  return shuffle([...own, ...fill]);
}

export default function PracticeSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const session = getSession(id);
  const isWide = useIsWide();
  const { isComplete, markComplete, doneToday } = useProgress();
  const scrollRef = useRef<ScrollViewInstance>(null);

  const [round, setRound] = useState(0);
  // First answer per question in this set: true = correct on the first try.
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});

  const questions = useMemo(
    () => (session ? buildSet(session.own_questions, session.pool) : []),
    [session, round],
  );

  useEffect(() => {
    setFirstTry({});
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id, round]);

  const answered = Object.keys(firstTry).length;
  const score = Object.values(firstTry).filter(Boolean).length;
  const finished = questions.length > 0 && answered === questions.length;

  useEffect(() => {
    if (finished && session) markComplete(session.session_id);
  }, [finished, session, markComplete]);

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.body}>Practice session not found.</Text>
      </View>
    );
  }

  const item = getPlanItem(session.session_id)!;
  const following = PLAN[PLAN.indexOf(item) + 1];
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const missed = questions.filter((q) => firstTry[q.id] === false);

  return (
    <>
      <Stack.Screen options={{ title: isWide ? 'Calculus II' : session.title }} />
      <CourseShell activeId={session.session_id} kind="practice">
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={styles.container}>
          <Text style={styles.kicker}>
            Day {dayNumber(session.session_id)} · {session.unit_title}
          </Text>
          <Text style={styles.title}>★ {session.title}</Text>
          <Text style={styles.body}>
            {questions.length} mixed questions covering the whole block — {session.own_questions.length} exam-style
            problems plus a random selection from the lessons. Answer them all to finish the session; your score
            counts first tries only.
          </Text>

          {/* Progress summary */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreText}>
                Answered {answered}/{questions.length}
              </Text>
              <Text style={styles.scoreText}>
                First-try score: {score}/{answered || 0}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${(answered / Math.max(1, questions.length)) * 100}%` }]} />
            </View>
          </View>

          {questions.map((q, i) => (
            <PracticeQuestionCard
              key={`${round}-${q.id}`}
              question={q}
              number={i + 1}
              onAnswer={(correct) => setFirstTry((prev) => (q.id in prev ? prev : { ...prev, [q.id]: correct }))}
            />
          ))}

          {finished && (
            <View style={styles.doneBanner}>
              <Text style={styles.doneTitle}>
                {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'} Session complete: {score}/{questions.length} ({pct}%)
              </Text>
              <Text style={styles.body}>
                {pct >= 80
                  ? 'Strong result — you are ready for this block on the exam.'
                  : pct >= 60
                    ? 'Solid. Review the questions you missed, then try a new set.'
                    : 'Worth another pass. Revisit the lessons for the questions you missed and try a new set.'}
              </Text>
              {missed.length > 0 && (
                <Text style={styles.missed}>
                  Missed on first try: {missed.map((q) => `Q${questions.indexOf(q) + 1}`).join(', ')} — bookmark them
                  to review later.
                </Text>
              )}
              {isComplete(session.session_id) && doneToday.length > 0 && (
                <Text style={styles.missed}>Today's goal is done.</Text>
              )}
            </View>
          )}

          <Pressable onPress={() => setRound((r) => r + 1)} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>↻ New set of {PRACTICE_SESSION_SIZE} questions</Text>
          </Pressable>
          {following && (
            <Pressable
              onPress={() => switchItem(following, 'practice', isWide)}
              style={[finished ? styles.primaryButton : styles.secondaryButton]}
            >
              <Text style={finished ? styles.primaryText : styles.secondaryText}>
                Next: Day {dayNumber(following.id)} · {following.title} →
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </CourseShell>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  kicker: { fontSize: 13, fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 6 },
  body: { fontSize: 15, color: colors.body, lineHeight: 22 },
  scoreCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginVertical: 14,
  },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  scoreText: { fontWeight: '700', color: colors.text, fontVariant: ['tabular-nums'] },
  barTrack: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.primary },
  doneBanner: {
    backgroundColor: colors.correctSoft,
    borderColor: colors.correct,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  doneTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  missed: { fontSize: 14, color: colors.body },
  primaryButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  primaryText: { color: '#FFF', fontWeight: '600' },
  secondaryButton: { padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center', backgroundColor: colors.primarySoft },
  secondaryText: { color: colors.primary, fontWeight: '600' },
});
