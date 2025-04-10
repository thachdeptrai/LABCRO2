// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import TestRedux from "../../components/testRedux"; 
// import { useSelector } from "react-redux";
// import { RootState } from "@/constants/store";

// const HomeScreen = () => {
//   const imageUri = useSelector((state: RootState) => state.image.uri);

//   useEffect(() => {
//     console.log("Ảnh đã lưu:", imageUri);
//   }, [imageUri]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 24, textAlign: "center", margin: 20 }}>Trang chủ</Text>
//       <TestRedux />
//     </View>
//   );
// };

// export default HomeScreen;
import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class index extends Component {
  render() {
    return (
      <View>
        <Text>index</Text>
      </View>
    )
  }
}

export default index