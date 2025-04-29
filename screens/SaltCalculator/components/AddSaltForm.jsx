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
  const pondId = route.params?.pondID || route.params.pondId;
  const [addedSaltKg, setAddedSaltKg] = useState("");

  // Handle form submission
  const handleSave = () => {
    const saltValue = parseFloat(addedSaltKg);

    if (isNaN(saltValue) || saltValue <= 0) {
      Alert.alert("Error", "Vui lòng nhập nồng độ muối hợp lệ (lớn hơn 0 %).");
      return;
    } else if (isNaN(saltValue) || saltValue > 2) {
      Alert.alert(
        "Error",
        "Vui lòng nhập nồng độ muối hợp lệ (nhỏ hơn hoặc bằng 2%)."
      );
      return;
    }

    // Dispatch action to update pond salt (to be implemented in pondSlice)
    console.log(pondId, addedSaltKg)
    dispatch(updateSalt({ pondId, addedSaltKg: saltValue }))
      .unwrap()
      .then((res) => {
        console.log(res)
        if (res && res.success === true) {
          Alert.alert("Success", res.message);
          navigation.goBack(); 
        }
      })
      .catch((error) => {
        Alert.alert("Error", "Thêm muối không thành công. Vui lòng thử lại!");
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
        <Text style={styles.title}>Thêm nồng độ muối</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Lượng Muối Thêm Vào (%):</Text>
          <TextInput
            style={styles.input}
            value={addedSaltKg}
            onChangeText={setAddedSaltKg}
            keyboardType="numeric"
            placeholder="Nhập nồng độ muối (Ví dụ: 1.5)"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddSaltForm;
