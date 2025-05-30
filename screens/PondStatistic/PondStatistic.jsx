import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl,
} from "react-native";
import {
  Button,
  Card,
  Form,
  Input,
  Provider,
  Toast,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { pondByOwnerSelector } from "../../redux/selector";
import { styles } from "./styles";
import { createPond, getPondByOwner } from "../../redux/slices/pondSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../redux/slices/authSlice";
import { loadAsync } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
dayjs.extend(utc);

const PondStatistic = ({ navigation }) => {
  const [form] = Form.useForm();
  const pondData = useSelector(pondByOwnerSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(pondData?.length / itemsPerPage);
  const paginatedPondData = pondData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const dispatch = useDispatch();

  const renderPondCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PondDetail", { pond: item })}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require("../../assets/defaultpond.jpg")
            }
            style={styles.pondImage}
          />
          <View style={styles.pondInfo}>
            <Text style={styles.pondName}>{item.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.pondDetail}>
                {item?.fishAmount}{" "}
                <FontAwesome5 name="fish" size={16} color="#0077B6" />
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor:
                  item.status === "Danger"
                    ? "#EF4444" // Red for Danger
                    : item.status === "Warning"
                    ? "#FBBF24" // Yellow for Warning
                    : "#10B981", // Green for Normal
              },
            ]}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (isLoggedIn?.id) {
        await dispatch(getPondByOwner(isLoggedIn.id)).unwrap();
        Toast.success("Data refreshed successfully");
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      Toast.fail("Failed to refresh data");
    } finally {
      setRefreshing(false);
    }
  };

  const onFinish = (values) => {
    const createDate = dayjs().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let image = "string";
    const ownerId = isLoggedIn?.id;
    values.maxVolume = Number(values.maxVolume);
    if (uploadResponse) {
      image = uploadResponse;
    }
    const requirementPondParam = [
      {
        historyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        value: 0,
      },
    ];
    values = { ...values, ownerId, createDate, image, requirementPondParam };
    dispatch(createPond(values))
      .unwrap()
      .then((response) => {
        if (response?.status === "201") {
          Toast.success("Ao Đã Được Thêm Thành Công");
          dispatch(getPondByOwner(isLoggedIn.id));
          form.resetFields();
          setImageBlob(null);
          setUploadResponse(null);
          setModalVisible(false);
        } else {
          Toast.fail("Thêm Ao Thất Bại");
        }
      })
      .catch((error) => {
        console.error("Create pond error:", error);
        Toast.fail("Thêm Ao Thất Bại");
      });
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.fail("Cần quyền truy cập thư viện ảnh!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split(".").pop();
      const fileMimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

      let formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: `image.${fileType}`,
        type: fileMimeType,
      });

      setImageBlob(uri);
      setIsImageUploading(true);
      try {
        const response = await dispatch(getImage(formData)).unwrap();
        if (response) {
          setUploadResponse(response.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
        Toast.fail("Tải ảnh thất bại");
      } finally {
        setIsImageUploading(false);
      }
    }
  };

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
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
      Toast.config({ duration: 2 });
    };
    loadFontAsync();
  }, []);

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
    <Provider>
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
            <Text style={styles.title}>Thống Kê Ao</Text>
            <View style={{ width: 24 }} />
          </View>

          <FlatList
            data={paginatedPondData}
            renderItem={renderPondCard}
            keyExtractor={(item) => item.pondID}
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

          {pondData?.length > 0 && (
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
              <Text style={styles.badgeText}>{pondData?.length} Ao</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.modalCancelButton}
                >
                  <AntDesign name="close" size={24} color="#EF4444" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Thêm Ao Mới</Text>
                <View style={{ width: 24 }} />
              </View>

              {imageBlob ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: uploadResponse || imageBlob }}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.changeImageButton}
                    onPress={handleImagePick}
                  >
                    <Text style={styles.changeImageText}>Thay Đổi Ảnh</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={handleImagePick}
                >
                  <FontAwesome name="image" size={24} color="#0077B6" />
                  <Text style={styles.imageButtonText}>Chọn Hình Ảnh</Text>
                </TouchableOpacity>
              )}

              <Form form={form} onFinish={onFinish} style={styles.form}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên ao" }]}
                >
                  <Input
                    placeholder="Tên Ao"
                    style={styles.input}
                    placeholderTextColor="#A0AEC0"
                  />
                </Form.Item>

                <Form.Item
                  name="maxVolume"
                  rules={[
                    { required: true, message: "Vui lòng nhập lượng nước" },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Lượng nước phải là số",
                    },
                  ]}
                >
                  <Input
                    keyboardType="numeric"
                    placeholder="Lượng Nước Tối Đa (ml)"
                    style={styles.input}
                    placeholderTextColor="#A0AEC0"
                  />
                </Form.Item>

                <View style={styles.modalFooter}>
                  <Button
                    style={styles.modalCancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    style={styles.modalSaveButton}
                    onPress={() => form.submit()}
                    disabled={isImageUploading}
                    loading={isImageUploading}
                  >
                    Lưu
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Provider>
  );
};

export default PondStatistic;
