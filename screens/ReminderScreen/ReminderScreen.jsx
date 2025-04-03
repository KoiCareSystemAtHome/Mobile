import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Ionicons } from 'react-native-vector-icons'; // Add this import (requires npm install @expo/vector-icons)

// Icons for the buttons and bottom navigation
const feedingIcon = require("../../assets/Fish Food 1.png");
const maintenanceIcon = require("../../assets/pond_7665081 1.png");

const ReminderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Enhanced Back Arrow Button */}
        <TouchableOpacity
          style={[styles.backButton, {
            position: 'absolute',
            top: 40,
            left: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            padding: 8,
            zIndex: 1,
          }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="black" 
          />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Lịch Trình</Text>
          
          {/* Rest of your existing code */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RecurringMaintainance")} 
          >
            <Image source={feedingIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>LỊCH TRÌNH ĐỊNH KỲ</Text>
              <Text style={styles.buttonSubtitle}>
                Tạo lịch cho ăn cho cá
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalculateMaintainance")} 
          >
            <Image source={maintenanceIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>LỊCH TRÌNH BẢO TRÌ</Text>
              <Text style={styles.buttonSubtitle}>
                Tạo lịch bảo trì
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ReminderScreen;