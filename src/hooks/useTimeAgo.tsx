import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";

export const useTimeAgo = (backendDate: string): string => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const backendDateTime = new Date(backendDate);
      const currentDate = new Date();

      const timeDifferenceInMilliseconds =
        currentDate.getTime() - backendDateTime.getTime();
      const timeDifferenceInSeconds = Math.floor(
        timeDifferenceInMilliseconds / 1000,
      );

      if (timeDifferenceInSeconds < 60 * 60) {
        // If less than an hour
        const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
        setTimeAgo(
          `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`,
        );
      } else if (timeDifferenceInSeconds < 3 * 60 * 60) {
        // Handle other cases as needed
        const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
        setTimeAgo(`${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`);
      } else {
        setTimeAgo(formatDate(backendDate));
      }
    };

    // Calculate initial time ago
    calculateTimeAgo();

    // Update time ago every minute (you can adjust the interval as needed)
    const intervalId = setInterval(calculateTimeAgo, 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [backendDate]);

  return timeAgo;
};
