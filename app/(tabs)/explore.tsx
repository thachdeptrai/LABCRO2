import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../constants/store2";
import { increment, decrement, multiply, resetCounter } from "../../constants/counterSlice";

export default function HomeScreen() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
        <Text style={styles.buttonText}>Tăng biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
        <Text style={styles.buttonText}>Giảm biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(multiply())}>
        <Text style={styles.buttonText}>Mũ bình phương biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(resetCounter())}>
        <Text style={styles.buttonText}>Reset biến đếm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  counter: { fontSize: 50, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "orange", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 5 },
  buttonText: { color: "white", fontSize: 18 },
});
