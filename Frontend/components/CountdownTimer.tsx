import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress"; // Adjust the path to your component

const CountdownTimer = () => {
  const [progress, setProgress] = useState(0); // Start at 0%

  // Function to calculate the time passed since midnight
  const getTimeUntilTarget = () => {
    const now = new Date();
    const targetTime = new Date(now);

    // Set the target time to 7:30 PM today
    targetTime.setHours(20, 3, 0, 0);

    // If current time is already past 7:30 PM, use the next day's 7:30 PM
    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const totalTimeInMs = 24 * 60 * 60 * 1000; // Total milliseconds in a day (24 hours)
    const timePassedInMs = now.getTime() - targetTime.setHours(0, 0, 0, 0); // Time passed since 12:00 AM today

    return timePassedInMs / totalTimeInMs; // Calculate progress (0 to 1)
  };

  // Update the progress every second
  useEffect(() => {
    const updateProgress = () => {
      const newProgress = getTimeUntilTarget(); // Calculate the progress
      setProgress(newProgress); // Update the progress state
    };

    // Start the progress update and refresh it every second
    const interval = setInterval(updateProgress, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Progress from 12:00 AM to 7:30 PM</Text>
      <CircularProgress progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
});

export default CountdownTimer;
