import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useState } from 'react';

export default function HomeScreen() {
  const offset = useSharedValue(100);
  const [useSpring, setUseSpring] = useState(true);

  const moveBox = () => {
    const animation = useSpring ? withSpring : withTiming;
    offset.value = animation(Math.random() * 400, { duration: 500, damping: 10, stiffness: 100 });
  };

  const toggleAnimation = () => {
    setUseSpring((prev) => !prev);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderRadius: 10,
    };
  });

  return (
    <View style={styles.container}>
      <Button onPress={moveBox} title="MOVE" color="#007AFF" />
      <Animated.View style={animatedStyles} />
      <Button onPress={toggleAnimation} title={useSpring ? "Switch to Timing" : "Switch to Spring"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});