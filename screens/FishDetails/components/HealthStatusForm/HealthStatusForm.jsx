import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Modal,
  Form,
  Input,
  Picker,
  DatePicker,
  Button,
  Toast,
  Provider,
} from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getFishById } from "../../../../redux/slices/fishSlice";
import { fishByIdSelector } from "../../../../redux/selector";

const HealthStatusForm = ({ fishId, visible, onClose, onSubmit }) => {

  const [form] = Form.useForm();
  const [symptoms, setSymptoms] = useState([{ symptomID: "", value: "" }]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          fishId: fishId,
          symptoms: symptoms.filter(
            (symptom) => symptom.symptomID && symptom.value
          ),
        };
        onSubmit(formattedValues);
        Toast.success("Health record submitted successfully!");
        form.resetFields();
        setSymptoms([{ symptomID: "", value: "" }]);
        onClose();
      })
      .catch((errorInfo) => {
        Toast.fail("Please fill in all required fields!");
      });
  };

  const addSymptom = () => {
    setSymptoms([...symptoms, { symptomID: "", value: "" }]);
  };

  const updateSymptom = (index, field, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index][field] = value;
    setSymptoms(updatedSymptoms);
  };

  const removeSymptom = (index) => {
    if (symptoms.length > 1) {
      setSymptoms(symptoms.filter((_, i) => i !== index));
    }
  };

  return (
    <Provider>
      <Modal
        title={<Text style={styles.modalTitle}>Lịch sử bệnh cá</Text>}
        visible={visible}
        transparent
        onClose={onClose}
        style={{width:350, height:650}}
        maskClosable
        footer={[
          {
            text: "Cancel",
            onPress: onClose,
            style: { backgroundColor: "#f0f0f0", borderRadius: 8, padding: 10 },
            textStyle: { color: "#ff4d4f", fontSize: 16, fontWeight: "500" },
          },
          {
            text: "Submit",
            onPress: handleSubmit,
            style: { backgroundColor: "#6497B1", borderRadius: 8, padding: 10 },
            textStyle: { color: "#fff", fontSize: 16, fontWeight: "500" },
          },
        ]}
      >
        <ScrollView style={{ maxHeight: 400 }}>
          <Provider>
            <Form
              form={form}
              initialValues={{
                diseaseID: "",
                medicineId: "",
                endDate: null,
                status: "",
                note: "",
              }}
              style={styles.container}
            >
              <Form.Item
                name="diseaseID"
                label={<Text style={styles.inputLabel}>Bệnh cá</Text>}
                rules={[{ required: true, message: "Please enter Disease ID" }]}
              >
                <Input placeholder="Enter Disease ID" style={styles.input} />
              </Form.Item>

              <Form.Item
                name="medicineId"
                label={<Text style={styles.inputLabel}>Mã đơn thuốc</Text>}
                rules={[{ required: true, message: "Please enter Medicine ID" }]}
              >
                <Input placeholder="Enter Medicine ID" style={styles.input} />
              </Form.Item>

              <Form.Item
                name="endDate"
                label={<Text style={styles.inputLabel}>Ngày kết thúc</Text>}
                rules={[{ required: true, message: "Please select End Date" }]}
              >
                <DatePicker
                  mode="date"
                  format="YYYY-MM-DD"
                  minDate={new Date()}
                  defaultDate={new Date()}
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                name="status"
                label={<Text style={styles.inputLabel}>Trạng thái</Text>}
                rules={[{ required: true, message: "Please select Status" }]}
              >
                <Picker
                  data={[
                    { value: "Healthy", label: "Healthy" },
                    { value: "Sick", label: "Sick" },
                    { value: "Recovering", label: "Recovering" },
                  ]}
                  cols={1}
                  style={styles.picker}
                >
                  <Text style={styles.input}>Chọn trạng thái</Text>
                </Picker>
              </Form.Item>

              {/* Symptoms Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.label}>Triệu chứng</Text>
                <TouchableOpacity onPress={addSymptom}>
                  <FontAwesome name="plus" size={18} color="#6497B1" />
                </TouchableOpacity>
              </View>

              {symptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomRow}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Triệu chứng:</Text>
                    <Input
                      placeholder="Symptom ID"
                      value={symptom.symptomID}
                      onChange={(value) =>
                        updateSymptom(index, "symptomID", value)
                      }
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Giá trị:</Text>
                    <Input
                      placeholder="Symptom Value"
                      value={symptom.value}
                      onChange={(value) => updateSymptom(index, "value", value)}
                      style={styles.input}
                    />
                  </View>
                  {symptoms.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeSymptom(index)}
                      style={styles.removeSymptomButton}
                    >
                      <FontAwesome name="trash" size={18} color="#ff4d4f" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <Form.Item
                name="note"
                label={<Text style={styles.inputLabel}>Ghi chú</Text>}
              >
                <Input
                  placeholder="Add a note (optional)"
                  multiline
                  style={[styles.input, { height: 100 }]}
                />
              </Form.Item>
            </Form>
          </Provider>
        </ScrollView>
      </Modal>
    </Provider>
  );
};

export default HealthStatusForm;