import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Header from './comps/Header';
import SectionView from './comps/SectionView';
import B3 from './(tabs)/B3';

const Bai1 = () => {
  return (
    <View>
      <Header renderLeft={null} title={"Trang chủ"} renderRight={null} />
    </View>
  );
};

const Bai2 = () => {
  return (
    <View style={{ flex: 1 }}>
      <SectionView />
    </View>
  );
};

const Bai3 = () => {
  return (
    <View style={{ flex: 1 }}>
      <B3 />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Bai1 />
        <Bai2 />
        <Bai3 />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10, // Optional padding for better layout
  },
});
