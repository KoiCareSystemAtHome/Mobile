import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Card, Provider } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PondStatistic = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Mock data for pond
  const pondData = [
    {
      id: "1",
      name: "Main Pond",
      numberOfPond: "2",
      volume: "10,000",
      image: require("../assets/download 4.png"),
    },
    {
        id: "2",
        name: "Side Pond",
        numberOfPond: "5",
        volume: "10,000",
        image: require("../assets/download 4.png"),
    },
  ];

  const renderPondCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PondDetail", { pond: item })}
    >
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.pondImage} />
        <View style={styles.pondInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.pondText}>
              <Text style={styles.label}>Name: </Text>
              {item.name}
            </Text>
            
          </View>
          <Text style={styles.pondText}>
            <Text style={styles.label}>Number Of Pond: </Text>
            {item.numberOfPond}
          </Text>
          <Text style={styles.pondText}>
            <Text style={styles.label}>Volume: </Text>
            {item.volume} l
          </Text>

        </View>
      </View>
    </Card>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <ImageBackground
        source={require("../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <Text style={styles.title}>Pond Statistic</Text>
          <FlatList
            data={pondData}
            renderItem={renderPondCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <Text style={styles.badge}>2 KOI</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Koi</Text>
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
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveButton}>
                  <Text style={styles.modalSaveText}>Save</Text>
                </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Provider>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 300,
  },
  cardContent: {
    // padding: 10,
  },
  pondImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  pondInfo: {
    marginLeft: 10,
  },
  pondText: {
    marginTop: 16,
    fontSize: 16,
    // marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  badge: {
    backgroundColor: "#FFD29D",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  addButton: {
    backgroundColor: "#FFD29D",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop:20
  },
  modalCancelButton: {
    padding: 10,
  },
  modalCancelText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalSaveButton: {
    padding: 10,
  },
  modalSaveText: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#6497B1",
    fontSize: 16,
  },
  modalFields: {
    width: "100%",
    marginVertical: 10,
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
  modalFooter:{
    flexDirection: "row",
    justifyContent:"space-between"
  }
});

export default PondStatistic;
