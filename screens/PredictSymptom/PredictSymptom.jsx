import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getExamination, getPrediction } from "../../redux/slices/symptomSlice";
import { symptomExaminationSelector, symptomPredictionSelector } from "../../redux/selector";
import { FlatList, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";

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
      console.log("a", dropdownItems);
    }
  }, [symptomPrediction, dispatch]);
  
  useEffect(() => {
    dispatch(getPrediction(selectedSymptomIds));
  }, [selectedSymptomIds]);

  useEffect(() => {
    if(selectedValues?.length > 0) {
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
  
  console.log(diseaseDiagnosis);
  
  const handleCreateProfile = () => {
    const symptomsData = selectedValues.map(symptomId => ({
      symptomID: symptomId,
      value: "True"
    }));

    navigation.navigate('CreateKoiProfile', {
      diseaseId: diseaseDiagnosis?.diseaseId,
      symptoms: symptomsData
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
        <Text style={styles.title}>Chẩn Đoán Bệnh</Text>
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
        {selectedValues?.length > 0 && (
          <View style={styles.symptomCard}>
            <Text style={styles.cardTitle}>
              Chẩn đoán bệnh: {diseaseDiagnosis?.diseaseName}
            </Text>
          </View>
        )}
        
        {selectedValues?.length > 0 && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateProfile}
          >
            <Text style={styles.createButtonText}>Lưu lịch sử bệnh</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default PredictSymptom;