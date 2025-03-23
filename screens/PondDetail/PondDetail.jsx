import { Card } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import WaterParametersChart from "./components/WaterParameterChart"; // Adjust the path
import { useDispatch, useSelector } from "react-redux";
import { getPondByID } from "../../redux/slices/pondSlice";
import { pondByIdSelector, productSelector } from "../../redux/selector";
import { styles } from "./styles";

const PondDetail = ({ route }) => {
  const dispatch = useDispatch();
  const pondById = useSelector(pondByIdSelector);
  const products = useSelector(productSelector);
  const { pond } = route.params;
  const [selectedParameters, setSelectedParameters] = useState([]);

  // Transform pondParameters into chart-compatible data
  const transformPondParameters = (pondParameters) => {
    if (!pondParameters || !Array.isArray(pondParameters)) return [];

    const dataMap = {};
    pondParameters.forEach((param) => {
      param.valueInfors.forEach((valueInfo) => {
        const dateKey = valueInfo.caculateDay;
        if (!dataMap[dateKey]) {
          dataMap[dateKey] = { calculatedDate: dateKey };
        }
        dataMap[dateKey][param.parameterName] = valueInfo.value;
      });
    });

    return Object.values(dataMap);
  };

  const waterParameterData = transformPondParameters(pondById?.pondParameters);
  const parameters =
    pondById?.pondParameters?.map((param) => param.parameterName) || [];

  // Map recommended products
  const recommendedProducts =
    pondById?.recomment?.map((rec) => {
      const product = products?.find(
        (prod) => prod.productId === rec.productid
      );
      return (
        product || { productId: rec.productid, productName: "Unknown Product" }
      ); // Fallback if no match
    }) || [];

  const toggleParameter = (parameter) => {
    if (selectedParameters.includes(parameter)) {
      setSelectedParameters(
        selectedParameters.filter((param) => param !== parameter)
      );
    } else {
      setSelectedParameters([...selectedParameters, parameter]);
    }
  };

  useEffect(() => {
    dispatch(getPondByID(pond?.pondID));
  }, [dispatch, pond?.pondID]);

  // Split parameters into rows of 3
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const parameterRows = chunkArray(parameters, 3);

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

        <View style={styles.parametersContainer}>
          <Text style={styles.sectionTitle}>Water Parameters</Text>
          {parameterRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.parametersRow}>
              {row.map((param) => (
                <TouchableOpacity
                  key={param}
                  onPress={() => toggleParameter(param)}
                  style={[
                    styles.parameterCard,
                    {
                      backgroundColor: selectedParameters.includes(param)
                        ? "#FFD29D"
                        : styles.parameterCard.backgroundColor,
                    },
                  ]}
                >
                  <Text style={styles.parameterLabel}>{param}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

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
            <WaterParametersChart
              selectedParameters={selectedParameters}
              waterParameterData={waterParameterData}
            />
          </View>
        </View>

        <View style={styles.suggestedContainer}>
          <Text style={styles.sectionTitle}>Suggested Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          >
            {pondById?.recomment.length > 0 &&
              recommendedProducts?.map((item) => (
                <TouchableOpacity
                  key={item.productId}
                  style={styles.productCard}
                >
                  <Image
                    source={{
                      uri: item.image || "https://via.placeholder.com/128",
                    }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productName}>
                    {item?.shop || "Unknown Shop"}
                  </Text>
                  <Text style={styles.productPrice}>
                    {item.price || "N/A"} VND
                  </Text>
                  <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PondDetail;
