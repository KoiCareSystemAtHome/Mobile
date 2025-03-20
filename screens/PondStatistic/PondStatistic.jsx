import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Provider,
  Toast,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "../../redux/slices/testSlice";
import { pondByOwnerSelector, testDataSelector } from "../../redux/selector";
import { styles } from "./styles";
import { createPond, getPondByOwner } from "../../redux/slices/pondSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../redux/slices/authSlice";
import { loadAsync } from "expo-font";
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of ponds per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(pondData?.length / itemsPerPage);

  // Slice the pondData array to show only the current page's items
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
          <Image source={{ uri: item.image }} style={styles.pondImage} />
          <View style={styles.pondInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.pondText}>
                <Text style={styles.label}>Name: </Text>
                {item.name} {" "}
              </Text>
              <Text style={styles.pondText}>
                <Text style={styles.label}>
                  {item?.fish?.length}{" "}
                  <FontAwesome5 name="fish" size={25} />
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const onFinish = (values) => {
    const createDate = dayjs().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let image = "string";
    const ownerId = isLoggedIn?.id;
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
          console.log(response);
          Toast.success("Pond Added Successfully");
          dispatch(getPondByOwner(isLoggedIn.id)); // Refresh pond data
          form.resetFields();
          setTimeout(() => {
            setModalVisible(false);
          });
        } else {
          Toast.fail("Failed to add pond");
          setModalVisible(false);
        }
      });
    setModalVisible(false); // Close modal after submission
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct format for Expo 49+
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split(".").pop();
      const fileMimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

      let formData = new FormData();
      formData.append("filene", {
        uri: uri,
        name: `image.${fileType}`,
        type: fileMimeType,
      });

      setImageBlob(uri);
      try {
        const response = await dispatch(getImage(formData)).unwrap();
        if (response) {
          setUploadResponse(response);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
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

  // Pagination controls
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
          <Text style={styles.title}>Pond Statistic</Text>

          <FlatList
            data={paginatedPondData} // Use paginated data instead of pondData
            renderItem={renderPondCard}
            keyExtractor={(item) => item.pondID}
            contentContainerStyle={styles.listContent}
          />

          {/* Pagination Controls */}
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
                <Text style={styles.paginationText}>Previous</Text>
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
                <Text style={styles.paginationText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {pondData?.length} {`Pond${pondData?.length > 1 ? "s" : ""}`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Pond</Text>
              </View>

              {imageBlob ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: uploadResponse }}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.changeImageButton}
                    onPress={handleImagePick}
                  >
                    <Text style={styles.changeImageText}>Change Picture</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={handleImagePick}
                >
                  <Text style={styles.imageButtonText}>
                    Tap To Select Image
                  </Text>
                </TouchableOpacity>
              )}

              {/* Form Fields */}
              <Form form={form} onFinish={onFinish} style={styles.form}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please enter the pond name" },
                  ]}
                >
                  <Input placeholder="Pond Name" style={styles.input} />
                </Form.Item>

                <View style={styles.modalFooter}>
                  <Button
                    style={styles.modalCancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    style={styles.modalSaveButton}
                    onPress={() => form.submit()}
                  >
                    Save
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