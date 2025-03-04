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
import { pondByOwnerSelector } from "../../redux/selector";
import Icon from "react-native-vector-icons/AntDesign";

const SaltCalculator = () => {
  const dispatch = useDispatch();

  const pondData = useSelector(pondByOwnerSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentConcentration, setCurrentConcentration] = useState(0.09);
  const [desiredConcentration, setDesiredConcentration] = useState(0.31);
  const [waterChange, setWaterChange] = useState(8);
  const pondVolume = 80; // Example volume in liters

  // Calculate required salt amounts
  const calculateSalt = () => {
    const saltNeeded =
      ((desiredConcentration - currentConcentration) / 100) * pondVolume;
    const waterChangeSalt =
      (waterChange / 100) * pondVolume * (desiredConcentration / 100);
    return {
      totalSalt: saltNeeded.toFixed(2),
      waterChangeSalt: waterChangeSalt.toFixed(2),
    };
  };

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
      dispatch(getPondByID(homePond?.pondID));
    }
  }, [homePond, dispatch]);


  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.card}>
          <Text style={styles.label}>
            Pond volume: <Text style={styles.value}>80L</Text>
          </Text>
          <Text style={styles.label}>
            Current concentration:{" "}
            <Text style={styles.value}>{currentConcentration}%</Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={currentConcentration}
            onValueChange={setCurrentConcentration}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#007AFF"
          />
        </View>

        {/* Desired Concentration */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Desired Concentration:{" "}
            <Text style={styles.value}>{desiredConcentration}%</Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={desiredConcentration}
            onValueChange={setDesiredConcentration}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#007AFF"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Water change:{" "}
            <Text style={styles.value}>
              {waterChange}L ({((waterChange / pondVolume) * 100).toFixed(0)}%)
            </Text>
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={pondVolume}
            step={1}
            value={waterChange}
            onValueChange={setWaterChange}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#007AFF"
          />
        </View>

        {/* Salt Amount Display */}
        <View style={styles.saltBox}>
          <Text style={styles.saltText}>Amount of salt: {totalSalt}kg</Text>
          <Text style={styles.saltText}>
            Amount of salt (water change): {waterChangeSalt}kg
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SaltCalculator;
