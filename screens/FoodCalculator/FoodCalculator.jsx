import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { pondByOwnerSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { calculateFood } from "../../redux/slices/calculatorSlice";
import AntDesign from "react-native-vector-icons/AntDesign";

const FoodCalculator = ({ navigation }) => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [food, setFood] = useState();

  const [growth, setGrowth] = useState("Trung bình");
  const growthOptions = ["Thấp", "Trung bình", "Cao"];

  const temperatureOptions = [
    { label: "6 - 8º", temperatureLower: 6, temperatureUpper: 8 },
    { label: "9 - 12º", temperatureLower: 9, temperatureUpper: 12 },
    { label: "13 - 16º", temperatureLower: 13, temperatureUpper: 16 },
    { label: "17 - 20º", temperatureLower: 17, temperatureUpper: 20 },
    { label: "21 - 24º", temperatureLower: 21, temperatureUpper: 24 },
  ];
  const [temperature, setTemperature] = useState(temperatureOptions[2]);

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
        const token = await AsyncStorage.getItem("accessToken");
        setToken(token);
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
    const pondId = homePond?.pondID;
    const desiredGrowth = growth;
    const temperatureLower = temperature?.temperatureLower;
    const temperatureUpper = temperature?.temperatureUpper;
    const values = {
      PondId: pondId,
      DesiredGrowth: desiredGrowth,
      TemperatureLower: temperatureLower,
      TemperatureUpper: temperatureUpper,
    };
    if (
      homePond?.pondID &&
      growth &&
      temperature?.temperatureLower &&
      temperature?.temperatureUpper
    ) {
      dispatch(calculateFood(values))
        .unwrap()
        .then((response) => {
          console.log(response);
          setFood(response?.foodAmount);
        });
    }
  }, [homePond, growth, temperature, dispatch]);

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack("MainTabs")}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Tính Lượng Thức Ăn</Text>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Chọn Một Hồ"}
            </Text>
            <Icon name="down" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          {homePondOpen && (
            <View style={styles.dropdown}>
              {pondData?.map((item) => (
                <TouchableOpacity
                  key={item?.pondID}
                  onPress={() => {
                    setHomePond(item);
                    setHomePondOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItem}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.subtitle}>Mức Tăng Trưởng Mong Muốn</Text>
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

        <Text style={styles.subtitle}>Nhiệt Độ Nước</Text>
        <View style={styles.toggleContainer}>
          {temperatureOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.toggleButton,
                temperature.label === option.label && styles.activeToggle,
              ]}
              onPress={() => setTemperature(option)}
            >
              <Text
                style={[
                  styles.toggleText,
                  temperature.label === option.label && styles.activeText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.infoText}>
          Lượng thức ăn được khuyến nghị nên được chia đều thành 3 - 5 lần cho
          ăn mỗi ngày. Bằng cách này, cá koi sẽ tiêu hóa thức ăn tốt hơn...
        </Text>

        <View style={styles.recommendationButton}>
          <Text style={styles.recommendationText}>
            {homePond ? `Lượng Đề Xuất: ${food}g` : "Vui Lòng Chọn Một Hồ"}
          </Text>
        </View>

        {homePond && (
          <TouchableOpacity
            style={styles.suggestButton}
            onPress={() =>
              navigation.navigate("SuggestFood", { pondId: homePond?.pondID })
            }
          >
            <Text style={styles.recommendationText}>Mới</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#007AFF",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 25,
        }}
        onPress={() => navigation.navigate("SymptomScreen")}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Tiếp Theo
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default FoodCalculator;
