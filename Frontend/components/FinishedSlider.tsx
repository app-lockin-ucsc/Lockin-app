// SliderComponent.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

const SliderComponent = ({ onSlideComplete }: { onSlideComplete: () => void }) => {
  const sliderOffset = useSharedValue(0);

  // New gesture handler API with Reanimated
  const gestureHandler = (event: any) => {
    // Update slider position during gesture
    sliderOffset.value = event.translationX;
  };

  const onGestureEnd = (event: any) => {
    // If the slider is far enough, complete the action
    if (sliderOffset.value > 200) {
      // Trigger slide completion logic
      runOnJS(onSlideComplete)();
    } else {
      // Reset position smoothly if not enough
      sliderOffset.value = withTiming(0, { duration: 200 });
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={onGestureEnd}>
        <Animated.View style={[styles.sliderContainer, { transform: [{ translateX: sliderOffset.value }] }]}>
          <View style={styles.sliderContent}>
            <Text style={styles.sliderText}>Slide to Confirm</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    bottom: 10,
    width: 300,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sliderContent: {
    width: 150,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SliderComponent;
