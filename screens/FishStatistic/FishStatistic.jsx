import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
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


  const renderFishCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FishDetail", { fish: item })}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={item.image ? { uri: item.image } : require('../../assets/defaultkoi.jpg')} style={styles.fishImage} />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <FontAwesome
              name={item.gender === "male" ? "mars" : "venus"}
              size={20}
              color="#6497B1"
              style={{ paddingRight: 20, marginTop: 5 }}
            />
          </View>
          <View style={styles.fishInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Tên: </Text>
                {item.name}
              </Text>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Giống: </Text>
                {item.variety.varietyName}{" "}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Tuổi: </Text>
                {item.age}
              </Text>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Chiều dài: </Text>
                {item.length}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

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
          <Text style={styles.title}>Thống Kê Cá</Text>
          <FlatList
            data={paginatedFishData}
            renderItem={renderFishCard}
            keyExtractor={(item) => item?.koiID}
            contentContainerStyle={styles.listContent}
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
                <Text style={styles.paginationText}>
               <AntDesign name="left" size={20} color="black" />
             </Text>
              </TouchableOpacity>
              <Text style={styles.pageText}>
                {currentPage}/{totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                onPress={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationText}>
               <AntDesign name="right" size={20} color="black" />
             </Text>
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
