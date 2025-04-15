import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "@ant-design/react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/slices/productSlice";
import { productByIdSelector } from "../../redux/selector";

const FEEDBACKS_PER_PAGE = 5;

const ProductDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { product } = route.params;
  const productById = useSelector(productByIdSelector);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacks = productById?.feedbacks || [];

  // Calculate average rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, feedback) => sum + feedback.rate, 0) /
          feedbacks.length
        ).toFixed(1)
      : "N/A";

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];

      const existingProductIndex = cart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({
          productId: productById.productId,
          productName: productById.productName,
          price: productById.price,
          quantity,
          image: productById.image,
          shopId: productById.shopId,
        });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      navigation.navigate("Shopping");
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  useEffect(() => {
    dispatch(getProductById(product.productId));
  }, [product]);

  // Pagination logic
  const totalPages = Math.ceil(feedbacks.length / FEEDBACKS_PER_PAGE);
  const startIndex = (currentPage - 1) * FEEDBACKS_PER_PAGE;
  const endIndex = startIndex + FEEDBACKS_PER_PAGE;
  const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderFeedback = ({ item }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.feedbackHeader}>
        <Text style={styles.feedbackMemberName}>{item.memberName}</Text>
        <Text style={styles.feedbackRating}>{item.rate}/5</Text>
      </View>
      <Text style={styles.feedbackContent}>{item.content}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: productById?.image }} style={styles.productImage} />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{productById?.productName}</Text>
        <Text style={styles.shopName}>{productById?.shopName}</Text>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={styles.averageRating}>
            {averageRating} ({feedbacks.length} đánh giá)
          </Text>
        </View>
        <Text style={styles.productPrice}>
          {productById?.price.toLocaleString("vi-VN")} VND
        </Text>
        <Text style={styles.stockQuantity}>
          Còn: {productById?.stockQuantity} sản phẩm
        </Text>
        <Text style={styles.productDescription}>{productById?.description}</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Số lượng:</Text>
        <View style={styles.quantitySelector}>
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
      </View>

      {/* Add to Cart Button */}
      <Button
        type="primary"
        style={styles.addToCartButton}
        onPress={addToCart}
      >
        <View style={styles.buttonContent}>
          <AntDesign name="shoppingcart" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Thêm vào giỏ</Text>
        </View>
      </Button>

      {/* Feedback Section Title */}
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Đánh giá sản phẩm</Text>
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
        onPress={handlePrevPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationText}>Trang trước</Text>
      </TouchableOpacity>
      <Text style={styles.pageInfo}>
        {currentPage}/{totalPages}
      </Text>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationText}>Trang sau</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/koiimg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <FlatList
          data={paginatedFeedbacks}
          renderItem={renderFeedback}
          keyExtractor={(item) => item.feedbackId}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <Text style={styles.noFeedbackText}>Chưa có đánh giá</Text>
          }
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </ImageBackground>
  );
};

export default ProductDetail;