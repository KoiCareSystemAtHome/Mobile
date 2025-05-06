import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Card, Provider, Toast } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userWithdrawalSelector } from "../../redux/selector";
import { loadAsync } from "expo-font";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getUserWithdraw } from "../../redux/slices/transactionSlice";

const WithdrawalStatistic = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const withdrawalData = useSelector(userWithdrawalSelector);
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(withdrawalData?.length / itemsPerPage);
  const paginatedWithdrawalData = withdrawalData?.slice(
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
      dispatch(getUserWithdraw(isLoggedIn.id));
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
        await dispatch(getUserWithdraw(isLoggedIn.id)).unwrap();
        Toast.success("Dữ liệu đã được làm mới thành công");
      } catch (error) {
        console.error("Lỗi khi làm mới dữ liệu:", error);
        Toast.fail("Không thể làm mới dữ liệu");
      } finally {
        setRefreshing(false);
      }
    }
  };

  const renderWithdrawalCard = ({ item }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const translateStatus = (status) => {
      switch (status) {
        case "Pending":
          return "Đang chờ";
        case "Approved":
          return "Đã duyệt";
        case "Rejected":
          return "Bị từ chối";
        default:
          return status;
      }
    };

    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.withdrawalInfo}>
            <View style={styles.infoHeader}>
              <Text style={styles.withdrawalTitle}>Yêu cầu rút tiền {formatDate(item.createDate)}</Text>
              <FontAwesome
                name="money"
                size={20}
                color="#0077B6"
                style={styles.icon}
              />
            </View>
            <Text style={styles.withdrawalDetail}>
              <Text style={styles.label}>Số tiền: </Text>
              {item.money.toLocaleString("vi-VN")} VND
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.withdrawalDetail}>
                <Text style={styles.label}>Trạng thái: </Text>
                {translateStatus(item.status)}
              </Text>
              <Text style={styles.withdrawalDetail}>
                <Text style={styles.label}>Ngày: </Text>
                {formatDate(item.createDate)}
              </Text>
            </View>
          </View>
        </View>
      </Card>
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
            <Text style={styles.title}>Lịch Sử Rút Tiền</Text>
            <View style={{ width: 24 }} />
          </View>
          <FlatList
            data={paginatedWithdrawalData}
            renderItem={renderWithdrawalCard}
            keyExtractor={(item) => item.id}
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
          {withdrawalData?.length > 0 && (
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
              <Text style={styles.badgeText}>{withdrawalData?.length} Yêu cầu</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default WithdrawalStatistic;