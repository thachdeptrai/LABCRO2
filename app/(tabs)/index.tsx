import CameraExample from '@/components/CameraExample';
import React from 'react';
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraExample />
    </SafeAreaView>
  );
};

export default App;
