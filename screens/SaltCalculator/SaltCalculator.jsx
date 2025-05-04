import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
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
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { getReminderByOwner } from "../../redux/slices/reminderSlice";
import dayjs from "dayjs";

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
  const [cycleHours, setCycleHours] = useState(12);
  const [isReminderModalVisible, setReminderModalVisible] = useState(false);
  const growthLabels = {
    Low: "Thấp",
    Medium: "Trung bình",
    High: "Cao",
  };
  const growthOptions = ["Low", "Medium", "High"];
  const cycleOptions = [12, 24];

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
          dispatch(generateReminder({ pondId: homePond?.pondID, cycleHours }))
            .unwrap()
            .then(() => {
              setReminderModalVisible(true);
            });
        });
    }
  }, [homePond, growth, waterChange, cycleHours, dispatch]);

  const handleSaveReminder = () => {
    const pondId = homePond?.pondID;
    const reminders = reminderData?.reminders;
    const values = { pondId, reminders };
    console.log("Saving reminders:", values);
    dispatch(saveReminder(values))
      .unwrap()
      .then((res) => {
        console.log("Reminders saved successfully!", res);
        dispatch(getReminderByOwner(isLoggedIn?.id));
        setReminderModalVisible(false);
      })
      .catch((error) => {
        console.error("Failed to save reminders:", error);
      });
  };

  console.log(reminderData);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Ước Tính Lượng Muối</Text>

        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
            accessibilityLabel="Select a pond"
            accessibilityRole="button"
          >
            <View style={styles.selectorInner}>
              <Text style={styles.selectorText}>
                {homePond ? homePond?.name : "Vui Lòng Chọn Hồ"}
              </Text>
              <Icon
                name={homePondOpen ? "up" : "down"}
                size={16}
                color="#004D40"
              />
            </View>
          </TouchableOpacity>
          {homePondOpen && (
            <View style={styles.dropdown}>
              {pondData?.length > 0 ? (
                pondData.map((item) => (
                  <TouchableOpacity
                    key={item?.pondID}
                    onPress={() => {
                      setHomePond(item);
                      setHomePondOpen(false);
                    }}
                    style={styles.dropdownItemContainer}
                  >
                    <Text style={styles.dropdownItemText}>{item?.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.dropdownItemText}>Không có hồ nào</Text>
              )}
            </View>
          )}
        </View>

        {homePond ? (
          <>
            <View style={styles.card}>
              <Text style={styles.label}>
                Thể Tích Hồ: <Text style={styles.value}>{pondVolume} L</Text>
              </Text>
            </View>

            {/* Desired Concentration */}
            <View style={styles.card}>
              <Text style={styles.label}>Nồng Độ Mong Muốn:</Text>
              <View style={styles.toggleContainer}>
                {growthOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.toggleButton,
                      growth === option && styles.activeToggle,
                    ]}
                    onPress={() => setGrowth(option)}
                    accessibilityLabel={`Select ${growthLabels[option]} concentration`}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        growth === option && styles.activeText,
                      ]}
                    >
                      {growthLabels[option]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>
                Lượng Nước Trong Hồ:{" "}
                <Text style={styles.value}>
                  {previewValue} L (
                  {((previewValue / pondVolume) * 100).toFixed(0)}%)
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
                minimumTrackTintColor="#26A69A"
                maximumTrackTintColor="#B0BEC5"
                thumbTintColor="#26A69A"
              />
            </View>

            <View style={styles.saltBox}>
              <Text style={styles.sectionTitle}>Thông Tin Lượng Muối</Text>
              <View style={styles.saltItemContainer}>
                <Icon1 name="water-drop" size={20} color="#26A69A" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối hiện tại: </Text>
                  <Text style={styles.saltValue}>{saltData?.currentSalt || 0} Kg</Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1 name="add-circle" size={20} color="#26A69A" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối cần thiết: </Text>
                  <Text style={styles.saltValue}>{saltData?.saltNeeded || 0} Kg</Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1 name="check-circle" size={20} color="#26A69A" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối tối ưu: </Text>
                  <Text style={styles.saltValue}>{saltData?.totalSalt || 0} Kg</Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1 name="sync" size={20} color="#26A69A" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng nước phải thay: </Text>
                  <Text style={styles.saltValue}>{saltData?.waterNeeded || 0} L</Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1 name="warning" size={20} color="#FF9500" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối dư thừa: </Text>
                  <Text style={styles.saltValue}>{saltData?.excessSalt || 0} Kg</Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1 name="trending-up" size={20} color="#26A69A" style={styles.saltIcon} />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối tối ưu từ: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.optimalSaltFrom || 0} Kg đến {saltData?.optimalSaltTo || 0} Kg
                  </Text>
                </Text>
              </View>
            </View>

            {instructionData?.instructions && (
              <View style={styles.saltBox}>
                <Text style={styles.sectionTitle}>Hướng Dẫn Bổ Sung</Text>
                <Text style={styles.instructionText}>
                  - {saltData?.additionalInstruction?.join("\n- ") || "Không có hướng dẫn"}
                </Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.noPondText}>Vui lòng chọn một hồ để tiếp tục</Text>
        )}
      </ScrollView>

      {/* Reminder Modal */}
      {homePond && reminderData && reminderData.reminders?.length > 0 && (
        <Modal
          visible={isReminderModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setReminderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Nhắc Nhở Thêm Muối</Text>
              <Text style={styles.instructionLabel}>Chu Kỳ Nhắc Nhở (giờ):</Text>
              <View style={styles.toggleContainer}>
                {cycleOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.toggleButton,
                      cycleHours === option && styles.activeToggle,
                    ]}
                    onPress={() => setCycleHours(option)}
                    accessibilityLabel={`Select ${option} hour cycle`}
                    accessibilityRole="button"
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
              <Text style={styles.instructionLabel}>Lịch Nhắc Nhở:</Text>
              <ScrollView style={styles.reminderList}>
                {reminderData.reminders.map((reminder, index) => (
                  <View key={index} style={styles.reminderItem}>
                    <Text style={styles.reminderText}>
                      {reminder.title}: {reminder.description}
                    </Text>
                    <Text style={styles.reminderDate}>
                      Thời gian: {dayjs(reminder.maintainDate).utc().format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.modalButtonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => setReminderModalVisible(false)}
                  style={styles.modalButton}
                  labelStyle={styles.modalButtonText}
                >
                  Hủy
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSaveReminder}
                  style={[styles.modalButton, styles.saveButton]}
                  labelStyle={styles.modalButtonText}
                >
                  Lưu
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !homePond && styles.nextButtonDisabled]}
        onPress={() => {
          if (homePond) {
            navigation.navigate("AddSaltForm", { pondID: homePond?.pondID });
          }
        }}
        disabled={!homePond}
        accessibilityLabel="Proceed to add salt form"
        accessibilityRole="button"
      >
        <Text style={styles.nextButtonText}>Tiếp Theo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SaltCalculator;