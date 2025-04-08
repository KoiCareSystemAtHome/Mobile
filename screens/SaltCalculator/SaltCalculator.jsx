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
  saltReminderSelector,
  saltSelector,
} from "../../redux/selector";
import Icon from "react-native-vector-icons/AntDesign";
import {
  additionProccess,
  calculateSalt,
  generateReminder,
  saveReminder,
} from "../../redux/slices/calculatorSlice";
import { Button } from "react-native-paper";

const SaltCalculator = ({ navigation }) => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const saltData = useSelector(saltSelector);
  const instructionData = useSelector(instructionSelector);
  const reminderData = useSelector(saltReminderSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentConcentration, setCurrentConcentration] = useState(0.09);
  const [desiredConcentration, setDesiredConcentration] = useState(0.31);
  const [waterChange, setWaterChange] = useState(8);
  const [previewValue, setPreviewValue] = useState(0.2);
  const [pondVolume, setPondVolume] = useState(80);
  const [growth, setGrowth] = useState("Medium");
  const [cycleHours, setCycleHours] = useState(12); // New state for cycleHours

  const growthOptions = ["Low", "Medium", "High"];
  const cycleOptions = [12, 24]; // Options for cycleHours toggle

  useEffect(() => {
    const getData = async () => {
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

  const handleSaveReminder = () => {
    const pondId = homePond?.pondID;
    const reminders = reminderData?.reminders
    const values = {pondId, reminders}
    console.log(values)
    dispatch(saveReminder(values))
      .unwrap()
      .then((res) => {
        console.log("Reminders saved successfully!", res);
      })
      .catch((error) => {
        console.error("Failed to save reminders:", error);
      });
  };

  useEffect(() => {
    if (homePond) {
      dispatch(generateReminder({ pondId: homePond?.pondID, cycleHours }));
    }
  }, [homePond, cycleHours]);

  console.log(reminderData)

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

        {homePond ? (
          <>
            <View style={styles.saltBox}>
              <Text style={styles.saltText}>
                Lượng muối hiện tại: {saltData?.currentSalt || 0}kg
              </Text>
              <Text style={styles.saltText}>
                Lượng muối cần thiết: {saltData?.saltNeeded || 0}kg
              </Text>
              <Text style={styles.saltText}>
                Tổng muối: {saltData?.totalSalt || 0}kg
              </Text>
              <Text style={styles.saltText}>
                Lượng nước cần thiết: {saltData?.waterNeeded || 0}L
              </Text>
            </View>

            {/* Instruction Display */}
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

            {/* Reminder Display */}

            {/* Cycle Hours Selection */}
            {homePond && (
              <View style={styles.saltBox}>
                <Text style={styles.instructionLabel}>
                  Chu kỳ nhắc nhở (giờ):
                </Text>
                <View style={styles.toggleContainer}>
                  {cycleOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.toggleButton,
                        cycleHours === option && styles.activeToggle,
                      ]}
                      onPress={() => setCycleHours(option)}
                    >
                      <Text
                        style={[
                          styles.toggleText,
                          cycleHours === option && styles.activeText,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {reminderData?.reminders?.length > 0 && (
                  <View style={styles.saltBox}>
                    <Text style={styles.instructionLabel}>
                      Nhắc nhở thêm muối:
                    </Text>
                    {reminderData.reminders.map((reminder, index) => (
                      <View key={index} style={styles.reminderItem}>
                        <Text style={styles.reminderText}>
                          {reminder.title}: {reminder.description}
                        </Text>
                        <Text style={styles.reminderDate}>
                          Thời gian:{" "}
                          {new Date(reminder.maintainDate).toLocaleString()}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
                <Button
                  mode="contained"
                  onPress={handleSaveReminder}
                  style={styles.saveReminderButton}
                  labelStyle={styles.saveReminderText}
                >
                  Lưu Nhắc Nhở
                </Button>
              </View>
            )}
          </>
        ) : (
          <></>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !homePond && styles.nextButtonDisabled]}
        onPress={() => {
          if (homePond) {
            navigation.navigate("AddSaltForm", { pondID: homePond?.pondID });
          }
        }}
        disabled={!homePond}
      >
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SaltCalculator;
