import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByID, getPondByOwner } from "../../redux/slices/pondSlice";
import {
  instructionSelector,
  pondByOwnerSelector,
  saltSelector,
} from "../../redux/selector";
import Icon from "react-native-vector-icons/AntDesign";
import {
  additionProccess,
  calculateSalt,
} from "../../redux/slices/calculatorSlice";
import { Button } from "react-native-paper";

const SaltCalculator = ({ navigation }) => { // Added navigation prop
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const saltData = useSelector(saltSelector);
  const instructionData = useSelector(instructionSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentConcentration, setCurrentConcentration] = useState(0.09);
  const [desiredConcentration, setDesiredConcentration] = useState(0.31);
  const [waterChange, setWaterChange] = useState(8);
  const [previewValue, setPreviewValue] = useState(0.2);
  const [pondVolume, setPondVolume] = useState(80);

  const [growth, setGrowth] = useState("Medium");
  const growthOptions = ["Low", "Medium", "High"];

  const { totalSalt, waterChangeSalt } = calculateSalt();

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getPondByOwner(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  useEffect(() => {
    if (homePond) {
      setPondVolume(homePond?.maxVolume);
      dispatch(getPondByID(homePond?.pondID));
    }
  }, [homePond, dispatch]);

  useEffect(() => {
    if (homePond) {
      const pondId = homePond?.pondID;
      const standardSaltLevel = growth;
      const waterChangePercent = Number(
        ((waterChange / pondVolume) * 100).toFixed(0)
      );
      const value = { pondId, standardSaltLevel, waterChangePercent };
      dispatch(calculateSalt(value))
        .unwrap()
        .then(() => {
          dispatch(additionProccess(pondId));
        });
    }
  }, [homePond, growth, waterChange, dispatch]);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Ước tính lượng muối</Text>

        <View style={styles.selectorContainer}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Vui lòng chọn hồ"}
            </Text>
            <Icon name="down" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        {homePondOpen && (
          <View style={styles.dropdown}>
            {pondData.map((item) => (
              <TouchableOpacity
                key={item?.pondID}
                onPress={() => {
                  setHomePond(item);
                  setHomePondOpen(false);
                }}
                style={styles.dropdownItemContainer}
              >
                <Text style={styles.dropdownItem}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.label}>
            Thể tích hồ: <Text style={styles.value}>{pondVolume}L</Text>
          </Text>
        </View>

        {/* Desired Concentration */}
        <View style={styles.card}>
          <Text style={styles.label}>Nồng độ mong muốn: </Text>
          <View style={styles.toggleContainer}>
            {growthOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.toggleButton,
                  growth === option && styles.activeToggle,
                ]}
                onPress={() => setGrowth(option)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    growth === option && styles.activeText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Lượng nước sẽ thay:{" "}
            <Text style={styles.value}>
              {previewValue}L ({((previewValue / pondVolume) * 100).toFixed(0)}
              %)
            </Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={pondVolume}
            step={1}
            value={waterChange}
            onValueChange={(value) => setPreviewValue(value)}
            onSlidingComplete={(value) => setWaterChange(value)}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#007AFF"
          />
        </View>

        {/* Salt Amount Display */}
        <View style={styles.saltBox}>
          <Text style={styles.saltText}>
            Lượng muối hiện tại: {saltData?.saltCurrent}kg
          </Text>
          <Text style={styles.saltText}>
            Lượng muối cần thiết: {saltData?.saltNeeded}kg
          </Text>
          <Text style={styles.saltText}>
            Tổng muối: {saltData?.totalSalt}kg
          </Text>
          <Text style={styles.saltText}>
            Lượng nước cần thiết: {saltData?.waterNeeded}L
          </Text>
        </View>
        {instructionData?.instructions && (
          <View style={styles.saltBox}>
            <Text style={styles.instructionLabel}>Instructions:</Text>
            {instructionData.instructions.map((instruction, index) => (
              <Text key={index} style={styles.instructionItem}>
                {instructionData.instructions.length > 1
                  ? `${index + 1}. `
                  : ""}
                {instruction}
              </Text>
            ))}
          </View>
        )}

        {/* Add padding or placeholder to ensure scrollable content */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !homePond && styles.nextButtonDisabled, // Apply disabled style if no pond is selected
        ]}
        onPress={() => {
          if (homePond) {
            navigation.navigate("AddSaltForm", { pondID: homePond?.pondID });
          }
        }}
        disabled={!homePond} // Disable the button if homePond is null
      >
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SaltCalculator;