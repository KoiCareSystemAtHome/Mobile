import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import {
  Card,
  Provider,
  Picker,
  Input,
  Button,
  Toast,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import GrowthChart from "./components/GrowthChart";
import HealthStatusForm from "./components/HealthStatusForm/HealthStatusForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fishByIdSelector,
  profileByFishSelector,
  productSelector,
} from "../../redux/selector";
import {
  addFishNote,
  getFishById,
  getFishByOwner,
  getKoiProfile,
  updateFish,
} from "../../redux/slices/fishSlice";
import { getProduct } from "../../redux/slices/productSlice";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FishDetail = ({ route, navigation }) => {
  const { fish } = route.params;
  const dispatch = useDispatch();
  const fishById = useSelector(fishByIdSelector);
  const koiProfile = useSelector(profileByFishSelector) || []; // Default to empty array
  const products = useSelector(productSelector) || [];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);
  const [isNoteModalVisible, setNoteModalVisible] = useState(false);
  const [isGrowthModalVisible, setGrowthModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(fish.notes || []);
  const [newSize, setNewSize] = useState("");
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    if (fish?.koiID) {
      dispatch(getFishById(fish.koiID));
      dispatch(getKoiProfile(fish.koiID));
      dispatch(getProduct());
    }
  }, [fish, dispatch]);

  useEffect(() => {
    if (Array.isArray(koiProfile) && koiProfile.length > 0 && !selectedProfile) {
      setSelectedProfile(koiProfile[0].koiDiseaseProfileId);
    }
  }, [koiProfile, selectedProfile]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, []);

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
        </View>
      </View>
    );
  };

  const handleAddNote = () => {
    const koiId = fish.koiID;
    const note = newNote;
    const value = { koiId, note };
    dispatch(addFishNote(value))
      .unwrap()
      .then((res) => {
        if (res === true || res === "true") {
          setNotes([...notes, note]);
          setNewNote("");
          setNoteModalVisible(false);
          dispatch(getFishByOwner(isLoggedIn?.id));
        } else {
          Toast.fail("Failed to add note");
        }
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        Toast.fail("Failed to add note");
      });
  };

  const handleAddGrowth = () => {
    if (newSize.trim() && newWeight.trim()) {
      const koiID = fish.koiID;
      const name = fish.name;
      const pondID = fish.pond.pondID;
      const physique = fishById?.physique || fish.physique;
      const sex = fish.sex;
      const breeder = fishById?.breeder || fish.breeder;
      const age = fish.age;
      const varietyName = fish.variety.varietyName;
      const inPondSince = (fishById?.inPondSince || fish.inPondSince) + "Z";
      const image = fish.image;
      const price = fish.price;
      const size = Number(newSize);
      const weight = Number(newWeight);
      const value = {
        koiID,
        pondID,
        name,
        physique,
        sex,
        breeder,
        age,
        varietyName,
        inPondSince,
        image,
        price,
        size,
        weight,
      };
      dispatch(updateFish(value))
        .unwrap()
        .then((res) => {
          if (res.status === "200") {
            Toast.success("Fish Updated Successfully");
            navigation.goBack();
            dispatch(getFishByOwner(isLoggedIn?.id));
          } else {
            Toast.fail("Failed to update fish");
          }
        })
        .catch((error) => {
          console.error("Error updating fish:", error);
          Toast.fail("Failed to update fish");
        });
    }
  };

  const renderNotes = () => {
    if (!notes || notes.length === 0) {
      return (
        <Text style={styles.noteText}>
          Bạn chưa thêm bất kỳ ghi chú nào. Vui lòng thêm ghi chú mới bằng cách
          chạm vào biểu tượng dấu cộng ở góc trên bên phải của phần này.
        </Text>
      );
    }
    return notes.map((note, index) => (
      <Text key={index} style={styles.noteText}>
        - {note}
      </Text>
    ));
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
                {Array.isArray(koiProfile) && koiProfile.length > 0 ? (
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
                ) : (
                  <Text>Chưa có hồ sơ sức khỏe</Text>
                )}
              </View>
            </View>
            <HealthStatusForm
              fishId={fish.koiID}
              visible={isHealthModalVisible}
              onClose={() => setHealthModalVisible(false)}
              onSubmit={handleHealthRecordSubmit}
            />
            {Array.isArray(koiProfile) && koiProfile.length > 0 ? (
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
              <TouchableOpacity onPress={() => setGrowthModalVisible(true)}>
                <FontAwesome name="plus" size={18} color="#6497B1" />
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <GrowthChart fishReportInfos={fish?.fishReportInfos} />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Ghi Chú</Text>
              <TouchableOpacity onPress={() => setNoteModalVisible(true)}>
                <FontAwesome name="plus" size={18} color="#6497B1" />
              </TouchableOpacity>
            </View>
            {renderNotes()}
          </View>
        </ScrollView>

        {/* Note Modal */}
        <Modal
          visible={isNoteModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setNoteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Thêm Ghi Chú</Text>
              </View>
              <Input
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder="Nhập ghi chú"
                value={newNote}
                onChangeText={setNewNote}
                multiline={true}
                numberOfLines={4}
              />
              <View style={styles.modalFooter}>
                <Button
                  style={{ marginRight: 10 }}
                  onPress={() => setNoteModalVisible(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onPress={handleAddNote}
                  disabled={!newNote.trim()}
                >
                  Lưu
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Growth Modal */}
        <Modal
          visible={isGrowthModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setGrowthModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Thêm Bản Ghi Tăng Trưởng</Text>
              </View>
              <Input
                style={[
                  styles.input,
                  { height: 55, textAlignVertical: "top", marginBottom: 10 },
                ]}
                placeholder="Kích thước (cm)"
                value={newSize}
                onChangeText={setNewSize}
                keyboardType="numeric"
              />
              <Input
                style={[styles.input, { height: 55, textAlignVertical: "top" }]}
                placeholder="Cân nặng (kg)"
                value={newWeight}
                onChangeText={setNewWeight}
                keyboardType="numeric"
              />
              <View style={styles.modalFooter}>
                <Button
                  style={{ marginRight: 10 }}
                  onPress={() => setGrowthModalVisible(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onPress={handleAddGrowth}
                  disabled={!newSize.trim() || !newWeight.trim()}
                >
                  Lưu
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Provider>
  );
};

export default FishDetail;