import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import AnimatedCircularProgress from "react-native-circular-progress-indicator";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for icons

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function CircularProgress() {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // Track lock state
  const [lockAnimation] = useState(new Animated.Value(1)); // Animation for the lock icon
  const [colorAnimation] = useState(new Animated.Value(0)); //Animation to change colors
  const [mode, setMode] = useState("daily"); // "daily" or "hourly"
  const [hourStartTime, setHourStartTime] = useState(0); // Track hourly timer start time

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (mode == 'daily') {
        // Define the target time (e.g., midnight)
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0); // Midnight

        // Calculate the time remaining until the target time (in milliseconds)
        const remainingTime = targetTime.getTime() - now.getTime();

        // If time remaining is less than 0, it means we've reached midnight
        if (remainingTime <= 0) {
          setProgress(100); // Full progress
          setTimeRemaining(0); // No time remaining, countdown complete
          clearInterval(interval);
        } else {
          // Calculate progress (percentage)
          const totalTimeInMillis = targetTime.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
          const currentProgress = ((totalTimeInMillis - remainingTime) / totalTimeInMillis) * 100;
          setProgress(currentProgress);

          // Set the remaining time in seconds
          const secondsRemaining = Math.floor(remainingTime / 1000);
          setTimeRemaining(secondsRemaining);
        }
      } else if (mode == "hourly") {
        // Hourly mode logic
        const elapsed = Math.floor((now.getTime() - hourStartTime) / 1000);
        const remainingTime = 3600 - elapsed;

        if (remainingTime <= 0) {
          setProgress(100); // Full progress for the hour
          setTimeRemaining(0); // Hour complete
          clearInterval(interval); // Stop the timer after the hour
        } else {
          const currentProgress = (elapsed / 3600) * 100;
          setProgress(currentProgress);
          setTimeRemaining(remainingTime);
        }
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [mode, hourStartTime]);

  // Format the remaining time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secondsRemaining).padStart(2, "0")}`;
  };

  const toggleLock = () => {
    // Start scale animation (simulate "press")
    Animated.sequence([
      Animated.timing(lockAnimation, {
        toValue: 0.98, // Scale down to 98% of original size
        duration: 100, // Duration of the press effect
        useNativeDriver: true,
      }),
      Animated.timing(lockAnimation, {
        toValue: 1, // Return to original size
        duration: 100, // Duration of the return effect
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(colorAnimation, {
      toValue: isLocked ? 0 : 1, // Toggle between 0 and 1
      duration: 500, // Duration of color fade
      useNativeDriver: false, // Color interpolation is not supported by native driver
    }).start();

    setIsLocked((prev) => {
      const newState = !prev; // Toggle lock state
      if (newState) {
        // Switch to hourly mode and start the hourly timer
        setMode("hourly");
        setHourStartTime(new Date().getTime());
      } else {
        // Return to daily mode
        setMode("daily");
      }
      return newState;
    });
  };

  // Interpolate colors
  const inActiveStrokeColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["red", "white"], // From red to white
  });

  const lockIconColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "red"], // From white to red
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
      <AnimatedCircularProgress
          value={progress}
          maxValue={100}
          radius={170}
          duration={500}
          progressValueColor={"#FFFFFF"}
          activeStrokeColor={"black"}
          inActiveStrokeColor={"white"} // Typescript casting to string
          activeStrokeWidth={27}
          inActiveStrokeWidth={25}
          showProgressValue={false}
          strokeLinecap="square" // Adjust stroke cap to rounded for smoother ends
        />
        {/* Overlay the countdown timer in the center */}
        <View style={styles.iconTextContainer}>
          {/* Lock icon above the time remaining */}
          <TouchableOpacity onPress={toggleLock} style={styles.iconContainer}>
          <Animated.View style={{ transform: [{ scale: lockAnimation }] }}>
            <AnimatedIcon 
              name={isLocked ? "lock" : "unlock-alt"} 
              size={100} 
              color={"white"} // Apply animated color directly to the icon
            />
          </Animated.View>
          </TouchableOpacity>
          {/* Time remaining text below the icon */}
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 20,
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  timerTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  iconTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Stack the icon and timer vertically
  },
  iconContainer: {
    marginBottom: 10,
  },
  timerText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
});
