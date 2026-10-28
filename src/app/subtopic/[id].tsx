import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ScrollViewInstance } from 'react-native';

import CourseShell from '../../components/CourseShell';
import MathText from '../../components/MathText';
import PracticeQuestionCard from '../../components/PracticeQuestionCard';
import { PLAN, dayNumber, getPlanItem, getSubtopic } from '../../data/content';
import { CONTENT_MAX_WIDTH, useIsWide } from '../../lib/layout';
import { switchItem } from '../../lib/navigation';
import { useProgress } from '../../lib/progress';
import { colors } from '../../lib/theme';

export default function SubtopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const subtopic = getSubtopic(id);
  const isWide = useIsWide();
  const { isComplete, correctCount, doneToday } = useProgress();
  const [revealedSteps, setRevealedSteps] = useState(0);
  const scrollRef = useRef<ScrollViewInstance>(null);

  // Switching lessons from the sidebar reuses this screen, so reset per lesson.
  useEffect(() => {
    setRevealedSteps(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id]);

  if (!subtopic) {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>Lesson not found.</Text>
      </View>
    );
  }

  const { steps } = subtopic.sample_question;
  const allRevealed = revealedSteps >= steps.length;
  const day = dayNumber(subtopic.subtopic_id);
  const total = subtopic.practice_questions.length;
  const correct = correctCount(subtopic);
  const complete = isComplete(subtopic.subtopic_id);
  const item = getPlanItem(subtopic.subtopic_id)!;
  const following = PLAN[PLAN.indexOf(item) + 1];
  const metDailyGoal = doneToday.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: isWide ? 'Calculus II' : `§${subtopic.section} ${subtopic.title}` }} />
      <CourseShell activeId={subtopic.subtopic_id} kind="lesson">
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={styles.container}>
          <Text style={styles.unitTitle}>
            Day {day} · Section {subtopic.section}
          </Text>
          <Text style={styles.topicTitle}>{subtopic.title}</Text>
          <View style={styles.lessonMeta}>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${(correct / total) * 100}%` }]} />
            </View>
            <Text style={styles.metaText}>{complete ? '✓ Complete' : `${correct}/${total} correct`}</Text>
          </View>

          {/* 1. CONCEPT & FORMULA OVERVIEW */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>💡 Concept & Formula</Text>
            <View style={styles.formulaBox}>
              <MathText text={subtopic.overview.formula} fontSize={16} color={colors.text} />
            </View>
            <MathText text={subtopic.overview.key_takeaway} />
          </View>

          {/* 2. GUIDED SAMPLE QUESTION */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>📖 Guided Sample Problem</Text>
            <MathText text={subtopic.sample_question.question} fontSize={16} color={colors.text} />

            {steps.slice(0, revealedSteps).map((step, idx) => (
              <View key={`${id}-${idx}`} style={styles.stepBox}>
                <Text style={styles.stepLabel}>Step {idx + 1}</Text>
                <MathText text={step} />
              </View>
            ))}

            {allRevealed ? (
              <Pressable style={styles.secondaryButton} onPress={() => setRevealedSteps(0)}>
                <Text style={styles.secondaryButtonText}>↻ Hide steps & try it yourself</Text>
              </Pressable>
            ) : (
              <View style={styles.revealRow}>
                <Pressable
                  style={({ pressed }) => [styles.revealButton, { flex: 1 }, pressed && { opacity: 0.85 }]}
                  onPress={() => setRevealedSteps((n) => n + 1)}
                >
                  <Text style={styles.buttonText}>
                    {revealedSteps === 0 ? 'Show First Step' : 'Show Next Step'} ({revealedSteps}/{steps.length})
                  </Text>
                </Pressable>
                <Pressable style={styles.showAll} onPress={() => setRevealedSteps(steps.length)}>
                  <Text style={styles.secondaryButtonText}>Show all</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* 3. PRACTICE QUIZ SET */}
          <Text style={styles.sectionHeader}>✍️ Practice Set</Text>
          <Text style={styles.sectionHint}>
            Get all {total} right (retries allowed) to complete today's lesson. Every answer shows a full worked
            solution.
          </Text>
          {subtopic.practice_questions.map((q, i) => (
            <PracticeQuestionCard key={q.id} question={q} number={i + 1} />
          ))}

          {/* COMPLETION / NEXT */}
          {complete && (
            <View style={styles.doneBanner}>
              <Text style={styles.doneTitle}>🎉 Day {day} complete!</Text>
              <Text style={styles.bodyText}>
                {metDailyGoal
                  ? "That's your lesson for today. Come back tomorrow — or keep going if you have time."
                  : 'Nice work reviewing this lesson.'}
              </Text>
            </View>
          )}
          {following && (
            <Pressable
              onPress={() => switchItem(following, 'lesson', isWide)}
              style={({ pressed }) => [complete ? styles.revealButton : styles.secondaryButton, pressed && { opacity: 0.85 }]}
            >
              <Text style={complete ? styles.buttonText : styles.secondaryButtonText}>
                {complete && metDailyGoal ? 'Work ahead: ' : 'Next: '}Day {dayNumber(following.id)} · {following.title} →
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
  unitTitle: { fontSize: 13, fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  topicTitle: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 8 },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  barTrack: { flex: 1, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.correct },
  metaText: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
  sectionHeader: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 4 },
  sectionHint: { fontSize: 13, color: colors.muted, marginBottom: 10, lineHeight: 18 },
  formulaBox: { backgroundColor: colors.primarySoft, borderRadius: 8, paddingHorizontal: 8, marginBottom: 10 },
  bodyText: { fontSize: 15, color: colors.body, lineHeight: 22 },
  stepBox: { backgroundColor: '#F3F4F6', padding: 10, borderRadius: 8, marginTop: 8 },
  stepLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, textTransform: 'uppercase', marginBottom: 2 },
  revealRow: { flexDirection: 'row', gap: 8, alignItems: 'stretch' },
  revealButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  showAll: {
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 12,
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  buttonText: { color: '#FFF', fontWeight: '600' },
  secondaryButton: { padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center', backgroundColor: colors.primarySoft },
  secondaryButtonText: { color: colors.primary, fontWeight: '600' },
  doneBanner: {
    backgroundColor: colors.correctSoft,
    borderColor: colors.correct,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  doneTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 4 },
});
