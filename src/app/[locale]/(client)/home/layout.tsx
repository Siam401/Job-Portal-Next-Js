'use client';

import useHasMounted from '@/hooks/useHasMounted';

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const hasMounted = useHasMounted();
  // Custom hook to check if the page has mounted
  // to avoid Hydration mismatch error
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}
