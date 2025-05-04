import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { pondByOwnerSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { calculateFood } from "../../redux/slices/calculatorSlice";

const FoodCalculator = ({ navigation }) => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [food, setFood] = useState();

  const [growth, setGrowth] = useState("medium");
  const growthOptions = [
    { label: "Thấp", value: "low" },
    { label: "Trung bình", value: "medium" },
    { label: "Cao", value: "high" },
  ];

  const temperatureOptions = [
    { label: "6 - 8º", temperatureLower: 6, temperatureUpper: 8 },
    { label: "9 - 12º", temperatureLower: 9, temperatureUpper: 12 },
    { label: "13 - 16º", temperatureLower: 13, temperatureUpper: 16 },
    { label: "17 - 20º", temperatureLower: 17, temperatureUpper: 20 },
    { label: "21 - 24º", temperatureLower: 21, temperatureUpper: 24 },
  ];
  const [temperature, setTemperature] = useState(temperatureOptions[2]);

  useEffect(() => {
    const getData = async () => {
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
          setFood(response);
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
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Tính Lượng Thức Ăn</Text>

        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
            accessibilityLabel="Select a pond"
            accessibilityRole="button"
          >
            <View style={styles.selectorInner}>
              <Text style={styles.selectorText}>
                {homePond ? homePond?.name : "Chọn Một Ao"}
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
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{item?.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.dropdownItemText}>Không có ao nào</Text>
              )}
            </View>
          )}
        </View>

        <Text style={styles.subtitle}>Mức Tăng Trưởng Mong Muốn</Text>
        <View style={styles.toggleContainer}>
          {growthOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.toggleButton,
                growth === option.value && styles.activeToggle,
              ]}
              onPress={() => setGrowth(option.value)}
              accessibilityLabel={`Select ${option.label} growth`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.toggleText,
                  growth === option.value && styles.activeText,
                ]}
              >
                {option.label}
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
              accessibilityLabel={`Select ${option.label} temperature`}
              accessibilityRole="button"
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

        {food?.numberOfFish != null && food?.totalFishWeight != null && (
          <View style={styles.fishInfoContainer}>
            <Text style={styles.fishInfoTitle}>Thông Tin Hồ</Text>
            <View style={styles.fishInfoRow}>
              <Text style={styles.fishInfoItem}>
                Tổng cá: <Text style={styles.fishInfoItemBold}>{food.numberOfFish} 🐟</Text>
              </Text>
              <Text style={styles.fishInfoItem}>
                Tổng trọng lượng: <Text style={styles.fishInfoItemBold}>{food.totalFishWeight} kg</Text>
              </Text>
            </View>
          </View>
        )}

        {(food?.feedingOften || food?.addtionalInstruction) && (
          <View style={styles.fishInfoContainer}>
            <Text style={styles.fishInfoTitle}>Thông Tin Thức Ăn</Text>
            {food?.feedingOften && (
              <Text style={styles.fishInfoItem}>
                🔁 Tần suất gợi ý: <Text style={styles.fishInfoItemBold}>{food.feedingOften}</Text>
              </Text>
            )}
            {food?.addtionalInstruction && (
              <Text style={styles.fishInfoItem}>
                ⚠️ Bị ảnh hưởng bởi: <Text style={styles.fishInfoItemBold}>{food.addtionalInstruction}</Text>
              </Text>
            )}
          </View>
        )}

        <Text style={styles.infoText}>
          Lượng thức ăn được khuyến nghị nên được chia đều thành 3 - 5 lần cho ăn mỗi ngày. Bằng cách này, cá koi sẽ tiêu hóa thức ăn tốt hơn.
        </Text>

        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>
            {homePond ? `Lượng Đề Xuất: ${food?.foodAmount || "0"} kg` : "Vui Lòng Chọn Một Ao"}
          </Text>
        </View>

        {homePond && (
          <TouchableOpacity
            style={styles.suggestButton}
            onPress={() => navigation.navigate("SuggestFood", { pondId: homePond?.pondID })}
            accessibilityLabel="Suggest new food"
            accessibilityRole="button"
          >
            <Text style={styles.suggestButtonText}>Mới</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("SymptomScreen")}
        accessibilityLabel="Proceed to symptom screen"
        accessibilityRole="button"
      >
        <Text style={styles.nextButtonText}>Tiếp Theo</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default FoodCalculator;