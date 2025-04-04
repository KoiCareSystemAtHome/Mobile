import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { Provider, Toast } from "@ant-design/react-native"; // Added Toast import
import { styles } from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { createFeedback } from "../../redux/slices/productSlice";

const ReviewScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0); // Rating from 0-5
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStarPress = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    const productId = product.productId;
    const memberId = isLoggedIn?.id;
    const values = {
      memberId,
      productId,
      rate: rating,
      content,
    };
    
    dispatch(createFeedback(values))
      .unwrap()
      .then((res) => {
        if (res.status === "201") {
          Toast.success("Review Submitted Successfully"); 
          navigation.goBack();
        } else {
          Toast.fail("Failed to submit review"); 
        }
      })
      .catch((error) => {
        Toast.fail("Error submitting review"); // Added error handling toast
        console.error("Review submission error:", error);
      });
  };

  useEffect(() => {
    const getData = async (key) => {
      try {
        const userInfo = await AsyncStorage.getItem("user");
        setIsLoggedIn(userInfo ? JSON.parse(userInfo) : null);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Back Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            left: 15,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 20,
            padding: 8,
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>Đánh giá sản phẩm</Text>

          <ScrollView contentContainerStyle={styles.reviewContent}>
            {/* Product Information */}
            <View style={styles.productContainer}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.shopName}>Shop: {product.shopName}</Text>
                <Text style={styles.price}>
                  ₫{product.price.toLocaleString("vi-VN")}
                </Text>
              </View>
            </View>

            {/* Star Rating */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Đánh giá của bạn:</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleStarPress(star)}
                    style={styles.starButton}
                  >
                    <Icon
                      name="star"
                      size={30}
                      color={star <= rating ? "#FFD700" : "#ccc"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Review Content Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nhận xét của bạn:</Text>
              <TextInput
                style={styles.reviewInput}
                multiline
                numberOfLines={6}
                value={content}
                onChangeText={setContent}
                placeholder="Viết nhận xét của bạn về sản phẩm..."
                placeholderTextColor="#999"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!rating || !content) && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!rating || !content}
            >
              <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </Provider>
  );
};

export default ReviewScreen;