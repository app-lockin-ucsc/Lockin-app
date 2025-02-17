{/* fix this */}


import { useState } from "react";

// A simple custom hook to manage the time
export const useTimeStore = () => {
  const [chosenHours, setChosenHours] = useState<number>(0);  // Renamed here
  const [chosenMinutes, setChosenMinutes] = useState<number>(0);
  const [chosenSeconds, setChosenSeconds] = useState<number>(0);

  const setTime = (hours: number, minutes: number, seconds: number) => {
    setChosenHours(hours);  // Renamed here
    setChosenMinutes(minutes);
    setChosenSeconds(seconds);
  };

  return {
    chosenHours,  // Renamed here
    chosenMinutes,
    chosenSeconds,  
    setTime
  };
};
