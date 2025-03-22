import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const DATA = Array.from({ length: 20 }, (_, i) => ({ id: i.toString(), title: `Item ${i + 1}` }));

const AnimatedItem = React.memo(({ item, isVisible }: { item: any; isVisible: boolean }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  useEffect(() => {
  if (isVisible) {
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withTiming(1, { duration: 500 });
  } else {
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 });
  }
 }, [isVisible]); 
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.text}>{item.title}</Text>
    </Animated.View>
  );
});

export default function App() {
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    let visibleMap: { [key: string]: boolean } = {};
    viewableItems.forEach((item) => {
      visibleMap[item.item.id] = true;
    });
    setVisibleItems(visibleMap);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnimatedItem item={item} isVisible={!!visibleItems[item.id]} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  item: {
    backgroundColor: "#007AFF",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
