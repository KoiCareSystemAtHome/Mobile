import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createSymptomReminder,
  getExamination,
  getPrediction,
  getSymptomByType,
} from "../../redux/slices/symptomSlice";
import {
  symptomByTypeSelector,
  symptomExaminationSelector,
  symptomPredictionSelector,
  pondByOwnerSelector,
  symptomReminderSelector,
} from "../../redux/selector";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";

const SymptomScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const symptomData = useSelector(symptomByTypeSelector);
  const pondData = useSelector(pondByOwnerSelector);
  const symptomReminder = useSelector(symptomReminderSelector);

  // Dropdown states for symptoms
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  // Popup state
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Pond selector states
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [reminderText, setReminderText] = useState("");

  // Fetch user data and ponds
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getPondByOwner(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  // Fetch symptom data on mount
  useEffect(() => {
    dispatch(getSymptomByType("Common"));
  }, [dispatch]);

  // Map symptom data to dropdown items
  useEffect(() => {
    if (symptomData?.length > 0) {
      const dropdownItems = symptomData.map((symptom) => ({
        label: symptom.name,
        value: symptom.symtompId,
      }));
      setItems(dropdownItems);
    }
  }, [symptomData]);

  // Get selected symptom names
  const selectedSymptoms = symptomData
    ?.filter((symptom) => selectedValues.includes(symptom.symtompId))
    .map((symptom) => symptom.name);

  // Get unique selected symptom types
  const selectedTypes = [
    ...new Set(
      symptomData
        ?.filter((symptom) => selectedValues.includes(symptom.symtompId))
        .map((symptom) => symptom.type)
    ),
  ];

  // Trigger popup when Common_Enviroment is in selectedTypes
  useEffect(() => {
    if (selectedTypes.includes("Common_Enviroment")) {
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
      setHomePond(null);
      setHomePondOpen(false);
      setReminderText("");
    }
  }, [selectedTypes]);

  // Render individual symptom item
  const renderSymptomItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>{item}</Text>
    </View>
  );

  // Render individual type item
  const renderTypeItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>
        {item === "Common_Food"
          ? "Thức Ăn"
          : item === "Common_Enviroment"
          ? "Môi trường"
          : item === "Common_Disease"
          ? "Loại bệnh phổ biển"
          : item}
      </Text>
    </View>
  );

  // Handle navigation to PredictSymptom
  const handleNext = () => {
    navigation.navigate("PredictSymptom", {
      selectedSymptomIds: selectedValues.map((id) => ({
        symtompId: id,
        value: "True",
      })),
      pondId: homePond?.pondID,
    });
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setHomePond(null);
    setHomePondOpen(false);
    setSelectedValues([]);
    setReminderText("");
  };

  // Handle pond selection
  const handlePondSelect = (item) => {
    setHomePond(item);
    setHomePondOpen(false);
    setReminderText(
      "Bạn có muốn tạo nhắc nhở để kiểm tra hồ? Các triệu chứng của cá có thể liên quan đến vấn đề môi trường trong hồ."
    );
  };

  // Handle confirm button press
  const handleConfirmReminder = () => {
    if (homePond) {
      dispatch(createSymptomReminder(homePond?.pondID));
      setReminderText("Nhắc nhở đã được tạo thành công!");
    }
  };

  console.log(symptomReminder);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Chẩn Đoán Bệnh</Text>
        <Text style={styles.subTitle}>Hãy chọn triệu chứng của cá</Text>
        <DropDownPicker
          open={open}
          value={selectedValues}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedValues}
          multiple={true}
          mode="BADGE"
          placeholder="Select Symptoms"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          accessibilityLabel="Select fish symptoms"
          accessibilityRole="combobox"
        />

        {selectedSymptoms?.length > 0 && (
          <View style={styles.symptomCard}>
            <FlatList
              data={selectedSymptoms}
              renderItem={renderSymptomItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.symptomList}
            />
          </View>
        )}

        {selectedTypes?.length > 0 && (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>
              Có vẻ hồ cá của bạn đang gặp vấn đề về:
            </Text>
            <FlatList
              data={selectedTypes}
              renderItem={renderTypeItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.symptomList}
            />
          </View>
        )}

        {/* Popup Modal for Common_Enviroment */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopupVisible}
          onRequestClose={handleClosePopup}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tạo Nhắc Nhở</Text>
              <Text style={styles.modalSubText}>
                {reminderText || "Vui lòng chọn một hồ để tạo nhắc nhở."}
              </Text>
              <TouchableOpacity
                onPress={() => setHomePondOpen(!homePondOpen)}
                style={styles.selector}
                accessibilityLabel="Select a pond"
                accessibilityRole="button"
              >
                <Text style={styles.selectorText}>
                  {homePond ? homePond?.name : "Chọn Một Ao"}
                </Text>
                <Icon
                  name={homePondOpen ? "up" : "down"}
                  size={16}
                  color="#1A3C6D"
                />
              </TouchableOpacity>
              {homePondOpen && (
                <View style={styles.dropdown1}>
                  {pondData?.length > 0 ? (
                    pondData.map((item) => (
                      <TouchableOpacity
                        key={item?.pondID}
                        onPress={() => handlePondSelect(item)}
                        style={styles.dropdownItem}
                      >
                        <Text style={styles.dropdownItemText}>
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.dropdownItemText}>Không có hồ nào</Text>
                  )}
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    { opacity: homePond ? 1 : 0.5 },
                  ]}
                  onPress={handleConfirmReminder}
                  disabled={!homePond}
                  accessibilityLabel="Confirm reminder"
                  accessibilityRole="button"
                >
                  <Text style={styles.confirmButtonText} numberOfLines={1}>Tạo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClosePopup}
                  accessibilityLabel="Close popup"
                  accessibilityRole="button"
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedValues.length > 0 ? 1 : 0.5 },
          ]}
          onPress={handleNext}
          disabled={selectedValues.length === 0}
          accessibilityLabel="Proceed to prediction"
          accessibilityRole="button"
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SymptomScreen;