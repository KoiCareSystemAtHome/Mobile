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
      source={require("../assets/koimain3.jpg")}
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
            <Image source={fish.image} style={styles.fishImage} />
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
            <Text style={styles.variety}>{fish.variety}</Text>
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
            <Text style={{ fontWeight: "bold" }}>"Home Pond"</Text> since{" "}
            <Text style={{ fontWeight: "bold" }}>10.10.2018</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> was bought
            for <Text style={{ fontWeight: "bold" }}>1.000.000 VND</Text> and
            was bred by <Text style={{ fontWeight: "bold" }}>White</Text>.
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
                  source={require("../assets/610128 1.png")}
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: { flex: 1, padding: 20 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  fishImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardImage: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    flexShrink: 1,
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editIcon: {
    padding: 5,
  },
  variety: {
    fontSize: 18,
    color: "#787878",
    marginBottom: 5,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
  },
  infoBlock: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    height: 100,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginBottom: 20,
    marginTop: 20,
  },

  modalCancelText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalSaveText: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  modalFields: {
    width: "100%",
    marginVertical: 10,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "center",
    gap:35
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderRadius: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    height: 40,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputRow: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between columns
  },
  modalFields: {
    width: "100%",
    marginVertical: 10,
  },
  imageButtonText: {
    color: "#6497B1",
    fontSize: 16,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
    borderStyle:"dashed",
    backgroundColor:"#EBEBEB"
  },
  deceasedButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: "50%",

    width: 50,
    height: 50,
  },
  deceasedButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    // marginTop: 5,
  },
  deleteButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default FishDetail;
