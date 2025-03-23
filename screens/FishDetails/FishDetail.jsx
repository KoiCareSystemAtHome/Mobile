import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Provider } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import GrowthChart from "./components/GrowthChart";
import HealthStatusForm from "./components/HealthStatusForm/HealthStatusForm";
import { useDispatch, useSelector } from "react-redux";
import { fishByIdSelector } from "../../redux/selector";
import { getFishById } from "../../redux/slices/fishSlice";

const FishDetail = ({ route, navigation }) => {
  const { fish } = route.params;
  const dispatch = useDispatch();
  const fishById = useSelector(fishByIdSelector);
  const [isHealthModalVisible, setHealthModalVisible] = useState(false);

  const dummyHealthStatus = [
    {
      date: "03.04.2023",
      status: "Healthy / Sick",
      treatment: "No treatment needed / Use product '-----' to cure the koi",
    },
  ];

  const handleHealthRecordSubmit = (values) => {
    console.log("Health Record Submitted:", values);
  };

  useEffect(() => {
    dispatch(getFishById(fish?.koiID));
  }, [fish, dispatch]);

  console.log(fish);

  return (
    <Provider>
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
              <Image source={{ uri: fish.image }} style={styles.fishImage} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.headerTop}>
                <Text style={[styles.name, { fontWeight: "bold" }]}>
                  {fish.name}
                </Text>
                <TouchableOpacity style={styles.editIcon}>
                  <FontAwesome
                    onPress={() => navigation.navigate("EditFish", { fish })}
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
              <Text style={{ fontWeight: "bold" }}>"{fish.pond.name}"</Text>{" "}
              since <Text style={{ fontWeight: "bold" }}>10.10.2018</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{fish.name}</Text> was bought
              for <Text style={{ fontWeight: "bold" }}>{fish.price} VND</Text>{" "}
              and was bred by{" "}
              <Text style={{ fontWeight: "bold" }}>
                {fish.variety.varietyName}
              </Text>
              .
            </Text>
          </View>

          {/* Health Status */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Health Status</Text>
              <TouchableOpacity onPress={() => setHealthModalVisible(true)}>
                <FontAwesome name="plus" size={18} color="#6497B1" />
              </TouchableOpacity>
              <HealthStatusForm
                fishId={fish.koiID}
                visible={isHealthModalVisible}
                onClose={() => setHealthModalVisible(false)}
                onSubmit={handleHealthRecordSubmit}
              />
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
            <View style={styles.card}>
              <GrowthChart fishReportInfos={fish?.fishReportInfos}></GrowthChart>
            </View>
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
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default FishDetail;