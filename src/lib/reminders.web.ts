// Web has no scheduled local notifications; reminders are an iOS/Android feature.

export const remindersSupported = false;

export async function ensurePermission(): Promise<boolean> {
  return false;
}

export async function syncReminders(_args: unknown): Promise<void> {}
