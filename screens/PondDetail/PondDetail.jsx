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
import AntDesign from "react-native-vector-icons/AntDesign";
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
import { getImage } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "@ant-design/react-native";

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
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);

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
      setIsImageChanged(true);
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

  const onFinish = (values) => {
    const pondID = pondById?.pondID;
    const name = values.name;
    const image = uploadResponse || pond.image;
    const createDate = pondById?.createDate + "Z";
    const ownerId = pondById?.ownerId;
    const maxVolume = Number(values.maxVolume);
    const requirementPondParam = [];
    const updatedPond = {
      pondID,
      name,
      image,
      createDate,
      ownerId,
      maxVolume,
      requirementPondParam,
    };

    dispatch(updatePond(updatedPond))
      .unwrap()
      .then((res) => {
        dispatch(getPondByOwner(isLoggedIn.id));
        setModalVisible(false);
        setImageBlob(updatedPond.image);
        setIsImageChanged(false);
        Toast.success("Cập nhật ao thành công");
      })
      .catch((error) => {
        console.error("Failed to update pond:", error);
        Toast.fail("Cập nhật ao thất bại");
      });
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Chi Tiết Ao</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Image
                source={
                  pond.image
                    ? { uri: pond.image }
                    : require("../../assets/defaultpond.jpg")
                }
                style={styles.pondImage}
              />
              <View
                style={[
                  styles.statusCircle,
                  {
                    backgroundColor:
                      pond.status === "Danger"
                        ? "#EF4444"
                        : pond.status === "Warning"
                        ? "#FBBF24"
                        : "#10B981",
                  },
                ]}
              />
              <View style={styles.pondInfo}>
                <Text style={styles.pondName}>{pond.name}</Text>
                <View style={styles.infoRow}>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Số Cá</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.infoValue}>{pond?.fishAmount}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("FishList", {
                            pondID: pond.pondID,
                            userId: isLoggedIn?.id,
                          })
                        }
                        disabled={pond?.fishAmount === 0}
                      >
                        <FontAwesome
                          name="eye"
                          size={16}
                          color={pond?.fishAmount === 0 ? "#ccc" : "#0077B6"}
                          style={{ marginLeft: 6 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Dung Tích</Text>
                    <Text style={styles.infoValue}>{pond.maxVolume} L</Text>
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      navigation.navigate("AddFish", {
                        pondID: pond.pondID,
                      })
                    }
                  >
                    <FontAwesome name="plus" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Thêm Cá</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <FontAwesome name="pencil" size={18} color="#fff" />
                    <Text style={styles.actionButtonText}>Chỉnh Sửa</Text>
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
                      selectedParameters.includes(param) &&
                        styles.parameterCardActive,
                    ]}
                  >
                    <Text style={styles.parameterLabel}>{param}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.statisticsContainer}>
            <Card style={styles.statisticCard}>
              <View style={styles.statisticsRow}>
                <Text style={styles.sectionTitle}>Thống Kê Ao</Text>
                <View style={styles.dropdownContainer}>
                  <Text style={styles.statisticsLabel}>Tháng Này</Text>
                  <FontAwesome name="caret-down" size={16} color="#4A5568" />
                </View>
              </View>
              <WaterParametersChart
                selectedParameters={selectedParameters}
                waterParameterData={waterParameterData}
                pondParameters={pondById?.pondParameters || []}
              />
            </Card>
          </View>

          <View style={styles.suggestedContainer}>
            <Text style={styles.sectionTitle}>Sản Phẩm Đề Xuất</Text>
            {recommendedProducts?.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
              >
                {recommendedProducts.map((item) => (
                  <TouchableOpacity
                    key={item.productId}
                    style={styles.productCard}
                    onPress={() =>
                      navigation.navigate("ProductDetail", { product: item })
                    }
                  >
                    <Image
                      source={{
                        uri: item.image || "https://via.placeholder.com/128",
                      }}
                      style={styles.productImage}
                    />
                    <Text style={styles.productName} numberOfLines={2}>
                      {item.productName}
                    </Text>
                    <Text style={styles.productPrice}>
                      {item.price
                        ? `${item.price.toLocaleString("vi-VN")} VND`
                        : "N/A"}
                    </Text>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() =>
                        navigation.navigate("ProductDetail", { product: item })
                      }
                    >
                      <Text style={styles.addToCartText}>Thêm Vào Giỏ</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noDataText}>Chưa có sản phẩm đề xuất</Text>
            )}
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
                        source={{ uri: uploadResponse || imageBlob }}
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
                    initialValue={pond?.name}
                    rules={[
                      { required: true, message: "Vui lòng nhập tên ao" },
                    ]}
                  >
                    <Input placeholder="Tên Ao" style={styles.input} />
                  </Form.Item>

                  <Form.Item
                    name="maxVolume"
                    initialValue={pond?.maxVolume.toString()}
                    rules={[
                      { required: true, message: "Vui lòng nhập dung tích" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                    ]}
                  >
                    <Input
                      keyboardType="numeric"
                      placeholder="Dung Tích (L)"
                      style={styles.input}
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
                      disabled={
                        isImageChanged && (!uploadResponse || isImageUploading)
                      }
                      loading={isImageUploading}
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
