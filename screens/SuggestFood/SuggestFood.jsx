import React, { useEffect } from "react";
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
    dispatch(recommendFood(pondId));
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
          <AntDesign name="left" size={28} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.title}>Thức ăn gợi ý</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Note and Image Section */}
      {foodSuggestion?.note || foodSuggestion?.image ? (
        <View style={styles.noteContainer}>
          {foodSuggestion?.image && (
            <Image
              source={{
                uri:
                  foodSuggestion.image ||
                  "https://via.placeholder.com/80/ADD8E6/FFFFFF?",
              }}
              style={styles.noteImage}
            />
          )}
          {foodSuggestion?.note && (
            <Text style={styles.noteText}>{foodSuggestion.note}</Text>
          )}
        </View>
      ) : null}

      {/* Food Suggestions List */}
      <FlatList
        data={foodSuggestion?.foods || []}
        keyExtractor={(item) =>
          item.foodId?.toString() || Math.random().toString()
        }
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => {
              navigation.navigate("ProductDetail", {
                product: item.product || {},
              });
            }}
          >
            <Image
              source={{
                uri:
                  item.product?.image ||
                  "https://via.placeholder.com/150/ADD8E6/FFFFFF?text=Koi+Food",
              }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>
              {item.product?.productName || "Unknown Product"}
            </Text>
            <Text style={styles.productName}>
              {item.product?.brand || "N/A"}
            </Text>
            <Text style={styles.ageText}>
              Age: {item.ageFrom ?? "N/A"} - {item.ageTo ?? "N/A"} ngày
            </Text>
            <Text style={styles.productPrice}>
              {(item.product?.price ?? 0).toLocaleString()}{" "}
              <Text style={styles.priceUnit}>VND</Text>
            </Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                navigation.navigate("ProductDetail", {
                  product: item.product || {},
                });
              }}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", padding: 30 }}>
            <Text
              style={{ fontSize: 18, color: "#6B7280", textAlign: "center" }}
            >
              No food suggestions available for your koi at this time.
            </Text>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default SuggestFood;
