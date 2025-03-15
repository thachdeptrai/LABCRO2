import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

interface SectionViewProps {
  title: string;
  children: React.ReactNode;
}

const SectionView: React.FC<SectionViewProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = new Animated.Value(expanded ? 1 : 0);

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Điều chỉnh chiều cao nội dung
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {expanded ? <ChevronUp size={20} color="#fff" /> : <ChevronDown size={20} color="#fff" />}
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: heightInterpolation }]}>
        {expanded && <View>{children}</View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#36B87D",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 15,
    backgroundColor: "#BCE2C9",
    overflow: "hidden",
  },
});

export default SectionView;
