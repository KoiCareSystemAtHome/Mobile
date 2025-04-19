import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Card, Provider, Toast } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fishByOwnerSelector, pondByOwnerSelector } from "../../redux/selector";
import { getFishByOwner } from "../../redux/slices/fishSlice";
import { loadAsync } from "expo-font";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import AntDesign from "react-native-vector-icons/AntDesign";

const FishStatistic = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const pondData = useSelector(pondByOwnerSelector);
  const fishData = useSelector(fishByOwnerSelector);
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(fishData?.length / itemsPerPage);
  const paginatedFishData = fishData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      dispatch(getFishByOwner(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
      Toast.config({ duration: 2 });
    };
    loadFontAsync();
  }, []);

  const onRefresh = async () => {
    if (isLoggedIn?.id) {
      setRefreshing(true);
      try {
        await Promise.all([
          dispatch(getPondByOwner(isLoggedIn.id)).unwrap(),
          dispatch(getFishByOwner(isLoggedIn.id)).unwrap(),
        ]);
        Toast.success("Data refreshed successfully");
      } catch (error) {
        console.error("Error refreshing data:", error);
        Toast.fail("Failed to refresh data");
      } finally {
        setRefreshing(false);
      }
    }
  };


  const renderFishCard = ({ item }) => {
    const latestReport =
      item.fishReportInfos?.length > 0
        ? item.fishReportInfos.reduce((latest, current) =>
            new Date(current.calculatedDate) > new Date(latest.calculatedDate)
              ? current
              : latest
          )
        : null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("FishDetail", { fish: item })}
      >
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              source={
                item.image === null || item.image === "string"
                  ? require("../../assets/defaultkoi.jpg")
                  : { uri: item.image }
              }
              style={styles.fishImage}
            />
            <View style={styles.fishInfo}>
              <View style={styles.infoHeader}>
                <Text style={styles.fishName}>{item.name}</Text>
                <FontAwesome
                  name={item.gender === "male" ? "mars" : "venus"}
                  size={20}
                  color="#0077B6"
                  style={styles.genderIcon}
                />
              </View>
              <Text style={styles.fishDetail}>
                <Text style={styles.label}>Giống: </Text>
                {item.variety.varietyName}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.fishDetail}>
                  <Text style={styles.label}>Tuổi: </Text>
                  {item.age} năm
                </Text>
                <Text style={styles.fishDetail}>
                  <Text style={styles.label}>Dài: </Text>
                  {latestReport ? latestReport.size : "N/A"} cm
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Thống Kê Cá</Text>
            <View style={{ width: 24 }} />
          </View>
          <FlatList
            data={paginatedFishData}
            renderItem={renderFishCard}
            keyExtractor={(item) => item?.koiID}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#0077B6"]}
                tintColor="#0077B6"
              />
            }
          />
          {fishData?.length > 0 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.disabledButton,
                ]}
                onPress={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <AntDesign name="left" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.pageText}>
                {currentPage} / {totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <AntDesign name="right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.footer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{fishData?.length} Cá</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddFish")}
            >
              <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default FishStatistic;