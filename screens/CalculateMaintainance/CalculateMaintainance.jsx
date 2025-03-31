import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import {
  calculatedMaintainanceSelector,
  pondByOwnerSelector,
} from "../../redux/selector";
import {
  calculateMaintainance,
  saveMaintainance,
} from "../../redux/slices/reminderSlice";
import dayjs from "dayjs";

const CalculateMaintainance = () => {
  const dispatch = useDispatch();
  const pondData = useSelector(pondByOwnerSelector);
  const maintainanceData = useSelector(calculatedMaintainanceSelector);
  const [homePond, setHomePond] = useState(null);
  const [homePondOpen, setHomePondOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      const pondId = homePond?.pondID;
      dispatch(calculateMaintainance({ pondId }));
    }
  }, [homePond, dispatch]);

  const handleSave = () => {
    if (maintainanceData) {
      dispatch(saveMaintainance(maintainanceData))
        .unwrap()
        .then((res) => {
          if (res.message) {
            Alert.alert(res.message);
          }
        });
    }
  };
  console.log(maintainanceData);
  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Lịch Trình Bảo Trì</Text>

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setHomePondOpen(!homePondOpen)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {homePond ? homePond?.name : "Chọn một ao"}
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
        {homePond && maintainanceData && (
          <View>
            <Text style={styles.subtitle}>{maintainanceData?.title}</Text>
            <Text style={styles.selectorText}>
              {maintainanceData?.description}
            </Text>
            <Text style={styles.selectorText}>
              Bảo trì ngày:{" "}
              {dayjs(maintainanceData.maintainDate).format("ddd, D MMMM YYYY")}
            </Text>
          </View>
        )}
      </ScrollView>
      {homePond && maintainanceData && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export default CalculateMaintainance;
