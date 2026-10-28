import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { PLAN, PRACTICE_SESSION_SIZE, dayNumber, itemLabel, type PlanItem } from '../../data/content';
import { formatTime } from '../../lib/dates';
import { CONTENT_MAX_WIDTH } from '../../lib/layout';
import { openItem } from '../../lib/navigation';
import { useProgress, type ScheduleStatus } from '../../lib/progress';
import { remindersSupported } from '../../lib/reminders';
import { colors } from '../../lib/theme';

const REMINDER_TIMES = [
  { hour: 8, minute: 0 },
  { hour: 12, minute: 0 },
  { hour: 17, minute: 0 },
  { hour: 19, minute: 0 },
  { hour: 21, minute: 0 },
];

function statusLabel(status: ScheduleStatus): { text: string; color: string; bg: string } {
  switch (status.kind) {
    case 'ahead':
      return { text: `🚀 ${status.days} day${status.days > 1 ? 's' : ''} ahead`, color: colors.correct, bg: colors.correctSoft };
    case 'behind':
      return { text: `⏳ ${status.days} day${status.days > 1 ? 's' : ''} behind`, color: '#B45309', bg: '#FEF3C7' };
    default:
      return { text: '✓ On track', color: colors.primary, bg: colors.primarySoft };
  }
}

export default function TodayScreen() {
  const p = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!p.loaded) return null;

  const courseDone = !p.nextUp;
  const finishedToday = p.doneToday.length > 0;
  const status = statusLabel(p.status);
  const pct = Math.round((p.completedCount / PLAN.length) * 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>Day {p.planDay} of your plan</Text>
          <Text style={styles.title}>{finishedToday ? 'Done for today 🎉' : "Today's lesson"}</Text>
        </View>
        <View style={styles.streak}>
          <Text style={styles.streakNum}>🔥 {p.streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>
      </View>
      <View style={[styles.statusChip, { backgroundColor: status.bg }]}>
        <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
      </View>

      {/* Main lesson card */}
      {courseDone ? (
        <View style={[styles.card, styles.heroCard]}>
          <Text style={styles.heroTitle}>🏆 Course complete!</Text>
          <Text style={styles.heroBody}>
            You've finished all {PLAN.length} lessons. Use the Bookmark Bank to review before exams.
          </Text>
        </View>
      ) : finishedToday ? (
        <>
          <View style={[styles.card, styles.doneCard]}>
            <Text style={styles.cardLabel}>Completed today</Text>
            {p.doneToday.map((item) => (
              <Text key={item.id} style={styles.doneItem}>
                ✓ Day {dayNumber(item.id)} · {itemLabel(item)}
              </Text>
            ))}
            <Text style={styles.muted}>Your daily target is met — no reminder today.</Text>
          </View>
          <LessonCard item={p.nextUp!} label="Want to get ahead? (optional)" secondary />
        </>
      ) : (
        <LessonCard item={p.nextUp!} label={`Day ${dayNumber(p.nextUp!.id)}`} />
      )}

      {/* Overall progress */}
      <View style={styles.card}>
        <View style={styles.progressRow}>
          <Text style={styles.cardLabel}>Course progress</Text>
          <Text style={styles.muted}>
            {p.completedCount}/{PLAN.length} lessons
          </Text>
        </View>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%` }]} />
        </View>
        <Pressable onPress={() => router.push('/course')}>
          <Text style={styles.link}>Browse all lessons →</Text>
        </Pressable>
      </View>

      {/* Reminder settings */}
      <View style={styles.card}>
        <View style={styles.progressRow}>
          <Text style={styles.cardLabel}>Daily reminder</Text>
          <Switch
            value={p.reminder.enabled}
            onValueChange={(enabled) => p.setReminder({ enabled })}
            trackColor={{ true: colors.primary }}
          />
        </View>
        <Text style={styles.muted}>
          {remindersSupported
            ? `If today's lesson isn't finished by ${formatTime(p.reminder.hour, p.reminder.minute)}, you'll get a notification.`
            : 'Reminders work in the iPhone/iPad/Android app, not in the browser.'}
        </Text>
        {p.reminder.enabled && (
          <View style={styles.chips}>
            {REMINDER_TIMES.map((t) => {
              const on = t.hour === p.reminder.hour && t.minute === p.reminder.minute;
              return (
                <Pressable key={t.hour} onPress={() => p.setReminder(t)} style={[styles.chip, on && styles.chipOn]}>
                  <Text style={[styles.chipText, on && styles.chipTextOn]}>{formatTime(t.hour, t.minute)}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      <Pressable
        onPress={() => {
          if (confirmReset) {
            p.resetProgress();
            setConfirmReset(false);
          } else setConfirmReset(true);
        }}
        style={styles.resetBtn}
      >
        <Text style={[styles.resetText, confirmReset && { color: colors.wrong }]}>
          {confirmReset ? 'Tap again to erase all progress and restart at Day 1' : 'Restart plan'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function LessonCard({ item, label, secondary }: { item: PlanItem; label: string; secondary?: boolean }) {
  const { correctCount } = useProgress();
  const isLesson = item.kind === 'lesson';
  const done = isLesson ? correctCount(item.lesson) : 0;
  const total = isLesson ? item.lesson.practice_questions.length : PRACTICE_SESSION_SIZE;
  const description = isLesson
    ? `Section ${item.lesson.section} · concept, guided example, ${total} practice questions with worked solutions`
    : `End-of-block review · ${total} mixed exam-style questions`;
  return (
    <Pressable
      onPress={() => openItem(item)}
      style={({ pressed }) => [styles.card, !secondary && styles.heroCard, pressed && { opacity: 0.9 }]}
    >
      <Text style={[styles.cardLabel, !secondary && { color: '#C7D2FE' }]}>{label}</Text>
      <Text style={[styles.lessonTitle, !secondary && { color: '#FFF' }]}>
        {isLesson ? item.title : `★ ${item.title}`}
      </Text>
      <Text style={[styles.muted, !secondary && { color: '#E0E7FF' }]}>{description}</Text>
      <View style={[styles.cta, secondary && styles.ctaSecondary]}>
        <Text style={[styles.ctaText, secondary && { color: colors.primary }]}>
          {!isLesson ? 'Start practice' : done === 0 ? 'Start lesson' : `Continue (${done}/${total} correct)`} →
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  kicker: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  streak: { alignItems: 'center' },
  streakNum: { fontSize: 20, fontWeight: '800', color: colors.text },
  streakLabel: { fontSize: 11, color: colors.muted },
  statusChip: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 16 },
  statusText: { fontWeight: '700', fontSize: 13 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCard: { backgroundColor: colors.primary, borderColor: colors.primary },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFF', marginBottom: 6 },
  heroBody: { color: '#E0E7FF', lineHeight: 21 },
  doneCard: { backgroundColor: colors.correctSoft, borderColor: colors.correct },
  doneItem: { fontSize: 16, fontWeight: '600', color: colors.text, marginVertical: 4 },
  cardLabel: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.4 },
  lessonTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 4, marginBottom: 4 },
  muted: { color: colors.muted, lineHeight: 20 },
  cta: { backgroundColor: '#FFF', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 14 },
  ctaSecondary: { backgroundColor: colors.primarySoft },
  ctaText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  barTrack: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.correct, borderRadius: 5 },
  link: { color: colors.primary, fontWeight: '600', marginTop: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: colors.border },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.body, fontWeight: '600', fontSize: 13 },
  chipTextOn: { color: '#FFF' },
  resetBtn: { alignItems: 'center', padding: 12 },
  resetText: { color: colors.muted, fontSize: 13 },
});
