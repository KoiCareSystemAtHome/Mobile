import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { recommendFood } from "../../redux/slices/calculatorSlice";
import { foodSuggestionSelector } from "../../redux/selector";

const SuggestFood = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const foodSuggestion = useSelector(foodSuggestionSelector);
  const { pondId } = route.params;


  useEffect(() => {
    dispatch(recommendFood(pondId))
  }, [dispatch, pondId]);


  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Thức ăn gợi ý</Text>
        <View style={{ width: 24 }} /> {/* Spacer for symmetry */}
      </View>

      <View style={styles.notediv}>
        <Text style={styles.note}>{foodSuggestion.note}</Text>
        {foodSuggestion.image ? (
          <Image 
            source={{ uri: foodSuggestion.image }} 
            style={styles.foodImage} 
            resizeMode="cover" 
          />
        ) : null}
      </View>

      {/* Food Suggestions List */}
      <FlatList
        data={foodSuggestion?.foods}
        keyExtractor={(item) => item.foodId}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={{ uri: item.product.image || "https://via.placeholder.com/150" }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.product.productName}</Text>
            <Text style={styles.productName}>{item.product.brand}</Text>
            <Text style={styles.productName}>
              Age: {item.ageFrom} - {item.ageTo} months
            </Text>
            <Text style={styles.productPrice}>
              {item.product.price.toLocaleString()} VND
            </Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                navigation.navigate("ProductDetail", {
                  product: item.product,
                });
              }}
            >
              <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 16, color: "#666" }}>
              No food suggestions available
            </Text>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default SuggestFood;