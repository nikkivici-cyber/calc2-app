import { Pressable, StyleSheet, Text, View } from 'react-native';

import { UNITS, dayNumber } from '../data/content';
import { useBookmarks } from '../lib/bookmarks';
import { useProgress } from '../lib/progress';
import { colors } from '../lib/theme';

type Props = {
  onSelect: (subtopicId: string) => void;
  activeId?: string;
  compact?: boolean; // sidebar variant
};

// The full course "glossary": every daily lesson grouped by unit. Students can open any
// lesson from here to work ahead of the one-a-day plan.
export default function CourseList({ onSelect, activeId, compact }: Props) {
  const { bookmarkedIds } = useBookmarks();
  const { isComplete, nextUp, correctCount } = useProgress();

  return (
    <View>
      {UNITS.map((unit) => (
        <View key={unit.unit_id} style={compact ? styles.unitCompact : styles.unit}>
          <Text style={styles.unitTitle}>{unit.unit_title}</Text>
          <View style={compact ? undefined : styles.card}>
            {unit.subtopics.map((s, i) => {
              const done = isComplete(s.subtopic_id);
              const isNext = nextUp?.subtopic_id === s.subtopic_id;
              const active = activeId === s.subtopic_id;
              const saved = s.practice_questions.filter((q) => bookmarkedIds.includes(q.id)).length;
              return (
                <Pressable
                  key={s.subtopic_id}
                  onPress={() => onSelect(s.subtopic_id)}
                  style={({ pressed }) => [
                    compact ? styles.rowCompact : styles.row,
                    !compact && i > 0 && styles.rowBorder,
                    (pressed || active) && styles.rowActive,
                  ]}
                >
                  <View style={[styles.dayBadge, done && styles.dayBadgeDone, isNext && styles.dayBadgeNext]}>
                    <Text style={[styles.dayText, (done || isNext) && styles.dayTextOn]}>
                      {done ? '✓' : dayNumber(s.subtopic_id)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rowTitle, compact && styles.rowTitleCompact]} numberOfLines={compact ? 2 : undefined}>
                      {s.title}
                    </Text>
                    {!compact && (
                      <Text style={styles.rowMeta}>
                        Day {dayNumber(s.subtopic_id)}
                        {isNext ? ' · Up next' : ''} · {correctCount(s)}/{s.practice_questions.length} correct
                        {saved ? ` · 🔖 ${saved}` : ''}
                      </Text>
                    )}
                  </View>
                  {!compact && <Text style={styles.chevron}>›</Text>}
                </Pressable>
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
  rowActive: { backgroundColor: colors.primarySoft },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  rowTitleCompact: { fontSize: 14 },
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
});
