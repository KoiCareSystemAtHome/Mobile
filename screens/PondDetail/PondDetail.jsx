import { Card } from "@ant-design/react-native";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const PondDetail = ({ route }) => {
  const { pond } = route.params;

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pond Details</Text>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: pond.image }} style={styles.pondImage} />
              <View style={styles.pondInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.pondText}>
                    <Text style={styles.label}>Name: </Text>
                    {pond.name}
                  </Text>
                </View>
                <Text style={styles.pondText}>
                  <Text style={styles.label}>Number of Fish: </Text>5
                </Text>
                <Text style={styles.pondText}>
                  <Text style={styles.label}>Volume: </Text>
                  {pond.volume} l
                </Text>
                <Text style={styles.pondText}>
                  <Text style={styles.label}>Depth: </Text>1 m
                </Text>
                <Text style={styles.pondText}>
                  <Text style={styles.label}>Pumping Capacity: </Text>20,000 l/h
                </Text>

                <TouchableOpacity style={styles.editButton}>
                  <FontAwesome name="pencil-square-o" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>

        {/* Water Parameters Section */}
        <View style={styles.parametersContainer}>
          <Text style={styles.sectionTitle}>Water Parameters</Text>
          <View style={styles.parametersRow}>
            <View
              style={[styles.parameterCard, { backgroundColor: "#FFD29D" }]}
            >
              <Text style={styles.parameterLabel}>Nitrate (NO2)</Text>
            </View>
            <View
              style={[styles.parameterCard, { backgroundColor: "#FFD29D" }]}
            >
              <Text style={styles.parameterLabel}>Nitrite (NO2)</Text>
            </View>
            <View
              style={[styles.parameterCard, { backgroundColor: "#FFD29D" }]}
            >
              <Text style={styles.parameterLabel}>Ammonium (NH4)</Text>
            </View>
          </View>
          <View style={styles.parametersRow}>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Phosphate (PO4)</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Oxygen (O2)</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>pH</Text>
            </View>
          </View>
          <View style={styles.parametersRow}>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>KH</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>GH</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Temp</Text>
            </View>
          </View>
          <View style={styles.parametersRow}>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Salt</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>CO2</Text>
            </View>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Amount</Text>
            </View>
          </View>
          <View style={styles.parametersRow}>
            <View style={styles.parameterCard}>
              <Text style={styles.parameterLabel}>Outdoor Temp</Text>
            </View>
          </View>
        </View>

        {/* Pond Statistics Section */}
        <View style={styles.statisticsContainer}>
          <View style={styles.statisticCard}>
            <View style={styles.statisticsRow}>
              <Text style={styles.sectionTitle}>Pond Statistics</Text>
              <View style={styles.statisticsRow}>
                <Text style={styles.statisticsLabel}>This Month</Text>
                <TouchableOpacity>
                  <Text style={styles.statisticsDropdown}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <Image
            source={require("../assets/pond_statistics_chart.png")}
            style={styles.statisticsImage}
          /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PondDetail;
