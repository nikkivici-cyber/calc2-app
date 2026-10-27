import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { PracticeQuestion } from '../data/types';
import { useBookmarks } from '../lib/bookmarks';
import { useProgress } from '../lib/progress';
import { colors } from '../lib/theme';
import MathText from './MathText';

type Props = {
  question: PracticeQuestion;
  number?: number;
  subtitle?: string;
};

function shuffledIndices(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function PracticeQuestionCard({ question, number, subtitle }: Props) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { markCorrect } = useProgress();
  const [attempt, setAttempt] = useState(0);
  // Stores the ORIGINAL option index the student picked (null = unanswered).
  const [selected, setSelected] = useState<number | null>(null);

  // Content always lists the correct answer first, so shuffle on display (and on each retry).
  const order = useMemo(() => shuffledIndices(question.options.length), [question.id, attempt]);

  const answered = selected !== null;
  const isCorrect = selected === question.correct_index;
  const saved = isBookmarked(question.id);

  const retry = () => {
    setSelected(null);
    setAttempt((a) => a + 1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>{number ? `Question ${number}` : 'Practice Question'}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Pressable
          onPress={() => toggleBookmark(question.id)}
          style={[styles.bookmarkBtn, saved && styles.bookmarkBtnSaved]}
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Remove bookmark' : 'Bookmark question'}
          hitSlop={8}
        >
          <Text style={[styles.bookmarkText, saved && styles.bookmarkTextSaved]}>
            {saved ? '🔖 Saved' : '🔖 Bookmark'}
          </Text>
        </Pressable>
      </View>

      <MathText text={question.question} fontSize={16} color={colors.text} />

      {order.map((optIdx, displayIdx) => {
        const isThis = selected === optIdx;
        const showAsCorrect = answered && optIdx === question.correct_index;
        const showAsWrong = answered && isThis && !isCorrect;
        return (
          <Pressable
            key={optIdx}
            disabled={answered}
            onPress={() => {
              setSelected(optIdx);
              if (optIdx === question.correct_index) markCorrect(question.id);
            }}
            style={({ pressed }) => [
              styles.option,
              pressed && styles.optionPressed,
              showAsCorrect && styles.optionCorrect,
              showAsWrong && styles.optionWrong,
              answered && !showAsCorrect && !showAsWrong && styles.optionDim,
            ]}
          >
            <Text style={styles.letter}>{LETTERS[displayIdx]}</Text>
            <View style={{ flex: 1 }}>
              <MathText text={question.options[optIdx]} fontSize={15} />
            </View>
          </Pressable>
        );
      })}

      {answered && (
        <View style={[styles.explanation, { borderLeftColor: isCorrect ? colors.correct : colors.wrong }]}>
          <Text style={styles.explanationTitle}>{isCorrect ? '✅ Correct!' : '❌ Not quite'}</Text>
          <MathText text={question.explanation} />
          <Pressable onPress={retry} style={styles.retryBtn}>
            <Text style={styles.retryText}>↻ Try again</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 8 },
  header: { fontSize: 17, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: 2 },
  bookmarkBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  bookmarkBtnSaved: { backgroundColor: colors.primary },
  bookmarkText: { fontSize: 13, fontWeight: '600', color: colors.primary },
  bookmarkTextSaved: { color: '#FFF' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  optionPressed: { backgroundColor: colors.primarySoft },
  optionCorrect: { backgroundColor: colors.correctSoft, borderColor: colors.correct },
  optionWrong: { backgroundColor: colors.wrongSoft, borderColor: colors.wrong },
  optionDim: { opacity: 0.55 },
  letter: { fontWeight: '700', color: colors.muted, width: 16 },
  explanation: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.info,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  explanationTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: colors.text },
  retryBtn: { alignSelf: 'flex-start', marginTop: 8 },
  retryText: { color: colors.primary, fontWeight: '600' },
});
