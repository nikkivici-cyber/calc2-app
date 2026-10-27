import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useBookmarks } from '../../lib/bookmarks';
import { useProgress } from '../../lib/progress';
import { colors } from '../../lib/theme';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
}

export default function TabsLayout() {
  const { bookmarkedIds } = useBookmarks();
  const { doneToday, nextUp, loaded } = useProgress();
  const todayPending = loaded && !!nextUp && doneToday.length === 0;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          headerTitle: 'Calculus II',
          tabBarBadge: todayPending ? 1 : undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="📅" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: 'Course',
          headerTitle: 'All Lessons',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmark Bank',
          tabBarBadge: bookmarkedIds.length || undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔖" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
