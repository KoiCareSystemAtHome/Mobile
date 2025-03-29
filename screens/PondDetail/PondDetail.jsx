import {
  Card,
  Form,
  Button,
  Input,
  Modal,
  Provider,
} from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import WaterParametersChart from "./components/WaterParameterChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getPondByID,
  getPondByOwner,
  updatePond,
} from "../../redux/slices/pondSlice";
import { getProduct } from "../../redux/slices/productSlice";
import { pondByIdSelector, productSelector } from "../../redux/selector";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../redux/slices/authSlice"; // Assuming this is available
import AsyncStorage from "@react-native-async-storage/async-storage";

const PondDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const pondById = useSelector(pondByIdSelector);
  const products = useSelector(productSelector);
  const { pond } = route.params;
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageBlob, setImageBlob] = useState(pond?.image);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();

  const transformPondParameters = (pondParameters) => {
    if (!pondParameters || !Array.isArray(pondParameters)) return [];
    const dataMap = {};
    pondParameters.forEach((param) => {
      param.valueInfors.forEach((valueInfo) => {
        const dateKey = valueInfo.caculateDay;
        if (!dataMap[dateKey]) {
          dataMap[dateKey] = { calculatedDate: dateKey };
        }
        dataMap[dateKey][param.parameterName] = valueInfo.value;
      });
    });

    return Object.values(dataMap);
  };

  console.log(products)

  const waterParameterData = transformPondParameters(pondById?.pondParameters);
  const parameters =
    pondById?.pondParameters?.map((param) => param.parameterName) || [];

  const recommendedProducts =
    pondById?.recomment?.map((rec) => {
      const product = products?.find(
        (prod) => prod?.productId === rec.productid
      );
      return (
        product || {
          productId: rec.productid,
          productName: "Sản Phẩm Không Xác Định",
        }
      );
    }) || [];

  const toggleParameter = (parameter) => {
    if (selectedParameters.includes(parameter)) {
      setSelectedParameters(
        selectedParameters.filter((param) => param !== parameter)
      );
    } else {
      setSelectedParameters([...selectedParameters, parameter]);
    }
  };

  useEffect(() => {
    dispatch(getPondByID(pond?.pondID));
    dispatch(getProduct());
  }, [dispatch, pond?.pondID]);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const parameterRows = chunkArray(parameters, 3);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để thực hiện điều này!"
      );
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
      try {
        const response = await dispatch(getImage(formData)).unwrap();
        if (response) {
          setUploadResponse(response.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const onFinish = (values) => {
    const pondID = pondById?.pondID;
    const name = values.name;
    const image = uploadResponse;
    const createDate = pondById?.createDate + "Z";
    const ownerId = pondById?.ownerId;

    const requirementPondParam = [];

    console.log(createDate);
    const updatedPond = {
      pondID,
      name,
      image,
      createDate,
      ownerId,
      maxVolume: 1,
      requirementPondParam,
    };

    console.log(updatedPond);

    dispatch(updatePond(updatedPond))
      .unwrap()
      .then((res) => {
        dispatch(getPondByOwner(isLoggedIn.id));
        setModalVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Failed to update pond:", error);
      });
  };

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

  console.log(recommendedProducts)

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Chi Tiết Ao</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: pond.image }} style={styles.pondImage} />
                <View style={styles.pondInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.pondText}>
                      <Text style={styles.label}>Tên: </Text>
                      {pond.name}
                    </Text>
                  </View>
                  <Text style={styles.pondText}>
                    <Text style={styles.label}>Số Cá: </Text>5
                  </Text>
                  <Text style={styles.pondText}>
                    <Text style={styles.label}>Dung Tích: </Text>
                    {pond.volume} l
                  </Text>
                  <Text style={styles.pondText}>
                    <Text style={styles.label}>Độ Sâu: </Text>1 m
                  </Text>
                  <Text style={styles.pondText}>
                    <Text style={styles.label}>Công Suất Bơm: </Text>20,000 l/h
                  </Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <FontAwesome
                      name="pencil-square-o"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>

          <View style={styles.parametersContainer}>
            <Text style={styles.sectionTitle}>Thông Số Nước</Text>
            {parameterRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.parametersRow}>
                {row.map((param) => (
                  <TouchableOpacity
                    key={param}
                    onPress={() => toggleParameter(param)}
                    style={[
                      styles.parameterCard,
                      {
                        backgroundColor: selectedParameters.includes(param)
                          ? "#FFD29D"
                          : styles.parameterCard.backgroundColor,
                      },
                    ]}
                  >
                    <Text style={styles.parameterLabel}>{param}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.statisticsContainer}>
            <View style={styles.statisticCard}>
              <View style={styles.statisticsRow}>
                <Text style={styles.sectionTitle}>Thống Kê Ao</Text>
                <View style={styles.statisticsRow}>
                  <Text style={styles.statisticsLabel}>Tháng Này</Text>
                  <TouchableOpacity>
                    <Text style={styles.statisticsDropdown}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <WaterParametersChart
                selectedParameters={selectedParameters}
                waterParameterData={waterParameterData}
              />
            </View>
          </View>

          <View style={styles.suggestedContainer}>
            <Text style={styles.sectionTitle}>Sản Phẩm Đề Xuất</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            >
              {pondById?.recomment?.length > 0 &&
                recommendedProducts?.map((item) => (
                  <TouchableOpacity
                    key={item.productId}
                    style={styles.productCard}
                  >
                    <Image
                      source={{
                        uri: item.image || "https://via.placeholder.com/128",
                      }}
                      style={styles.productImage}
                    />
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.productPrice}>
                      {item.price || "N/A"} VND
                    </Text>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => {
                        navigation.navigate("ProductDetail", {
                          product: item.product,
                        });
                      }}
                    >
                      <Text style={styles.addToCartText}>Thêm Vào Giỏ</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
            style={styles.modal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Chỉnh Sửa Ao</Text>
                </View>

                {imageBlob ? (
                  <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleImagePick}>
                      <Image
                        source={{ uri: uploadResponse || pond.image }}
                        style={styles.selectedImage}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={handleImagePick}
                  >
                    <Text style={styles.imageButtonText}>
                      Chạm Để Chọn Hình Ảnh
                    </Text>
                  </TouchableOpacity>
                )}

                <Form form={form} onFinish={onFinish} style={styles.form}>
                  <Form.Item
                    name="name"
                    initialValue={pond.name}
                    rules={[
                      { required: true, message: "Vui lòng nhập tên ao" },
                    ]}
                  >
                    <Input placeholder="Tên Ao" style={styles.input} />
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
                    >
                      Lưu
                    </Button>
                  </View>
                </Form>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default PondDetail;
