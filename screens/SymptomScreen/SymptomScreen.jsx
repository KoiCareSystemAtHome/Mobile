import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
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

const SymptomScreen = () => {
  const dispatch = useDispatch();
  const symptomData = useSelector(symptomByTypeSelector);
  const symptomPredictionData = useSelector(symptomPredictionSelector);
  const symptomExaminationData = useSelector(symptomExaminationSelector);
  // Dropdown states
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [openPrediction, setOpenPrediction] = useState(false);
  const [itemsPrediction, setItemsPrediction] = useState([]);
  const [selectedValuesPrediction, setSelectedValuesPrediction] = useState();

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
    if (symptomPredictionData) {
      const dropdownItemsPrediction =
        symptomPredictionData?.symptomPredicts?.map((symptom) => ({
          label: symptom.name,
          value: symptom.symtompId,
        }));
      console.log(dropdownItemsPrediction);
      setItemsPrediction(dropdownItemsPrediction);
    }
  }, [symptomData, selectedValues]);

  useEffect(() => {
    if (selectedValues) {
      const mappedSymptoms = selectedValues?.map((id) => ({
        symtompId: id,
        value: "True",
      }));
      if (mappedSymptoms.length > 0) {
        dispatch(getPrediction(mappedSymptoms));
      }
      if (selectedValuesPrediction) {
        const mappedSymptomsPrediction = selectedValuesPrediction?.map(
          (id) => ({
            symtompId: id,
            value: "True",
          })
        );
        dispatch(getExamination(mappedSymptomsPrediction));
      }
    }
  }, [selectedValues, selectedValuesPrediction]);

  console.log(symptomExaminationData);
  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Predict Symptoms</Text>
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
          dropDownContainerStyle={{ zIndex: 11 }}
        />

        <Text style={styles.subTitle}>
          Hãy chọn triệu chứng của cá dựa vào chẩn đoán dưới đây
        </Text>
        <DropDownPicker
          open={openPrediction}
          value={selectedValuesPrediction}
          items={itemsPrediction}
          setOpen={setOpenPrediction}
          setValue={setSelectedValuesPrediction}
          multiple={true}
          mode="BADGE"
          placeholder="Select Symptoms"
          style={{ zIndex: 0 }}
          dropDownContainerStyle={{ zIndex: 11, borderColor: "black" }}
          disabled={selectedValues.length === 0}
        />
        {selectedValuesPrediction ? (
          <View>
            <Text style={[styles.subTitle, { marginTop: 150 }]}>
              Chẩn đoán bệnh: {symptomExaminationData?.diseaseName}
            </Text>
            <Text>
            {symptomExaminationData?.description}
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </ImageBackground>
  );
};

export default SymptomScreen;
