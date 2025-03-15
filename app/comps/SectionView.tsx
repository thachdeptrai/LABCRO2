import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SectionView = () => {
  const eventInfo = [
    {
      id: 1,
      title: "Lịch trình 13/2/2025",
      data: [
        {
          type: "lichTrinh",
          location: "Hồ Tràm, Vũng Tàu",
          eventTime: "09:00 AM - 12:00 AM, 12/12/2024",
          transportation: "Xe bus",
          travelTime: "21:00 - 22:00",
          image: "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg"
        }
      ]
    },
    {
      id: 2,
      title: "Khách sạn",
      data: [
        {
          type: "khachSan",
          name: "Hồng Quỳnh",
          openHours: "06:00 AM - 12:00 AM",
          address: "234 Quang Trung, Hồ Chí Minh",
          image: "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg"
        }
      ]
    }
  ];

  // Function to render children inside a section card
  const renderChild = (item) => {
    if (item.type === "lichTrinh") {
      return (
        <View style={styles.cardMain}>
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Địa điểm</Text>
            <Text style={styles.value}>{item.location}</Text>
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Thời gian</Text>
            <Text style={styles.value}>{item.eventTime}</Text>
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Phương tiện di chuyển</Text>
            <Text style={styles.value}>{item.transportation}</Text>
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Thời gian</Text>
            <Text style={styles.value}>{item.travelTime}</Text>
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Hình ảnh</Text>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      );
    } else if (item.type === "khachSan") {
      return (
        <View style={styles.cardMain}>
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Tên khách sạn</Text>
            <Text style={styles.value}>{item.name}</Text>
          </View>

          <View style={styles.inforGroup}>
            <Text style={styles.label}>Hình ảnh</Text>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Giờ mở cửa</Text>
            <Text style={styles.value}>{item.openHours}</Text>
          </View>
          
          <View style={styles.inforGroup}>
            <Text style={styles.label}>Địa điểm</Text>
            <Text style={styles.value}>{item.address}</Text>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CHI TIẾT</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderSection = (section) => {
    return (
      <View key={section.id} style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {section.data.map((item, index) => (
          <View key={index} style={styles.card}>
            {renderChild(item)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {eventInfo.map((section) => renderSection(section))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2
  },
  cardMain: {
    padding: 16
  },
  inforGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    color: '#888'
  },
  value: {
    fontSize: 16,
    marginTop: 2
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 4,
    marginTop: 4
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  }
});

export default SectionView;