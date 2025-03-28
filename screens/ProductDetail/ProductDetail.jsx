import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Button } from "@ant-design/react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";

const ProductDetail = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const feedbacks = product.feedbacks || [];
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);
  console.log(product)

  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];

      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingProductIndex !== -1) {
        // If exists, update quantity
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Add new product
        cart.push({
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          quantity,
          image: product.image,
          shopId: product.shopId,
        });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      navigation.navigate("Shopping");
      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Product Info */}
      <Text style={styles.productTitle}>{product.productName}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productDescription}>{product.shop}</Text>

      {/* Quantity Selector and Price */}
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{product.price} VND</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.heartButton}>
          <AntDesign name="staro" size={24} color="#ddd" />
        </TouchableOpacity>
        <Button
          type="primary"
          style={styles.addToCartButton}
          onPress={addToCart}
        >
          <View style={styles.buttonContent}>
            <AntDesign name="shoppingcart" size={18} color="#fff" />
            <Text style={styles.buttonText}> Add to cart</Text>
          </View>
        </Button>
      </View>
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Customer Reviews</Text>
        {feedbacks.length > 0 ? (
          <FlatList
            data={feedbacks}
            renderItem={renderFeedback}
            keyExtractor={(item) => item.feedbackId}
          />
        ) : (
          <Text style={styles.noFeedbackText}>No reviews yet</Text>
        )}
      </View>
    </View>
  );
};

export default ProductDetail;
