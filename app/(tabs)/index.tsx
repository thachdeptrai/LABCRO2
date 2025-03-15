import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

// Header Custom Component
interface HeaderProps {
  renderLeft?: () => JSX.Element;
  renderCenter?: () => JSX.Element;
  renderRight?: () => JSX.Element;
}

const Header: React.FC<HeaderProps> = ({ renderLeft, renderCenter, renderRight }) => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.side}>{renderLeft && renderLeft()}</View>
      <View style={headerStyles.center}>{renderCenter && renderCenter()}</View>
      <View style={headerStyles.side}>{renderRight && renderRight()}</View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    width: '100%',
  
    elevation: 2, 
  },
  side: { flex: 1, alignItems: 'center' },
  center: { flex: 3, alignItems: 'center' },
  backButton: { padding: 10 },
  userImage: { width: 30, height: 30, borderRadius: 15 },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          renderLeft={() => (
            <TouchableOpacity style={headerStyles.backButton} onPress={() => console.log('Back pressed')}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )}
          renderCenter={() => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Header</Text>}
          renderRight={() => (
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRTo4qMo0OdXW6Ni8yg1zXYWOnSry6YkxWA&s" }} 
              style={headerStyles.userImage}
            />
          )}
        />
      </View>
      {/* <View style={styles.container1}>
        <Header
          renderLeft={() => (
            <TouchableOpacity style={headerStyles.backButton} onPress={() => console.log('Back pressed')}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )}
          renderCenter={() => <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trang Chủ</Text>}
          
        />
      </View>
      <View style={styles.container1}>
        <Header
          renderLeft={() => (
            <TouchableOpacity style={headerStyles.backButton} onPress={() => console.log('Back pressed')}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )}
         
        />
      </View> */}
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
   marginTop: 50,
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
   },
});