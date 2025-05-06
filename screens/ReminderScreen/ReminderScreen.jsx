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
import Ionicons from "react-native-vector-icons/Ionicons";

// Icons for the buttons
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color="#004D40" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Lịch Trình</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RecurringMaintainance")}
            activeOpacity={0.7}
            accessibilityLabel="Navigate to recurring maintenance"
            accessibilityRole="button"
          >
            <Image source={feedingIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>LỊCH TRÌNH ĐỊNH KỲ</Text>
              <Text style={styles.buttonSubtitle}>Tạo lịch cho ăn cho cá</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalculateMaintainance")}
            activeOpacity={0.7}
            accessibilityLabel="Navigate to calculate maintenance"
            accessibilityRole="button"
          >
            <Image source={maintenanceIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>LỊCH TRÌNH BẢO TRÌ</Text>
              <Text style={styles.buttonSubtitle}>Tạo lịch bảo trì</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ReminderScreen;