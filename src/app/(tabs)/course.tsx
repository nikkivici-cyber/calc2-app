import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import CourseList from '../../components/CourseList';
import { CONTENT_MAX_WIDTH } from '../../lib/layout';
import { colors } from '../../lib/theme';

export default function CourseScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        One lesson a day is the plan — but you can open any lesson here to work ahead.
      </Text>
      <CourseList onSelect={(id) => router.push({ pathname: '/subtopic/[id]', params: { id } })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  intro: { color: colors.muted, marginBottom: 16, lineHeight: 20 },
});
