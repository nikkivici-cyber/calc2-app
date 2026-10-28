import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import type { PlanItem } from '../data/content';
import { useIsWide } from '../lib/layout';
import { switchItem } from '../lib/navigation';
import { colors } from '../lib/theme';
import CourseList from './CourseList';

type Props = {
  activeId: string;
  kind: PlanItem['kind'];
  children: ReactNode;
};

// On wide screens (iPad, desktop web) shows the course list as a sidebar next to the content.
export default function CourseShell({ activeId, kind, children }: Props) {
  const isWide = useIsWide();
  if (!isWide) return <>{children}</>;

  return (
    <View style={styles.split}>
      <ScrollView style={styles.sidebar} contentContainerStyle={{ padding: 12 }}>
        <Text style={styles.sidebarHeader}>Course</Text>
        <CourseList
          compact
          activeId={activeId}
          onSelect={(item) => item.id !== activeId && switchItem(item, kind, true)}
        />
      </ScrollView>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  split: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 300, flexGrow: 0, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: colors.card },
  sidebarHeader: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 12, marginLeft: 8 },
});
