import { ScrollView, StyleSheet, Text, View } from 'react-native';

import PracticeQuestionCard from '../../components/PracticeQuestionCard';
import { ALL_QUESTIONS } from '../../data/content';
import { useBookmarks } from '../../lib/bookmarks';
import { CONTENT_MAX_WIDTH } from '../../lib/layout';
import { colors } from '../../lib/theme';

export default function BookmarksScreen() {
  const { bookmarkedIds } = useBookmarks();
  const bookmarkedQuestions = ALL_QUESTIONS.filter((q) => bookmarkedIds.includes(q.id));

  if (bookmarkedQuestions.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🔖</Text>
        <Text style={styles.emptyTitle}>No saved questions yet</Text>
        <Text style={styles.emptyBody}>
          Tap “Bookmark” on any practice question to save it here for review before midterms and finals.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        {bookmarkedQuestions.length} saved question{bookmarkedQuestions.length === 1 ? '' : 's'} — re-attempt them below.
      </Text>
      {bookmarkedQuestions.map((q) => (
        <PracticeQuestionCard
          key={q.id}
          question={q}
          subtitle={`${q.unit_title.split(':')[0]} · ${q.source_title}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  intro: { color: colors.muted, marginBottom: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  emptyBody: { fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 22 },
});
