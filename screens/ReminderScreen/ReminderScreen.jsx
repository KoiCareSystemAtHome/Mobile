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

// Icons for the buttons and bottom navigation (you'll need to replace these with your own assets)
const feedingIcon = require("../../assets/Fish Food 1.png"); // Replace with your feeding icon
const maintenanceIcon = require("../../assets/pond_7665081 1.png"); // Replace with your maintenance icon


const ReminderScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")} // Background image
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Back Arrow */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Schedule</Text>

          {/* Regular Schedule Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RecurringMaintainance")} 
          >
            <Image source={feedingIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>REGULATE SCHEDULE</Text>
              <Text style={styles.buttonSubtitle}>
                Create a fish feeding schedule
              </Text>
            </View>
          </TouchableOpacity>

          {/* Maintenance Schedule Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalculateMaintainance")} 
          >
            <Image source={maintenanceIcon} style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTitle}>MAINTENANCE SCHEDULE</Text>
              <Text style={styles.buttonSubtitle}>
                Create maintenance schedule
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ReminderScreen;
