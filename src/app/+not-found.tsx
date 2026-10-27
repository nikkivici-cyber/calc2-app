import { Redirect } from 'expo-router';

// Unknown paths (e.g. the app hosted under a sub-path) fall back to the Today screen.
export default function NotFound() {
  return <Redirect href="/" />;
}
