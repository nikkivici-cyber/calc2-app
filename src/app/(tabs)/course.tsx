import { ScrollView, StyleSheet, Text } from 'react-native';

import CourseList from '../../components/CourseList';
import { CONTENT_MAX_WIDTH } from '../../lib/layout';
import { openItem } from '../../lib/navigation';
import { colors } from '../../lib/theme';

export default function CourseScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>
        One lesson a day is the plan, with a 20-question practice session at the end of each block. You can open any lesson here to work ahead.
      </Text>
      <CourseList onSelect={openItem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  intro: { color: colors.muted, marginBottom: 16, lineHeight: 20 },
});
