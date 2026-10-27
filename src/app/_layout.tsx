import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BookmarksProvider } from '../lib/bookmarks';
import { ProgressProvider } from '../lib/progress';
import { colors } from '../lib/theme';

export default function RootLayout() {
  return (
    <ProgressProvider>
      <BookmarksProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTintColor: colors.primary,
            headerTitleStyle: { color: colors.text },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="subtopic/[id]" options={{ title: '' }} />
        </Stack>
      </BookmarksProvider>
    </ProgressProvider>
  );
}
