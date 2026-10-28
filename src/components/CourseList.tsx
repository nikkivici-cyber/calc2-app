import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EXAMS, PRACTICE_SESSION_SIZE, UNITS, dayNumber, type PlanItem } from '../data/content';
import { useBookmarks } from '../lib/bookmarks';
import { useProgress } from '../lib/progress';
import { colors } from '../lib/theme';

type Props = {
  onSelect: (item: PlanItem) => void;
  activeId?: string;
  compact?: boolean; // sidebar variant
};

// The full course "glossary": every daily lesson and block practice session, grouped by
// block, with the syllabus exams marked. Students can open anything here to work ahead.
export default function CourseList({ onSelect, activeId, compact }: Props) {
  const { bookmarkedIds } = useBookmarks();
  const { isComplete, nextUp, correctCount } = useProgress();

  const meta = (item: PlanItem) => {
    if (item.kind === 'practice') return `${PRACTICE_SESSION_SIZE} mixed questions`;
    const s = item.lesson;
    const saved = s.practice_questions.filter((q) => bookmarkedIds.includes(q.id)).length;
    return `${correctCount(s)}/${s.practice_questions.length} correct${saved ? ` · 🔖 ${saved}` : ''}`;
  };

  return (
    <View>
      {UNITS.map((unit) => (
        <View key={unit.unit_id} style={compact ? styles.unitCompact : styles.unit}>
          <Text style={styles.unitTitle}>{unit.unit_title}</Text>
          <View style={compact ? undefined : styles.card}>
            {unit.items.map((item, i) => {
              const done = isComplete(item.id);
              const isNext = nextUp?.id === item.id;
              const active = activeId === item.id;
              const practice = item.kind === 'practice';
              const exam = EXAMS.find((e) => e.after_id === item.id);
              return (
                <Fragment key={item.id}>
                  <Pressable
                    onPress={() => onSelect(item)}
                    style={({ pressed }) => [
                      compact ? styles.rowCompact : styles.row,
                      !compact && i > 0 && styles.rowBorder,
                      practice && !compact && styles.rowPractice,
                      (pressed || active) && styles.rowActive,
                    ]}
                  >
                    <View style={[styles.dayBadge, done && styles.dayBadgeDone, isNext && styles.dayBadgeNext]}>
                      <Text style={[styles.dayText, (done || isNext) && styles.dayTextOn]}>
                        {done ? '✓' : practice ? '★' : dayNumber(item.id)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[styles.rowTitle, compact && styles.rowTitleCompact]}
                        numberOfLines={compact ? 2 : undefined}
                      >
                        {item.kind === 'lesson' && <Text style={styles.section}>{item.lesson.section} </Text>}
                        {item.title}
                      </Text>
                      {!compact && (
                        <Text style={styles.rowMeta}>
                          Day {dayNumber(item.id)}
                          {isNext ? ' · Up next' : ''} · {meta(item)}
                        </Text>
                      )}
                    </View>
                    {!compact && <Text style={styles.chevron}>›</Text>}
                  </Pressable>
                  {exam && (
                    <View style={[styles.exam, compact && styles.examCompact]}>
                      <Text style={styles.examTitle}>🏁 {exam.title}</Text>
                      {!compact && <Text style={styles.examCovers}>Covers {exam.covers}</Text>}
                    </View>
                  )}
                </Fragment>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  unit: { marginBottom: 20 },
  unitCompact: { marginBottom: 14 },
  unitTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  card: { backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  rowCompact: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8, gap: 10, borderRadius: 8 },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  rowPractice: { backgroundColor: '#FAFAFF' },
  rowActive: { backgroundColor: colors.primarySoft },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  rowTitleCompact: { fontSize: 14 },
  section: { color: colors.muted, fontWeight: '700' },
  rowMeta: { fontSize: 13, color: colors.muted, marginTop: 2 },
  chevron: { fontSize: 24, color: colors.muted },
  dayBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeDone: { backgroundColor: colors.correct, borderColor: colors.correct },
  dayBadgeNext: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayText: { fontSize: 12, fontWeight: '700', color: colors.muted },
  dayTextOn: { color: '#FFF' },
  exam: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FEF3C7',
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  examCompact: { borderRadius: 6, borderTopWidth: 0, marginVertical: 4, paddingVertical: 4, paddingHorizontal: 8 },
  examTitle: { fontSize: 13, fontWeight: '700', color: '#92400E' },
  examCovers: { fontSize: 12, color: '#92400E', marginTop: 1 },
});
