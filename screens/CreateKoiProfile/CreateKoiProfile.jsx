import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
import { createKoiProfile, getFishByOwner } from "../../redux/slices/fishSlice";
import { useDispatch, useSelector } from "react-redux";
import { diseaseByIdSelector, fishByOwnerSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker, DatePicker, Provider } from "@ant-design/react-native";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { getDiseaseById } from "../../redux/slices/symptomSlice";

const CreateKoiProfile = ({ route, navigation }) => {
  const { diseaseId, symptoms } = route.params;
  const dispatch = useDispatch();
  const fishByOwner = useSelector(fishByOwnerSelector);
  const diseaseById = useSelector(diseaseByIdSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [selectedFishId, setSelectedFishId] = useState("");
  const [note, setNote] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [cart, setCart] = useState([]);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      setDatePickerVisible(false);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (isMounted.current) {
          setIsLoggedIn(value ? JSON.parse(value) : null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getFishByOwner(isLoggedIn.id));
    }
    dispatch(getDiseaseById(diseaseId));
  }, [isLoggedIn?.id, dispatch, diseaseId]);

  const handleDatePickerChange = (date) => {
    if (isMounted.current) {
      const newDate = new Date(endDate);
      newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setEndDate(newDate);
      setDatePickerVisible(false);
    }
  };

  const handleMedicineSelect = (medicineId) => {
    // Toggle selection: deselect if the same medicine is clicked again
    setSelectedMedicineId(selectedMedicineId === medicineId ? "" : medicineId);
  };

  const handleAddToCart = (medicine) => {};

  const handleSave = () => {
    if (!selectedFishId) {
      Alert.alert("Lỗi", "Vui lòng chọn một con cá.");
      return;
    }
    if (!diseaseId) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin bệnh.");
      return;
    }
    const values = {
      fishId: selectedFishId,
      endDate: endDate.toISOString(),
      note,
      diseaseId,
      status: "Pending",
      medicineId: selectedMedicineId || null,
      symptoms,
    };
    console.log("Saving profile with values:", values);
    dispatch(createKoiProfile(values))
      .unwrap()
      .then((res) => {
        console.log(res);
        Alert.alert("Thành công", "Lưu lịch sử bệnh thành công!");
        navigation.navigate("FishStatistic");
      })
      .catch((error) => {
        Alert.alert("Lỗi", "Không thể lưu lịch sử bệnh. Vui lòng thử lại.");
        console.error(error);
      });
  };

  const fishData = [
    ...(fishByOwner?.map((fish) => ({
      value: fish.koiID,
      label: fish.name,
    })) || []),
  ];

  // Render item for Medicine FlatList
  const renderMedicineItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.medicineCard,
        selectedMedicineId === item.medicineId && styles.medicineCardSelected,
      ]}
      onPress={() => handleMedicineSelect(item.medicineId)}
    >
      <View style={styles.medicineContent}>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.medicineImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.medicineName}>{item.name}</Text>
        {item.dosageForm && (
          <Text style={styles.medicineDescription} numberOfLines={2}>
            {item.dosageForm}
          </Text>
        )}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        {selectedMedicineId === item.medicineId && (
          <AntDesign
            name="checkcircle"
            size={20}
            color="#007AFF"
            style={styles.checkIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  // Render item for Symptom and Side Effect FlatList
  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>• {item.description}</Text>
    </View>
  );

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              style={{ marginTop: 20, marginLeft: 20 }}
              name="left"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Lịch sử bệnh cá</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Scrollable Form */}
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Fish Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên cá koi:</Text>
            <Picker
              data={fishData}
              cols={1}
              value={selectedFishId}
              onChange={(value) => setSelectedFishId(value[0])}
            >
              <TouchableOpacity style={styles.pickerContainer}>
                <Text style={styles.pickerText}>
                  {fishData.find((fish) => fish.value === selectedFishId)
                    ?.label || "Chọn con cá đang gặp vấn đề"}
                </Text>
                <AntDesign name="down" size={16} color="#000" />
              </TouchableOpacity>
            </Picker>
          </View>

          {/* End Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ngày hết điều trị (dự kiến)</Text>
            <DatePicker
              value={endDate}
              mode="date"
              minDate={new Date()}
              format="DD MMMM YYYY"
              onChange={handleDatePickerChange}
              visible={isDatePickerVisible}
              onDismiss={() => setDatePickerVisible(false)}
            >
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setDatePickerVisible(true)}
              >
                <Text style={styles.dateText}>
                  {endDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <AntDesign name="calendar" size={20} color="#000" />
              </TouchableOpacity>
            </DatePicker>
          </View>

          {/* Medicines List */}
          {diseaseById && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Thuốc điều trị</Text>
              {diseaseById.medicines?.length > 0 ? (
                <FlatList
                  data={diseaseById.medicines}
                  renderItem={renderMedicineItem}
                  keyExtractor={(item) => item.medicineId}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment="center"
                  snapToInterval={160 + 10} // Card width + margin
                  decelerationRate="fast"
                  style={styles.medicineList}
                />
              ) : (
                <Text style={styles.noMedicinesText}>
                  Không có thuốc nào được đề xuất cho bệnh này.
                </Text>
              )}
            </View>
          )}

          {/* Cart Contents */}
          {cart.length > 0 && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Giỏ hàng</Text>
              <View style={styles.cartContainer}>
                {cart.map((item) => (
                  <View key={item.medicineId} style={styles.cartItem}>
                    <Text style={styles.cartItemText}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Note Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ghi chú</Text>
            <TextInput
              style={styles.textInput}
              value={note}
              onChangeText={setNote}
              placeholder="Thêm thông tin ghi chú về thuốc và thức ăn để chăm sóc cá của bạn tốt hơn"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Sick Symptoms List */}
          {diseaseById && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Triệu chứng bệnh</Text>
              <FlatList
                data={diseaseById.sickSymtomps || []}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
                style={styles.listContainer}
                initialNumToRender={10}
                windowSize={5}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Side Effects List */}
          {diseaseById && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tác dụng phụ</Text>
              <FlatList
                data={diseaseById.sideEffect || []}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
                style={styles.listContainer}
                initialNumToRender={10}
                windowSize={5}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>Lưu</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default CreateKoiProfile;
