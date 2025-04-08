import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Provider, Picker } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import GrowthChart from "./components/GrowthChart";
import HealthStatusForm from "./components/HealthStatusForm/HealthStatusForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fishByIdSelector,
  profileByFishSelector,
  productSelector,
} from "../../redux/selector";
import { getFishById, getKoiProfile } from "../../redux/slices/fishSlice";
import { getProduct } from "../../redux/slices/productSlice";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";

const FishDetail = ({ route, navigation }) => {
  const { fish } = route.params;
  const dispatch = useDispatch();
  const fishById = useSelector(fishByIdSelector);
  const koiProfile = useSelector(profileByFishSelector) || []; // Default to empty array
  const products = useSelector(productSelector) || []; // Default to empty array for products
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    if (fish?.koiID) {
      dispatch(getFishById(fish.koiID));
      dispatch(getKoiProfile(fish.koiID));
      dispatch(getProduct());
    }
  }, [fish, dispatch]);

  useEffect(() => {
    // Set initial selected profile to the first one if available
    if (koiProfile.length > 0 && !selectedProfile) {
      setSelectedProfile(koiProfile[0].koiDiseaseProfileId);
    }
  }, [koiProfile, selectedProfile]);

  const handleHealthRecordSubmit = (values) => {
    console.log("Health Record Submitted:", values);
  };

  const getMedicineName = (medicineId) => {
    const product = products.find((p) => p.productId === medicineId);
    return product?.productName || "Không xác định";
  };

  const renderHealthCard = (profile) => {
    if (!profile) return <Text>Không có dữ liệu hồ sơ sức khỏe</Text>;

    const statusText = profile.status === 0 ? "Ốm" : "Khỏe mạnh";
    const treatmentText =
      profile.status === 0
        ? `Sử dụng ${getMedicineName(profile.medicineId)} để chữa trị`
        : "Không cần điều trị";

    return (
      <View style={styles.card}>
        <View>
          <Image source={{ uri: fish.image }} style={styles.cardImage} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDate}>
            {new Date(profile.createddate).toLocaleDateString()}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            Tình trạng tổng quát: {statusText}
          </Text>
          <Text>Điều trị: {treatmentText}</Text>
          {profile.note && <Text>Ghi chú: {profile.note}</Text>}
          {/* {profile.symptoms && (
            <Text>
              Triệu chứng: {JSON.parse(profile.symptoms)[0].SymptomID}
            </Text>
          )} */}
        </View>
      </View>
    );
  };

  return (
    <Provider locale={enUS}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Text style={styles.title}>Chi Tiết Cá</Text>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: fish.image }} style={styles.fishImage} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.headerTop}>
                <Text style={[styles.name, { fontWeight: "bold" }]}>
                  {fish.name}
                </Text>
                <TouchableOpacity style={styles.editIcon}>
                  <FontAwesome
                    onPress={() => navigation.navigate("EditFish", { fish })}
                    name="edit"
                    size={30}
                    color="#6497B1"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.variety}>{fish.variety.varietyName}</Text>
              <Text style={styles.price}>100 USD</Text>
              <View style={styles.infoRow}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Tuổi</Text>
                  <Text style={styles.infoValue}>{fish.age}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>C.dài</Text>
                  <Text style={styles.infoValue}>{fish.length}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>C.nặng</Text>
                  <Text style={styles.infoValue}>4.33 g</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Tình trạng: Khỏe mạnh</Text>
          </View>

          <View style={styles.section}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> đã bơi
              trong ao{" "}
              <Text style={{ fontWeight: "bold" }}>"{fish.pond.name}"</Text> từ{" "}
              <Text style={{ fontWeight: "bold" }}>10.10.2018</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> được mua
              với giá{" "}
              <Text style={{ fontWeight: "bold" }}>{fish.price} VND</Text> và
              được lai tạo bởi{" "}
              <Text style={{ fontWeight: "bold" }}>
                {fish.variety.varietyName}
              </Text>
              .
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Tình Trạng Sức Khỏe</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SymptomScreen")}
                >
                  <FontAwesome
                    name="plus"
                    size={18}
                    color="#6497B1"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Picker
                  data={koiProfile.map((profile) => ({
                    value: profile.koiDiseaseProfileId,
                    label: new Date(profile.createddate).toLocaleDateString(),
                  }))}
                  cols={1}
                  value={selectedProfile}
                  onChange={(value) => setSelectedProfile(value)}
                  style={{ width: 120 }}
                >
                  <TouchableOpacity>
                    <FontAwesome name="caret-down" size={18} color="#6497B1" />
                  </TouchableOpacity>
                </Picker>
              </View>
            </View>
            <HealthStatusForm
              fishId={fish.koiID}
              visible={isHealthModalVisible}
              onClose={() => setHealthModalVisible(false)}
              onSubmit={handleHealthRecordSubmit}
            />
            {koiProfile.length > 0 ? (
              renderHealthCard(
                koiProfile.find(
                  (p) => p.koiDiseaseProfileId === selectedProfile
                ) || koiProfile[0]
              )
            ) : (
              <Text>Chưa có hồ sơ sức khỏe nào</Text>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Lịch Sử Tăng Trưởng</Text>
              <TouchableOpacity>
                <FontAwesome name="plus" size={18} color="#6497B1" />
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <GrowthChart fishReportInfos={fish?.fishReportInfos} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default FishDetail;