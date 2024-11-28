import React, { useState, useEffect } from "react";

const CountdownTimer = (props) => {
    const {expiry} = props?.expiryTime;
  // Expiry date set to 1970-01-01T00:00:00Z
  const expiryDate = new Date(expiry).getTime();
  
  // State for remaining time
  const [timeLeft, setTimeLeft] = useState(expiryDate - new Date().getTime());

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = expiryDate - now;
      setTimeLeft(remainingTime);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [expiryDate]);

  // Convert time left into hours, minutes, and seconds
  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;

    return `${days}d ${displayHours}h ${displayMinutes}m ${displaySeconds}s`;
  };

  // Display expired message if timeLeft is 0 or negative
  return (
   <span>{formatTime(timeLeft)}</span>
  );
};

export default CountdownTimer;
