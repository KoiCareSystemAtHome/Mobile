import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Button, Form, Input, Provider, Toast } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";

const EditFish = ({ route, navigation }) => {
  const { fish } = route.params;
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Add your API call or state update logic here
    Toast.success("Fish Updated Successfully");
    navigation.goBack();
  };

  // Initial form values
  useEffect(() => {
    if (fish) {
      form.setFieldsValue({
        name: fish.name,
        age: fish.age?.toString(),
        length: fish.length?.toString(),
        weight: "4.33", // Update with actual value if available
        sex: fish.sex,
        variety: fish.variety?.varietyName,
        pond: fish.pond?.name,
        inPondSince: "10.10.2018", // Update with actual value if available
        breeder: fish.variety?.varietyName,
        purchasePrice: fish.price?.toString(),
        condition: "Healthy", // Update with actual value if available
      });
    }
  }, [fish, form]);

  return (
    <Provider>
      <ImageBackground
        source={require("../../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Form form={form} onFinish={onFinish} style={{ backgroundColor: "transparent" }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Koi</Text>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={() => form.submit()}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Tap To Select Image</Text>
            </TouchableOpacity>
            <View style={styles.modalFields}>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Name:</Text>
                  <Form.Item
                    name="name"
                    style={styles.input}
                    rules={[{ required: true, message: "Please input name" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Age:</Text>
                  <Form.Item
                    name="age"
                    style={styles.input}
                    rules={[{ required: true, message: "Please input age" }]}
                  >
                    <Input placeholder="Age" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Length:</Text>
                  <Form.Item
                    name="length"
                    style={styles.input}
                    rules={[{ required: true, message: "Please input length" }]}
                  >
                    <Input placeholder="Length" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Weight:</Text>
                  <Form.Item
                    name="weight"
                    style={styles.input}
                    rules={[{ required: true, message: "Please input weight" }]}
                  >
                    <Input placeholder="Weight" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Sex:</Text>
                  <Form.Item name="sex" style={styles.input}>
                    <Input placeholder="Sex" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Variety:</Text>
                  <Form.Item name="variety" style={styles.input}>
                    <Input placeholder="Variety" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Pond:</Text>
                  <Form.Item name="pond" style={styles.input}>
                    <Input placeholder="Pond" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>In Pond Since:</Text>
                  <Form.Item name="inPondSince" style={styles.input}>
                    <Input placeholder="In Pond Since" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Breeder:</Text>
                  <Form.Item name="breeder" style={styles.input}>
                    <Input placeholder="Breeder" />
                  </Form.Item>
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Purchase Price:</Text>
                  <Form.Item name="purchasePrice" style={styles.input}>
                    <Input placeholder="Purchase Price" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Condition:</Text>
                  <Form.Item name="condition" style={styles.input}>
                    <Input placeholder="Condition" />
                  </Form.Item>
                </View>
              </View>
              <View style={styles.modalFooter}>
                <View>
                  <TouchableOpacity style={styles.deceasedButton}>
                    <FontAwesome name="skull" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.deceasedButtonText}>Koi Deceased</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.deleteButton}>
                    <FontAwesome name="trash" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.deleteButtonText}>Delete Koi</Text>
                </View>
              </View>
            </View>
          </Form>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default EditFish;