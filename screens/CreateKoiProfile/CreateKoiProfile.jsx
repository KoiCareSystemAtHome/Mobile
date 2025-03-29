import React, { useEffect, useState, useRef } from "react";
import { 
  ImageBackground, 
  Text, 
  TouchableOpacity, 
  View,
  TextInput,
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
    dispatch(getDiseaseById(diseaseId))
  }, [isLoggedIn?.id, dispatch]);

  const handleDatePickerChange = (date) => {
    if (isMounted.current) {
      const newDate = new Date(endDate);
      newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setEndDate(newDate);
      setDatePickerVisible(false);
    }
  };

  const handleSave = () => {
    const values = {
      fishId: selectedFishId,
      endDate: endDate.toISOString(),
      note,
      diseaseId,
      status:"Pending",
      medicineId: "74ed7d14-c451-4fa3-a039-6931de98101a",
      symptoms
    };
    console.log("Saving profile with values:", values);
    dispatch(createKoiProfile(values));
  };

  const fishData = [
    { value: "", label: "Select a fish" },
    ...(fishByOwner?.map(fish => ({
      value: fish.koiID,
      label: fish.name
    })) || [])
  ];


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
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Koi Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Fish Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Koi Fish</Text>
            <Picker
              data={fishData}
              cols={1}
              value={selectedFishId}
              onChange={(value) => setSelectedFishId(value[0])}
            >
              <TouchableOpacity style={styles.pickerContainer}>
                <Text style={styles.pickerText}>
                  {fishData.find(fish => fish.value === selectedFishId)?.label || "Select a fish"}
                </Text>
                <AntDesign name="down" size={16} color="#000" />
              </TouchableOpacity>
            </Picker>
          </View>

          {/* End Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
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

          {/* Note Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.textInput}
              value={note}
              onChangeText={setNote}
              placeholder="Enter notes here..."
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSave}
          >
            <Text style={styles.submitButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default CreateKoiProfile;