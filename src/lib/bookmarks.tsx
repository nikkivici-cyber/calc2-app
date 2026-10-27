import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'calc2.bookmarkedIds.v1';

type BookmarksValue = {
  bookmarkedIds: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
};

const BookmarksContext = createContext<BookmarksValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setBookmarkedIds(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Persist after the initial load so we never overwrite saved data with [].
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkedIds)).catch(() => {});
  }, [bookmarkedIds, loaded]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({ bookmarkedIds, isBookmarked: (id: string) => bookmarkedIds.includes(id), toggleBookmark }),
    [bookmarkedIds, toggleBookmark],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks(): BookmarksValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error('useBookmarks must be used inside <BookmarksProvider>');
  return ctx;
}
