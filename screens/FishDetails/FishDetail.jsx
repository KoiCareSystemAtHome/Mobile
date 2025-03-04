import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";


const FishDetail = ({ route }) => {
  const { fish } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const dummyHealthStatus = [
    {
      date: "03.04.2023",
      status: "Healthy / Sick",
      treatment: "No treatment needed / Use product '-----' to cure the koi",
    },
  ];

  const dummyGrowthHistory = [
    {
      date: "03.03.2023",
      length: "15 cm",
      weight: "12 g",
      note: "First measurement",
    },
  ];

  return (
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
        <Text style={styles.title}>Fish Details</Text>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri:fish.image}} style={styles.fishImage} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.headerTop}>
              <Text style={[styles.name, { fontWeight: "bold" }]}>
                {fish.name}
              </Text>
              <TouchableOpacity style={styles.editIcon}>
                <FontAwesome
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  name="edit"
                  size={30}
                  color="#6497B1"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.variety}>{fish.variety.varietyName}</Text>
            <Text style={styles.price}>$100</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>{fish.age}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Length</Text>
                <Text style={styles.infoValue}>{fish.length}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Weight</Text>
                <Text style={styles.infoValue}>4.33 g</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Condition */}
        <View style={styles.section}>
          <Text style={styles.label}>Condition: Healthy</Text>
        </View>

        {/* Pond and Breeder Information */}
        <View style={styles.section}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> has been
            swimming in the pond{" "}
            <Text style={{ fontWeight: "bold" }}>"{fish.pond.name}"</Text> since{" "}
            <Text style={{ fontWeight: "bold" }}>10.10.2018</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> was bought
            for <Text style={{ fontWeight: "bold" }}>{fish.price} VND</Text> and
            was bred by <Text style={{ fontWeight: "bold" }}>{fish.variety.varietyName}</Text>.
          </Text>
        </View>

        {/* Health Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Health Status</Text>
            <TouchableOpacity>
              <FontAwesome name="plus" size={18} color="#6497B1" />
            </TouchableOpacity>
          </View>
          {dummyHealthStatus.map((item, index) => (
            <View key={index} style={styles.card}>
              <View>
                <Image source={fish.image} style={styles.cardImage} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={{ marginBottom: 5 }}>
                  Overall Status: {item.status}
                </Text>
                <Text>Treatment: {item.treatment}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Growth History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Growth History</Text>
            <TouchableOpacity>
              <FontAwesome name="plus" size={18} color="#6497B1" />
            </TouchableOpacity>
          </View>
          {dummyGrowthHistory.map((entry, index) => (
            <View key={index} style={styles.card}>
              <View style={{ padding: 15 }}>
                <Image
                  source={require("../../assets/610128 1.png")}
                  style={{ height: 70, width: 70 }}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardDate}>{entry.date}</Text>
                <Text>Length: {entry.length}(First Measurement)</Text>
                <Text>Weight: {entry.weight}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Notes</Text>
            <TouchableOpacity>
              <FontAwesome name="plus" size={18} color="#6497B1" />
            </TouchableOpacity>
          </View>
          <Text style={styles.noteText}>
            You didn’t add any notes yet. Please add a new note by tapping on
            the plus symbol in the top right of the section.
          </Text>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Edit Koi</Text>
                <TouchableOpacity style={styles.modalSaveButton}>
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
                    <TextInput style={styles.input} placeholder="Name" />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Age:</Text>
                    <TextInput style={styles.input} placeholder="Age" />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Length:</Text>
                    <TextInput style={styles.input} placeholder="Length" />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Weight:</Text>
                    <TextInput style={styles.input} placeholder="Weight" />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Sex:</Text>
                    <TextInput style={styles.input} placeholder="Sex" />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Variety:</Text>
                    <TextInput style={styles.input} placeholder="Variety" />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Pond:</Text>
                    <TextInput style={styles.input} placeholder="Pond" />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>In Pond Since:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="In Pond Since"
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Breeder:</Text>
                    <TextInput style={styles.input} placeholder="Breeder" />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Purchase Price:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Purchase Price"
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Condition:</Text>
                    <TextInput style={styles.input} placeholder="Condition" />
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
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};



export default FishDetail;
