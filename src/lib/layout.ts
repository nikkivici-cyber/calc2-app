import { useWindowDimensions } from 'react-native';

// iPad / tablet / desktop-web widths get a persistent course sidebar.
export const WIDE_BREAKPOINT = 768;
export const CONTENT_MAX_WIDTH = 720;

export function useIsWide(): boolean {
  return useWindowDimensions().width >= WIDE_BREAKPOINT;
}
