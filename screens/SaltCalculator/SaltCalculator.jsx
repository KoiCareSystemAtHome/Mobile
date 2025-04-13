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
import Icon1 from "react-native-vector-icons/MaterialIcons"; // Add MaterialIcons for better icons
import AntDesign from "react-native-vector-icons/AntDesign";

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
          // Only generate reminder after calculateSalt is complete
          dispatch(generateReminder({ pondId: homePond?.pondID, cycleHours }))
            .unwrap()
            .then(() => {
              setReminderModalVisible(true); // Show modal after reminders are generated
            });
        });
    }
  }, [homePond, growth, waterChange, cycleHours, dispatch]);

  const handleSaveReminder = () => {
    const pondId = homePond?.pondID;
    const reminders = reminderData?.reminders;
    const values = { pondId, reminders };
    console.log(values);
    dispatch(saveReminder(values))
      .unwrap()
      .then((res) => {
        console.log("Reminders saved successfully!", res);
        setReminderModalVisible(false); // Close modal on save
      })
      .catch((error) => {
        console.error("Failed to save reminders:", error);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack("MainTabs")}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Ước Tính Lượng Muối</Text>

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
        {homePond ? (
          <>
            <View style={styles.card}>
              <Text style={styles.label}>
                Thể tích hồ: <Text style={styles.value}>{pondVolume}L</Text>
              </Text>
            </View>

            {/* Desired Concentration */}
            <View style={styles.card}>
              <Text style={styles.label}>Nồng độ mong muốn:</Text>
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
                      {growthLabels[option]} {/* Display Vietnamese label */}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>
                Lượng nước trong hồ:{" "}
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
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007AFF"
              />
            </View>

            {/* <View style={styles.saltBox}>
              <Text style={styles.saltText}>
                Lượng muối hiện tại: {saltData?.currentSalt || 0} Kg
              </Text>
              <Text style={styles.saltText}>
                Lượng muối cần thiết: {saltData?.saltNeeded || 0} Kg
              </Text>
              <Text style={styles.saltText}>
                Lượng muối tối ưu: {saltData?.totalSalt || 0} Kg
              </Text>
              <Text style={styles.saltText}>
                Lượng nước phải thay: {saltData?.waterNeeded || 0} L
              </Text>
              <Text style={styles.saltText}>
                Lượng muối dư thừa: {saltData?.excessSalt || 0} Kg
              </Text>
              <Text style={styles.saltText}>
                Lượng muối tối ưu từ: {saltData?.optimalSaltFrom || 0} Kg đến{" "}
                {saltData?.optimalSaltTo || 0} Kg
              </Text>
            </View> */}

            <View style={styles.saltBox}>
              <Text style={styles.sectionTitle}>Thông Tin Lượng Muối</Text>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="water-drop"
                  size={20}
                  color="#007AFF"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối hiện tại: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.currentSalt || 0} Kg
                  </Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="add-circle"
                  size={20}
                  color="#007AFF"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối cần thiết: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.saltNeeded || 0} Kg
                  </Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="check-circle"
                  size={20}
                  color="#007AFF"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối tối ưu: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.totalSalt || 0} Kg
                  </Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="sync"
                  size={20}
                  color="#007AFF"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng nước phải thay: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.waterNeeded || 0} L
                  </Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="warning"
                  size={20}
                  color="#FF9500"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối dư thừa: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.excessSalt || 0} Kg
                  </Text>
                </Text>
              </View>
              <View style={styles.saltItemContainer}>
                <Icon1
                  name="trending-up"
                  size={20}
                  color="#007AFF"
                  style={styles.saltIcon}
                />
                <Text style={styles.saltText}>
                  <Text style={styles.saltLabel}>Lượng muối tối ưu từ: </Text>
                  <Text style={styles.saltValue}>
                    {saltData?.optimalSaltFrom || 0} Kg đến{" "}
                    {saltData?.optimalSaltTo || 0} Kg
                  </Text>
                </Text>
              </View>
            </View>

            {/* Instruction Display */}
            {instructionData?.instructions && (
              // <View style={styles.saltBox}>
              //   <Text style={styles.instructionLabel}>Instructions:</Text>
              //   {instructionData.instructions.map((instruction, index) => (
              //     <Text key={index} style={styles.instructionItem}>
              //       {instructionData.instructions.length > 1
              //         ? `${index + 1}. `
              //         : ""}
              //       {instruction}
              //     </Text>
              //   ))}
              // </View>
              <View style={styles.saltBox}>
                <Text style={styles.sectionTitle}>Hướng Dẫn Bổ Sung:</Text>
                <Text style={styles.saltText}>
                  -{" "}
                  {saltData?.additionalInstruction?.join("\n - ") ||
                    "No instructions available"}
                </Text>
              </View>
            )}
          </>
        ) : (
          <></>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Reminder Modal */}
      {homePond && reminderData && reminderData.reminders?.length > 0 && (
        <Modal
          visible={isReminderModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setReminderModalVisible(false)}
        >
          <View style={[styles.saltBox]}>
            <View style={styles.modalContainer}>
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
              <Text style={styles.instructionLabel}>Nhắc nhở thêm muối:</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Button
                  mode="outlined"
                  onPress={() => setReminderModalVisible(false)}
                  style={{ flex: 1, marginRight: 10 }}
                >
                  Hủy
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSaveReminder}
                  style={{ flex: 1 }}
                  labelStyle={styles.saveReminderText}
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
      >
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SaltCalculator;
