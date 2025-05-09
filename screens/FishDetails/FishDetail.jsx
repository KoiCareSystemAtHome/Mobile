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
  pondByOwnerSelector,
} from "../../redux/selector";
import {
  addFishNote,
  getFishById,
  getFishByOwner,
  getKoiProfile,
  updateFish,
} from "../../redux/slices/fishSlice";
import { getProduct } from "../../redux/slices/productSlice";
import { getPondByOwner } from "../../redux/slices/pondSlice";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";

const FishDetail = ({ route, navigation }) => {
  const { fish } = route.params;
  const dispatch = useDispatch();
  const fishById = useSelector(fishByIdSelector);
  const koiProfile = useSelector(profileByFishSelector) || [];
  const products = useSelector(productSelector) || [];
  const pondData = useSelector(pondByOwnerSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);
  const [isNoteModalVisible, setNoteModalVisible] = useState(false);
  const [isGrowthModalVisible, setGrowthModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(fish.notes || []);
  const [newSize, setNewSize] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [openPondPicker, setOpenPondPicker] = useState(false);
  const [selectedPond, setSelectedPond] = useState(fish.pond.pondID);
  const [pondItems, setPondItems] = useState([]);
  const [tempPond, setTempPond] = useState(fish.pond.pondID);
  const latestReport =
    fish.fishReportInfos?.length > 0
      ? fish.fishReportInfos.reduce((latest, current) =>
          new Date(current.calculatedDate) > new Date(latest.calculatedDate)
            ? current
            : latest
        )
      : null;

  useEffect(() => {
    if (fish?.koiID) {
      dispatch(getFishById(fish.koiID));
      dispatch(getKoiProfile(fish.koiID));
      dispatch(getProduct());
    }
    if (isLoggedIn?.id) {
      dispatch(getPondByOwner(isLoggedIn.id));
    }
  }, [fish, dispatch, isLoggedIn?.id]);

  useEffect(() => {
    if (
      Array.isArray(koiProfile) &&
      koiProfile.length > 0 &&
      selectedProfile.length === 0
    ) {
      setSelectedProfile([koiProfile[0].koiDiseaseProfileId]);
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

  useEffect(() => {
    if (pondData) {
      const items = pondData.map((pond) => ({
        label: pond.name,
        value: pond.pondID,
      }));
      setPondItems(items);
      if (
        fish.pond.pondID &&
        items.some((item) => item.value === fish.pond.pondID)
      ) {
        setSelectedPond(fish.pond.pondID);
        setTempPond(fish.pond.pondID);
      }
    }
  }, [pondData, fish.pond.pondID]);

  const handleHealthRecordSubmit = (values) => {
    console.log("Health Record Submitted:", values);
  };

  const getMedicineName = (medicineId) => {
    const product = products.find((p) => p.productId === medicineId);
    return product?.productName || "Không xác định";
  };

  const handleUpdatePond = () => {
    if (!selectedPond) {
      Toast.fail("Vui lòng chọn một ao!");
      return;
    }
    const koiID = fish.koiID;
    const name = fish.name;
    const pondID = tempPond;
    const physique = fishById?.physique || fish.physique;
    const sex = fish.sex;
    const breeder = fishById?.breeder || fish.breeder;
    const age = fish.age;
    const varietyName = fish.variety.varietyName;
    const inPondSince = (fishById?.inPondSince || fish?.inPondSince) + "Z";
    const image = fish.image;
    const price = fish.price;
    const size = latestReport ? latestReport.size : fish.size;
    const weight = latestReport ? latestReport.weight : fish.weight;
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
          Toast.success("Cập nhật ao thành công");
          dispatch(getFishByOwner(isLoggedIn?.id));
          dispatch(getFishById(fish.koiID));
          dispatch(getPondByOwner(isLoggedIn?.id));
        } else {
          Toast.fail("Cập nhật ao thất bại");
        }
      })
      .catch((error) => {
        console.error("Error updating pond:", error);
        Toast.fail("Cập nhật ao thất bại");
      });
  };

  const handleConfirmPondChange = () => {
    setSelectedPond(tempPond);
    handleUpdatePond();
  };

  const renderHealthCard = (profile) => {
    if (!profile)
      return (
        <Text style={styles.noDataText}>Không có dữ liệu hồ sơ sức khỏe</Text>
      );

    const statusText = profile.status === 0 ? "Ốm" : "Khỏe mạnh";
    const treatmentText =
      profile.status === 0
        ? `Sử dụng ${getMedicineName(profile.medicineId)} để chữa trị`
        : "Không cần điều trị";

    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardDate}>
            {new Date(profile.endDate).toLocaleDateString("vi-VN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Tình trạng: </Text>
            {statusText}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Điều trị: </Text>
            {treatmentText}
          </Text>
          {profile.note && (
            <Text style={styles.cardText}>
              <Text style={styles.cardLabel}>Ghi chú: </Text>
              {profile.note}
            </Text>
          )}
        </View>
      </Card>
    );
  };

  // New function to get the latest health status
  const getLatestHealthStatus = () => {
    if (!Array.isArray(koiProfile) || koiProfile.length === 0) {
      return "Chưa có dữ liệu"; // Default if no profile exists
    }

    // Find the latest profile based on endDate
    const latestProfile = koiProfile.reduce((latest, current) =>
      new Date(current.endDate) > new Date(latest.endDate) ? current : latest
    );

    return latestProfile.status === 0 ? "Ốm" : "Khỏe mạnh";
  };

  console.log(fishById)

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
          Toast.success("Ghi chú đã được thêm");
        } else {
          Toast.fail("Thêm ghi chú thất bại");
        }
      })
      .catch((error) => {
        console.error("Error adding note:", error);
        Toast.fail("Thêm ghi chú thất bại");
      });
  };

  const handleAddGrowth = () => {
    if (newSize.trim() && newWeight.trim()) {
      const today = new Date().toISOString().split("T")[0];
      const hasRecordToday = fish.fishReportInfos?.some((report) => {
        const reportDate = new Date(report.calculatedDate)
          .toISOString()
          .split("T")[0];
        return reportDate === today;
      });

      if (hasRecordToday) {
        Toast.fail("Chỉ được thêm một bản ghi tăng trưởng mỗi ngày.");
        setNewSize("");
        setNewWeight("");
        setGrowthModalVisible(false);
        return;
      }

      const koiID = fish.koiID;
      const name = fish.name;
      const pondID = selectedPond;
      const physique = fishById?.physique || fish.physique;
      const sex = fish.sex;
      const breeder = fishById?.breeder || fish.breeder;
      const age = fish.age;
      const varietyName = fish.variety.varietyName;
      const inPondSince = (fishById?.inPondSince || fish?.inPondSince) + "Z";
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
            Toast.success("Cập nhật tăng trưởng thành công");
            setNewSize("");
            setNewWeight("");
            setGrowthModalVisible(false);
            dispatch(getFishByOwner(isLoggedIn?.id));
          } else {
            Toast.fail("Cập nhật tăng trưởng thất bại");
          }
        })
        .catch((error) => {
          console.error("Error updating fish:", error);
          Toast.fail("Cập nhật tăng trưởng thất bại");
        });
    }
  };

  const renderNotes = () => {
    if (!notes || notes.length === 0) {
      return (
        <Text style={styles.noDataText}>
          Chưa có ghi chú nào. Nhấn vào biểu tượng "+" để thêm ghi chú mới.
        </Text>
      );
    }
    return notes.map((note, index) => (
      <Text key={index} style={styles.noteText}>
        • {note}
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
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Chi Tiết Cá</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditFish", { fish })}
            >
              <FontAwesome name="edit" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <Image
              source={
                fish.image
                  ? { uri: fish.image }
                  : require("../../assets/defaultkoi.jpg")
              }
              style={styles.fishImage}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{fish.name}</Text>
              <Text style={styles.variety}>{fish.variety.varietyName}</Text>
              <Text style={styles.price}>
                {fish?.price?.toLocaleString("vi-VN")} VND
              </Text>
              <View style={[styles.pondPickerContainer, { position: "relative", zIndex: 3000 }]}>
                <DropDownPicker
                  open={openPondPicker}
                  value={tempPond}
                  items={pondItems}
                  setOpen={setOpenPondPicker}
                  setValue={(callback) => {
                    const newValue = callback(tempPond);
                    console.log("New tempPond value:", newValue);
                    setTempPond(newValue);
                  }}
                  setItems={setPondItems}
                  placeholder="Chọn một ao"
                  placeholderStyle={styles.dropdownPlaceholder}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  textStyle={styles.dropdownText}
                  listMode="SCROLLVIEW"
                  disableLocalSearch={true}
                  zIndex={3000}
                  zIndexInverse={4000}
                />
                <TouchableOpacity
                  style={[
                    styles.savePondButton,
                    tempPond === selectedPond && styles.savePondButtonDisabled,
                  ]}
                  onPress={handleConfirmPondChange}
                  disabled={tempPond === selectedPond}
                >
                  <Text style={styles.savePondButtonText}>Lưu Ao</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.infoRow, { zIndex: 1 }]}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Tuổi</Text>
                  <Text style={styles.infoValue}>{fish.age} ngày</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Chiều dài</Text>
                  <Text style={styles.infoValue}>
                    {latestReport ? latestReport.size : "N/A"} cm
                  </Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Cân nặng</Text>
                  <Text style={styles.infoValue}>
                    {latestReport ? latestReport.weight : "N/A"} kg
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông Tin Tổng Quan</Text>
            <Card style={styles.card}>
              <Text style={styles.sectionText}>
                <Text style={styles.sectionLabel}>Tình trạng: </Text>
                {getLatestHealthStatus()}
              </Text>
              <Text style={styles.sectionText}>
                <Text style={styles.sectionLabel}>Trong ao: </Text>
                {fish.pond.name} từ{" "}
                {new Date(fishById?.inPondSince).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.sectionText}>
                <Text style={styles.sectionLabel}>Lai tạo bởi: </Text>
                {fish.breeder}
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tình Trạng Sức Khỏe</Text>
              <View style={styles.sectionActions}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SymptomScreen")}
                  style={styles.actionButton}
                >
                  <FontAwesome name="plus" size={18} color="#0077B6" />
                </TouchableOpacity>
                {Array.isArray(koiProfile) && koiProfile.length > 0 && (
                  <Picker
                    data={koiProfile.map((profile) => ({
                      value: profile.koiDiseaseProfileId,
                      label: new Date(profile.endDate).toLocaleDateString(
                        "vi-VN",
                        { day: "numeric", month: "long", year: "numeric" }
                      ),
                    }))}
                    cols={1}
                    value={selectedProfile}
                    onChange={(value) => setSelectedProfile(value)}
                    style={styles.picker}
                  >
                    <TouchableOpacity style={styles.actionButton}>
                      <FontAwesome
                        name="caret-down"
                        size={18}
                        color="#0077B6"
                      />
                    </TouchableOpacity>
                  </Picker>
                )}
              </View>
            </View>
            {Array.isArray(koiProfile) && koiProfile.length > 0 ? (
              renderHealthCard(
                koiProfile.find(
                  (p) => p.koiDiseaseProfileId === selectedProfile[0]
                ) || koiProfile[0]
              )
            ) : (
              <Text style={styles.noDataText}>Chưa có hồ sơ sức khỏe nào</Text>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lịch Sử Tăng Trưởng</Text>
              <TouchableOpacity
                onPress={() => setGrowthModalVisible(true)}
                style={styles.actionButton}
              >
                <FontAwesome name="plus" size={18} color="#0077B6" />
              </TouchableOpacity>
            </View>
            <Card style={styles.card}>
              <GrowthChart fishReportInfos={fish?.fishReportInfos} />
            </Card>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ghi Chú</Text>
              <TouchableOpacity
                onPress={() => setNoteModalVisible(true)}
                style={styles.actionButton}
              >
                <FontAwesome name="plus" size={18} color="#0077B6" />
              </TouchableOpacity>
            </View>
            <Card style={styles.card}>{renderNotes()}</Card>
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
                <TouchableOpacity
                  onPress={() => setNoteModalVisible(false)}
                  style={styles.modalCancelButton}
                >
                  <AntDesign name="close" size={24} color="#EF4444" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Thêm Ghi Chú</Text>
                <View style={{ width: 24 }} />
              </View>
              <Input
                style={styles.input}
                placeholder="Nhập ghi chú"
                placeholderTextColor="#A0AEC0"
                value={newNote}
                onChangeText={setNewNote}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.modalFooter}>
                <Button
                  style={styles.modalCancelButton}
                  onPress={() => setNoteModalVisible(false)}
                >
                  Hủy
                </Button>
                <Button
                  style={styles.modalSaveButton}
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
                <TouchableOpacity
                  onPress={() => setGrowthModalVisible(false)}
                  style={styles.modalCancelButton}
                >
                  <AntDesign name="close" size={24} color="#EF4444" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Thêm Bản Ghi Tăng Trưởng</Text>
                <View style={{ width: 24 }} />
              </View>
              <Input
                style={styles.input}
                placeholder="Kích thước (cm)"
                placeholderTextColor="#A0AEC0"
                value={newSize}
                onChangeText={setNewSize}
                keyboardType="numeric"
              />
              <Input
                style={styles.input}
                placeholder="Cân nặng (kg)"
                placeholderTextColor="#A0AEC0"
                value={newWeight}
                onChangeText={setNewWeight}
                keyboardType="numeric"
              />
              <View style={styles.modalFooter}>
                <Button
                  style={styles.modalCancelButton}
                  onPress={() => setGrowthModalVisible(false)}
                >
                  Hủy
                </Button>
                <Button
                  style={styles.modalSaveButton}
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