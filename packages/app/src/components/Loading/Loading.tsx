'use client';

import { useEffect, useRef, useState } from 'react';

import Typography from '../Typography';

type Props = {
  isLoading: boolean;
  loadingMessages: Array<string>;
  onCompleted: () => void;
};

const Loading = ({
  isLoading,
  loadingMessages,
  onCompleted,
}: Props): React.ReactElement => {
  const loadingMessagesRef = useRef(loadingMessages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < loadingMessagesRef.current.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          return Math.min(prevIndex + 1, loadingMessagesRef.current.length - 1);
        });
      }, 2500);

      return (): void => {
        clearTimeout(timeout);
      };
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === loadingMessagesRef.current.length - 1 && !isLoading) {
      onCompleted();
    }
  });

  return (
    <div className="mx-auto mt-10 max-w-2xl px-4 pb-20 md:mt-[10vh]">
      <div className="flex flex-col gap-5">
        {loadingMessagesRef.current
          .slice(0, currentIndex + 1)
          .map((loadingMessage) => {
            return (
              <div key={loadingMessage}>
                <Typography className="animate-fadeIn" color="gray" size="md">
                  {loadingMessage}
                </Typography>
                <div className="animate-loadingBar mt-2">
                  <div className="h-4 w-full rounded-full bg-gray-300" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Loading;
