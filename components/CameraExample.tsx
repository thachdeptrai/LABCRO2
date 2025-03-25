import React, { useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerExample: React.FC = () => {
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  // Hàm chụp ảnh bằng camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Xin lỗi, cần quyền truy cập camera!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });
    console.log('Camera response:', result);
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setCameraImage(result.assets[0].uri);
    }
  };

  // Hàm chọn ảnh từ thư viện
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Xin lỗi, cần quyền truy cập thư viện ảnh!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });
    console.log('Gallery response:', result);
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setGalleryImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ứng dụng Ảnh Expo</Text>
      <Button title="Chụp ảnh" onPress={openCamera} />
      {cameraImage ? (
        <Image source={{ uri: cameraImage }} style={styles.image} />
      ) : (
        <Image source={require('@/assets/images/icon.png')} style={styles.image} />
      )}
      <Button title="Chọn ảnh từ thư viện" onPress={pickImageFromGallery} />
      {galleryImage ? (
        <Image source={{ uri: galleryImage }} style={styles.image} />
      ) : (
        <Image source={require('@/assets/images/icon.png')} style={styles.image} />
      )}
    </View>
  );
};

export default ImagePickerExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});
