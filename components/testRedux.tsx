import React, { useEffect, useState } from "react";
import { View, Image, Button, Alert, Platform, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setImage, resetImage } from "../constants/imageSlice";
import { RootState } from "../constants/store";
import * as ImagePicker from "expo-image-picker";

const TestRedux = () => {
  const dispatch = useDispatch();
  const imageUri = useSelector((state: RootState) => state.image?.uri || null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === "granted" && cameraStatus === "granted") {
          setHasPermission(true);
        } else {
          Alert.alert("Lỗi", "Bạn cần cấp quyền để sử dụng camera và thư viện ảnh!");
        }
      }
    })();
  }, []);

  const captureImage = async () => {
    if (!hasPermission) {
      Alert.alert("Lỗi", "Bạn chưa cấp quyền truy cập camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      dispatch(setImage(uri));
    } else {
      Alert.alert("Lỗi", "Không có ảnh nào được chụp.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Reset ảnh" onPress={() => dispatch(resetImage())} />
      <Button title="Chụp ảnh" onPress={captureImage} />
    </View>
  );
};

export default TestRedux;
