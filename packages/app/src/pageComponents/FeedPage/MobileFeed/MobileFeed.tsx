'use client';

import { PlannedPost } from '@/server/plannedPosts';
import { useEffect, useState } from 'react';

import MobileFeedContent from './MobileFeedContent';

type Props = {
  plannedPosts: Array<PlannedPost>;
};

const MobileFeed = ({ plannedPosts }: Props): React.ReactElement | null => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = (): void => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 1000);
    };

    setIsMobile(window.innerWidth < 1024);
    window.addEventListener(`resize`, handleResize, { passive: true });

    return (): void => {
      window.removeEventListener(`resize`, handleResize);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return <MobileFeedContent plannedPosts={plannedPosts} />;
};

export default MobileFeed;
