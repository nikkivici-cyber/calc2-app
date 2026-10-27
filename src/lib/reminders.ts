import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Local notifications only — scheduled on the device, no server or push token needed.

const CHANNEL_ID = 'daily-lesson';
const DAYS_AHEAD = 7;

export const remindersSupported = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensurePermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

type SyncArgs = {
  enabled: boolean;
  hour: number;
  minute: number;
  doneToday: boolean;
  next: { day: number; title: string } | null;
};

// Notifications can't check a condition when they fire, so instead we keep a rolling
// week of one-off reminders and rebuild it whenever progress changes or the app opens.
// Finishing today's lesson simply drops today's reminder from the schedule.
export async function syncReminders({ enabled, hour, minute, doneToday, next }: SyncArgs): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!enabled || !next) return;
  if (!(await ensurePermission())) return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Daily lesson reminder',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const now = new Date();
  for (let i = doneToday ? 1 : 0; i <= DAYS_AHEAD; i++) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, hour, minute);
    if (at <= now) continue;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📚 Day ${next.day}: ${next.title}`,
        body: "Today's Calc II lesson isn't done yet — about 15 minutes to keep your streak going.",
        data: { url: '/' },
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: CHANNEL_ID },
    });
  }
}
