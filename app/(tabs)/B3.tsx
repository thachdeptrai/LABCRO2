import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";

const { height } = Dimensions.get("window");
const HEADER_MAX_HEIGHT = height * 0.5;
const HEADER_MIN_HEIGHT = 100;

const MENU_ITEMS = ["Popular", "Product Design", "Development", "Project"];
const DATA = [
  { id: "1", title: "Design System", category: "Product Design", author: "Brandon", quizCount: 10 },
  { id: "2", title: "React Native 101", category: "Development", author: "Jennifer", quizCount: 16 },
  { id: "3", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "4", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "5", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "6", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "7", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "8", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "9", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
  { id: "10", title: "Agile Basics", category: "Project Management", author: "Eve", quizCount: 38 },
];

export default function QuizScreen() {
  const scrollY = useSharedValue(0);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );
    return { height };
  });

  const animatedProfileStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const animatedMenuStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [HEADER_MAX_HEIGHT - 60, 40],
      Extrapolate.CLAMP
    );
    return { transform: [{ translateY }] };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <View style={styles.headerContent}>
          <Animated.View style={[styles.profileContainer, animatedProfileStyle]}>
            <Image 
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} 
              style={styles.avatar} 
            />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Mornin' Mark!</Text>
              <Text style={styles.subHeaderText}>Ready for a quiz?</Text>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.menuContainer, animatedMenuStyle]}>
        <View style={styles.menu}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={index === 0 ? styles.activeMenuItem : styles.menuItem}
            >
              <Text style={index === 0 ? styles.activeMenuText : styles.menuText}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Popular Quizzes</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.quizTitle}>{item.title}</Text>
            <Text style={styles.author}>👤 {item.author}</Text>
            <Text style={styles.quizCount}>📝 {item.quizCount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007A4D",
    zIndex: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "column", // Changed from "row" to "column"
    alignItems: "flex-start", // Changed from "center" to align everything in the center
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
    marginBottom: 20, // Changed from marginRight to marginBottom
  },
  textContainer: { 
    justifyContent: "center",
    alignItems: "center", // Added to center the text
  },
  headerText: { 
    color: "#fff", 
    fontSize: 52, 
    fontWeight: "bold",
    textAlign: "center", // Added to center the text
  },
  subHeaderText: { 
    color: "#fff", 
    fontSize: 45,
    marginTop: 5,
    textAlign: "center", // Added to center the text
  },
  menuContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 20,
  },
  menu: {
    flexDirection: "row",
    backgroundColor: "#007A4D",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 20,
    justifyContent: "space-around",
  },
  menuItem: { 
    paddingVertical: 8, 
    paddingHorizontal: 15 
  },
  activeMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  menuText: { 
    fontSize: 16, 
    color: "#fff" 
  },
  activeMenuText: { 
    fontSize: 16, 
    color: "#007A4D", 
    fontWeight: "bold" 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    margin: 16 
  },
  card: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  category: { 
    fontSize: 14, 
    color: "gray" 
  },
  quizTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  author: { 
    fontSize: 14, 
    color: "#666" 
  },
  quizCount: { 
    fontSize: 14, 
    fontWeight: "bold", 
    alignSelf: "flex-end", 
    color: "#007AFF" 
  },
});