import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateSalt } from "../../../redux/slices/calculatorSlice";

const AddSaltForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pondId = route.params?.pondID || route.params.pondId
  console.log(pondId);
  const [addedSaltKg, setAddedSaltKg] = useState("");

  // Handle form submission
  const handleSave = () => {
    const saltValue = parseFloat(addedSaltKg);

    if (isNaN(saltValue) || saltValue <= 0) {
      Alert.alert(
        "Error",
        "Please enter a valid amount of salt (greater than 0 kg)."
      );
      return;
    }

    // Dispatch action to update pond salt (to be implemented in pondSlice)
    dispatch(updateSalt({ pondId, addedSaltKg: saltValue }))
      .unwrap()
      .then((res) => {
        console.log("a", res);
        Alert.alert("Success", "Salt added successfully!");
        navigation.goBack(); // Return to the previous screen
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add salt. Please try again.");
        console.error(error);
      });

    setAddedSaltKg(""); // Clear the input field
  };

  return (
    <ImageBackground
      source={require("../../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add Salt</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Amount of Salt Added (kg):</Text>
          <TextInput
            style={styles.input}
            value={addedSaltKg}
            onChangeText={setAddedSaltKg}
            keyboardType="numeric" // Restrict to numeric input
            placeholder="Enter salt amount (e.g., 1.5)"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddSaltForm;
