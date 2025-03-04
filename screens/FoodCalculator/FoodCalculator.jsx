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

const FoodCalculator = () => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [food, setFood] = useState();

  // State for Desired Growth Toggle
  const [growth, setGrowth] = useState("Medium");
  const growthOptions = ["Low", "Medium", "High"];

  // State for Water Temperature Toggle
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
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Food Calculator</Text>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Select a Pond"}
            </Text>
            <Icon name="down" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          {homePondOpen && (
            <View style={styles.dropdown}>
              {pondData.map((item) => (
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
        {/* Desired Growth Toggle */}
        <Text style={styles.subtitle}>Desired Growth</Text>
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

        {/* Water Temperature Toggle */}
        <Text style={styles.subtitle}>Water Temperature</Text>
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

        {/* Feeding Information */}
        <Text style={styles.infoText}>
          The recommended amount of food should be split evenly into 3 - 5
          feedings per day. This way the koi will ingest the food better...
        </Text>

        {/* Recommended Amount */}
        <View style={styles.recommendationButton}>
          <Text style={styles.recommendationText}>
            {homePond ? `Recommended Amount: ${food}` : "Please Select A Pond"}
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default FoodCalculator;
