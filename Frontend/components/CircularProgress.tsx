import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Animated, TouchableOpacity, Modal, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker
import AnimatedCircularProgress from "react-native-circular-progress-indicator";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for icons
import { BlurView } from "expo-blur"; // Import BlurView from expo-blur
import Entypo from '@expo/vector-icons/Entypo';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function CircularProgress() {
  const [progress, setProgress] = useState<number>(0); // Custom timer progress
  const [dailyProgress, setDailyProgress] = useState<number>(0); // 24-hour timer progress
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false); // Track lock state
  const [lockAnimation] = useState(new Animated.Value(1)); // Animation for the lock icon
  const [showModal, setShowModal] = useState<boolean>(false);

  // Define hours, minutes, and seconds as numbers
  const [selectedHours, setSelectedHours] = useState<number>(0);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [selectedSeconds, setSelectedSeconds] = useState<number>(0);

  const [mode, setMode] = useState<"daily" | "custom">("daily"); // 'daily' or 'custom'
  
  // Reset the timer values whenever the modal is shown
  useEffect(() => {
    if (showModal) {
      setSelectedHours(0);
      setSelectedMinutes(0);
      setSelectedSeconds(0);
    }
  }, [showModal]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Daily timer logic (24-hour countdown)
      if (mode === "daily") {
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0); // Midnight
        const remainingTime = targetTime.getTime() - now.getTime();
        
        if (remainingTime <= 0) {
          setDailyProgress(100);
          setTimeRemaining(0);
        } else {
          const totalTimeInMillis = targetTime.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
          const currentProgress = ((totalTimeInMillis - remainingTime) / totalTimeInMillis) * 100;
          setDailyProgress(currentProgress);  // Update daily progress
          
          const secondsRemaining = Math.floor(remainingTime / 1000);
          setTimeRemaining(secondsRemaining);
        }
      } else if (mode === "custom" && timeRemaining > 0) {
        setTimeRemaining((prev) => Math.max(prev - 1, 0));
        setProgress((prevProgress) => Math.min(prevProgress + (100 / (selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds)), 100));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, timeRemaining, selectedHours, selectedMinutes, selectedSeconds]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secondsRemaining).padStart(2, "0")}`;
  };

  const toggleLock = () => {
    Animated.sequence([
      Animated.timing(lockAnimation, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(lockAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (isLocked) {
      setMode("daily");
      // Do not reset progress or timeRemaining here to preserve current state
    } else {
      setShowModal(true);
    }
    setIsLocked(!isLocked);
  };

  const startCustomTimer = () => {
    const totalSeconds = selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds;
    setTimeRemaining(totalSeconds);
    setProgress(0); // Reset custom timer progress when starting
    setMode("custom");
    setShowModal(false);
  };

  const cancelCustomTimer = () => {
    setIsLocked(false); // Unlock the lock when the user cancels
    setShowModal(false); // Close the modal
    setMode("daily"); // Set the mode back to daily
    // Do not reset progress or timeRemaining here to preserve current state
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {/* Use dailyProgress for 24-hour timer */}
        <AnimatedCircularProgress
          value={mode === "daily" ? dailyProgress : progress}  // Show either dailyProgress or custom progress
          maxValue={100}
          radius={170}
          duration={500}
          progressValueColor={"#FFFFFF"}
          activeStrokeColor={"black"}
          inActiveStrokeColor={"white"}
          activeStrokeWidth={27}
          inActiveStrokeWidth={25}
          showProgressValue={false}
          strokeLinecap="square"
        />
        <View style={styles.iconTextContainer}>
          <TouchableOpacity onPress={toggleLock} style={styles.iconContainer}>
          <Animated.View style={{ transform: [{ scale: lockAnimation }] }}>
            <AnimatedIcon 
              name={isLocked ? "lock" : "unlock-alt"} 
              size={100} 
              color={"white"} 
            />
          </Animated.View>
          </TouchableOpacity>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>
      <Modal visible={showModal} transparent={true} animationType="slide">
      <BlurView intensity={50} style={styles.blurBackground}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>LockIn Duration</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={String(selectedHours)} 
              onValueChange={(itemValue) => setSelectedHours(Number(itemValue))} 
              style={[styles.picker, {width: 120}]}  // Adjust the width
            >
              {Array.from({ length: 24 }, (_, i) => (
                <Picker.Item key={i} label={`${i}h`} value={String(i)} /> 
              ))}
            </Picker>
            <Picker
              selectedValue={String(selectedMinutes)} 
              onValueChange={(itemValue) => setSelectedMinutes(Number(itemValue))} 
              style={[styles.picker, {width: 120}]}  // Adjust the width
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}m`} value={String(i)} />
              ))}
            </Picker>
            <Picker
              selectedValue={String(selectedSeconds)} 
              onValueChange={(itemValue) => setSelectedSeconds(Number(itemValue))}
              style={[styles.picker, {width: 120}]}  // Adjust the width
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}s`} value={String(i)} /> 
              ))}
            </Picker>
          </View>
          <Pressable style={styles.startButton} onPress={startCustomTimer}>
              <Text style={styles.startButtonText}>LockIn</Text>
            </Pressable>
            <TouchableOpacity onPress={cancelCustomTimer} style={styles.cancelButton}>
              <Entypo name="cross" size={40} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  progressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  iconTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  iconContainer: {
    marginBottom: 10,
  },
  timerText: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  picker: {
    width: 80,
    color: "white",
    fontSize: 20,  // Increase the font size for better visibility
  },
  blurBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
    marginBottom: 10,
  },
  startButtonText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "transparent",
    padding: 10,
  },
});
