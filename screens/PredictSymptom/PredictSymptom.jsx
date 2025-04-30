import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getExamination, getPrediction } from "../../redux/slices/symptomSlice";
import {
  symptomExaminationSelector,
  symptomPredictionSelector,
} from "../../redux/selector";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./style";

const PredictSymptom = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValues, setSelectedValues] = useState(null);
  const symptomPrediction = useSelector(symptomPredictionSelector);
  const diseaseDiagnosis = useSelector(symptomExaminationSelector);
  const { selectedSymptomIds } = route.params;

  useEffect(() => {
    if (symptomPrediction) {
      const dropdownItems = symptomPrediction?.symptomPredicts?.map(
        (symptom) => ({
          label: symptom.name,
          value: symptom.symtompId,
        })
      );
      setItems(dropdownItems);
    }
  }, [symptomPrediction]);

  useEffect(() => {
    dispatch(getPrediction(selectedSymptomIds));
  }, [selectedSymptomIds]);

  useEffect(() => {
    if (selectedValues?.length > 0) {
      const selectedSymptom = selectedValues.map((id) => ({
        symtompId: id,
        value: "True",
      }));
      dispatch(getExamination(selectedSymptom));
    }
  }, [selectedValues]);

  const selectedSymptoms = symptomPrediction?.symptomPredicts
    ?.filter((symptom) => selectedValues?.includes(symptom.symtompId))
    .map((symptom) => symptom.name);

  const renderSymptomItem = ({ item }) => (
    <View style={styles.symptomItem}>
      <Text style={styles.symptomText}>{item}</Text>
    </View>
  );

  const handleCreateProfile = () => {
    const symptomsData = selectedValues.map((symptomId) => ({
      symptomID: symptomId,
      value: "True",
    }));

    navigation.navigate("CreateKoiProfile", {
      diseaseId: diseaseDiagnosis?.diseaseId,
      symptoms: symptomsData,
    });
  };

  // Data for main FlatList
  const listData = [
    { type: "title", id: "title" },
    { type: "dropdown", id: "dropdown" },
    ...(symptomPrediction?.causeGroupType === "Cá ăn quá no"
      ? [
          {
            type: "cause",
            id: "cause",
            causeGroupType: symptomPrediction?.causeGroupType,
          },
        ]
      : []),
    ...(selectedSymptoms?.length > 0
      ? [{ type: "symptoms", id: "symptoms", data: selectedSymptoms }]
      : []),
    ...(selectedValues?.length > 0 && diseaseDiagnosis?.diseaseName
      ? [
          {
            type: "diagnosis",
            id: "diagnosis",
            diseaseName: diseaseDiagnosis?.diseaseName,
          },
        ]
      : []),
  ];

  // Render item for main FlatList
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "title":
        return <Text style={styles.title}>Chẩn Đoán Bệnh</Text>;
      case "dropdown":
        return (
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={selectedValues}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedValues}
              multiple={true}
              mode="BADGE"
              placeholder="Chọn triệu chứng"
              style={[styles.dropdown, { marginBottom: open ? 200 : 20 }]}
              dropDownContainerStyle={styles.dropdownContainer}
              accessibilityLabel="Select fish symptoms"
              accessibilityRole="combobox"
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
        );
      case "cause":
        return (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>Nguyên Nhân: {item.causeGroupType}</Text>
          </View>
        );
      case "symptoms":
        return (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>Triệu Chứng Đã Chọn</Text>
            <FlatList
              data={item.data}
              renderItem={renderSymptomItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.symptomList}
              nestedScrollEnabled={true}
            />
          </View>
        );
      case "diagnosis":
        return (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>Chẩn Đoán: {item.diseaseName}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {selectedValues?.length > 0 && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateProfile}
            accessibilityLabel="Save disease history"
            accessibilityRole="button"
          >
            <Text style={styles.createButtonText}>Lưu Lịch Sử Bệnh</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default PredictSymptom;