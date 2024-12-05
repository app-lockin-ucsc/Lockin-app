import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ progress }: { progress: number }) => {
  const size = 200; // Diameter of the circle
  const strokeWidth = 10; // Thickness of the progress bar
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Shared value for animation
  const animatedProgress = useSharedValue(circumference);

  // Animate the progress when the `progress` prop changes
  useEffect(() => {
    // Trigger animation every time the progress changes
    // (The strokeDashoffset decreases as progress increases)
    animatedProgress.value = withTiming(circumference * (1 - progress), {
      duration: 1000, // Smooth transition for progress change
    });
  }, [progress]);

  // Animated props for the Circle component
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedProgress.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3498db"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference} // Total length of the circle's path
          animatedProps={animatedProps}   // Apply animated props for progress animation
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularProgress;
