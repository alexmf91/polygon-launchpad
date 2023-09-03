import { useEffect, useState } from 'react';

type CountdownTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function useCountdown(endTime: number): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeRemaining = endTime - now;

      if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / 3600000); // 1 hour = 3600000 milliseconds
        const minutes = Math.floor((timeRemaining % 3600000) / 60000); // 1 minute = 60000 milliseconds
        const seconds = Math.floor((timeRemaining % 60000) / 1000); // 1 second = 1000 milliseconds

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Countdown finished, clear interval
        clearInterval(intervalId);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, [endTime]);

  return timeLeft;
}
