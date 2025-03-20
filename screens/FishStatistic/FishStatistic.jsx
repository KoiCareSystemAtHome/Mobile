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
  ScrollView,
} from "react-native";
import {
  Button,
  Card,
  Form,
  Input,
  List,
  Picker,
  Provider,
  Toast,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fishByOwnerSelector, pondByOwnerSelector } from "../../redux/selector";
import DropDownPicker from "react-native-dropdown-picker";
import { createFish, getFishByOwner } from "../../redux/slices/fishSlice";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../redux/slices/authSlice";
import { loadAsync } from "expo-font";

const FishStatistic = ({ navigation }) => {
  const [form] = Form.useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const pondData = useSelector(pondByOwnerSelector);
  const fishData = useSelector(fishByOwnerSelector);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedPond, setSelectedPond] = useState(null);
  const [pondItems, setPondItems] = useState([]);
  const [imageBlob, setImageBlob] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of fish per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(fishData?.length / itemsPerPage);

  // Slice the fishData array to show only the current page's items
  const paginatedFishData = fishData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      dispatch(getFishByOwner(isLoggedIn.id));
    }
  }, [isLoggedIn?.id, dispatch]);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
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
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
      Toast.config({ duration: 2 });
    };

    loadFontAsync();
  }, []);

  const onFinish = (values) => {
    const pondID = selectedPond;
    let image = "string";
    values.age = Number(values?.age);
    values.length = Number(values?.length);
    values.weight = Number(values?.weight);
    values.price = Number(values?.price);
    values.physique = "string";
    values.inPondSince = "2025-02-06T14:31:50.654Z";
    if (uploadResponse) {
      image = uploadResponse;
    }
    const requirementFishParam = [
      {
        historyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        value: 0,
      },
    ];
    values = { ...values, pondID, requirementFishParam, image };
    dispatch(createFish(values))
      .unwrap()
      .then((response) => {
        if (response?.status === "201") {
          console.log(response);
          Toast.success("Fish Added Successfully");
          dispatch(getFishByOwner(isLoggedIn.id));
          form.resetFields();
          setTimeout(() => {
            setModalVisible(false);
          });
        } else {
          Toast.fail("Failed to add fish");
          setModalVisible(false);
        }
      });
  };

  useEffect(() => {
    if (pondData) {
      setPondItems(
        pondData.map((pond) => ({
          label: pond.name,
          value: pond.pondID,
        }))
      );
    }
  }, [pondData]);

  const renderFishCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FishDetail", { fish: item })}
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.image }} style={styles.fishImage} />
          <View style={styles.fishInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Name: </Text>
                {item.name}
              </Text>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Variety: </Text>
                {item.variety.varietyName}{" "}
                <FontAwesome
                  name={item.gender === "male" ? "mars" : "venus"}
                  size={20}
                  color="#6497B1"
                  style={{ paddingRight: 10 }}
                />
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Age: </Text>
                {item.age}
              </Text>
              <Text style={styles.fishText}>
                <Text style={styles.label}>Length: </Text>
                {item.length}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

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
          <Text style={styles.title}>Fish Statistic</Text>
          <FlatList
            data={paginatedFishData} // Use paginated data instead of fishData
            renderItem={renderFishCard}
            keyExtractor={(item) => item?.koiID}
            contentContainerStyle={styles.listContent}
          />
          {/* Pagination Controls */}
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
              <Text style={styles.badgeText}>{fishData?.length} Fish(s)</Text>
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
          <ScrollView>
            <View style={styles.modalOverlay}>
              <Form
                form={form}
                onFinish={onFinish}
                style={styles.modalContainer}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add New Koi</Text>
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

                <View style={styles.modalFields}>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Name:</Text>
                      <Form.Item name="name" style={styles.input}>
                        <Input placeholder="Name" />
                      </Form.Item>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Age:</Text>
                      <Form.Item name="age" style={styles.input}>
                        <Input placeholder="Age" />
                      </Form.Item>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Length:</Text>
                      <Form.Item name="length" style={styles.input} extra="cm">
                        <Input placeholder="Length" />
                      </Form.Item>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Weight:</Text>
                      <Form.Item name="weight" style={styles.input} extra="kg">
                        <Input placeholder="Weight" />
                      </Form.Item>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Sex:</Text>
                      <Form.Item name="sex" style={styles.input}>
                        <Input placeholder="Sex" />
                      </Form.Item>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Variety:</Text>
                      <Form.Item name="varietyName" style={styles.input}>
                        <Input placeholder="Variety" />
                      </Form.Item>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Condition:</Text>
                      <Form.Item name="condition" style={styles.input}>
                        <Input placeholder="Condition" />
                      </Form.Item>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>In Pond Since:</Text>
                      <Form.Item name="inPondSince" style={styles.input}>
                        <Input placeholder="In Pond Since" />
                      </Form.Item>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Breeder:</Text>
                      <Form.Item name="breeder" style={styles.input}>
                        <Input placeholder="Breeder" />
                      </Form.Item>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Purchase Price:</Text>
                      <Form.Item name="price" style={styles.input} extra="VND">
                        <Input placeholder="Purchase Price" />
                      </Form.Item>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputRow}>
                      <Text style={styles.inputLabel}>Pond:</Text>
                      <DropDownPicker
                        open={open}
                        value={selectedPond}
                        items={pondItems}
                        setOpen={setOpen}
                        setValue={setSelectedPond}
                        setItems={setPondItems}
                        containerStyle={styles.dropdownContainer}
                        style={styles.dropdown}
                        dropDownStyle={styles.dropdownBox}
                        placeholder="Select a Pond"
                        listMode="SCROLLVIEW"
                      />
                    </View>
                  </View>
                  <View style={styles.modalFooter}>
                    <TouchableOpacity
                      style={styles.modalCancelButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Button
                      type="ghost"
                      style={styles.modalSaveButton}
                      onPress={() => form.submit()}
                    >
                      <Text style={styles.modalSaveText}>Save</Text>
                    </Button>
                  </View>
                </View>
              </Form>
            </View>
          </ScrollView>
        </Modal>
      </ImageBackground>
    </Provider>
  );
};

export default FishStatistic;