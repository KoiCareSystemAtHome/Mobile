import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getExamination,
  getPrediction,
  getSymptomByType,
} from "../../redux/slices/symptomSlice";
import {
  symptomByTypeSelector,
  symptomExaminationSelector,
  symptomPredictionSelector,
} from "../../redux/selector";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

const SymptomScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const symptomData = useSelector(symptomByTypeSelector);

  // Dropdown states
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    dispatch(getSymptomByType("Common"));
  }, [dispatch]);

  // Map symptom data to dropdown items
  useEffect(() => {
    if (symptomData?.length > 0) {
      const dropdownItems = symptomData.map((symptom) => ({
        label: symptom.name,
        value: symptom.symtompId,
      }));
      setItems(dropdownItems);
    }
  }, [symptomData]);

  // Get selected symptom names
  const selectedSymptoms = symptomData
    ?.filter((symptom) => selectedValues.includes(symptom.symtompId))
    .map((symptom) => symptom.name);

  // Get unique selected symptom types
  const selectedTypes = [
    ...new Set(
      symptomData
        ?.filter((symptom) => selectedValues.includes(symptom.symtompId))
        .map((symptom) => symptom.type)
    ),
  ];

  console.log(selectedTypes);

  // Render individual symptom item
  const renderSymptomItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>{item}</Text>
    </View>
  );

  // Render individual type item
  const renderTypeItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>
        {item === "Common_Food"
          ? "Thức Ăn"
          : item === "Common_Enviroment"
          ? "Môi trường"
          : item === "Common_Disease"
          ? "Loại bệnh phổ biển"
          : item}
      </Text>
    </View>
  );

  // Handle navigation to PredictSymptom
  const handleNext = () => {
    navigation.navigate("PredictSymptom", {
      selectedSymptomIds: selectedValues.map((id) => ({
        symtompId: id,
        value: "True",
      })),
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack("MainTabs")}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Chẩn Đoán Bệnh</Text>
        <Text style={styles.subTitle}>Hãy chọn triệu chứng của cá</Text>
        <DropDownPicker
          open={open}
          value={selectedValues}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedValues}
          multiple={true}
          mode="BADGE"
          placeholder="Select Symptoms"
          style={styles.dropdown}
          dropDownContainerStyle={{ zIndex: 100 }}
        />

        {selectedSymptoms?.length > 0 && (
          <View style={styles.symptomCard}>
            <FlatList
              data={selectedSymptoms}
              renderItem={renderSymptomItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.symptomList}
            />
          </View>
        )}

        {selectedTypes?.length > 0 && (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>
              Có vẻ hồ cá của bạn đang gặp vấn đề về:
            </Text>
            <FlatList
              data={selectedTypes}
              renderItem={renderTypeItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.symptomList}
            />
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedValues.length > 0 ? 1 : 0.5 },
          ]}
          onPress={handleNext}
          disabled={selectedValues.length === 0}
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SymptomScreen;
