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
      : "0.0";

  const handleIncrement = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

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
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          quantity,
          image: product.image,
          shopId: product.shopId,
          weight: product.weight,
          stockQuantity: product.stockQuantity,
        });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      navigation.navigate("Shopping");
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng.");
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
        <Text style={styles.feedbackRating}>
          <AntDesign name="star" size={14} color="#FFD700" /> {item.rate}/5
        </Text>
      </View>
      <Text style={styles.feedbackContent}>{item.content}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <AntDesign name="left" size={24} color="#26A69A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.productName}</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.shopName}>{product.shopName}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stockQuantity}>
            Còn: {product.stockQuantity} sản phẩm
          </Text>
          <Text style={styles.averageRating}>
            <AntDesign name="star" size={16} color="#FFD700" /> {averageRating} (
            {feedbacks.length} đánh giá)
          </Text>
        </View>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString("vi-VN")} VND
        </Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Số lượng:</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
            disabled={quantity <= 1}
            accessibilityLabel="Decrease quantity"
            accessibilityRole="button"
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity >= product.stockQuantity && styles.disabledQuantityButton,
            ]}
            onPress={handleIncrement}
            disabled={quantity >= product.stockQuantity}
            accessibilityLabel="Increase quantity"
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.quantityText,
                quantity >= product.stockQuantity && styles.disabledQuantityText,
              ]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add to Cart Button */}
      <Button
        type="primary"
        style={[
          styles.addToCartButton,
          product.stockQuantity === 0 && styles.disabledAddToCartButton,
        ]}
        onPress={addToCart}
        disabled={product.stockQuantity === 0}
        accessibilityLabel={
          product.stockQuantity === 0 ? "Out of stock" : "Add to cart"
        }
        accessibilityRole="button"
      >
        <View style={styles.buttonContent}>
          {product.stockQuantity === 0 ? (
            <Text style={styles.buttonText}>Hết hàng</Text>
          ) : (
            <>
              <AntDesign name="shoppingcart" size={18} color="#FFFFFF" />
              <Text style={styles.buttonText}>Thêm vào giỏ</Text>
            </>
          )}
        </View>
      </Button>

      {/* Product Specifications and Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Thông số sản phẩm</Text>
        <Text style={styles.productDescription}>
          {productById?.spec || "Không có thông số."}
        </Text>
        <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
        <Text style={styles.productDescription}>
          {product.description || "Không có mô tả."}
        </Text>
      </View>

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
        accessibilityLabel="Previous feedback page"
        accessibilityRole="button"
      >
        <AntDesign
          name="left"
          size={20}
          color={currentPage === 1 ? "#B0BEC5" : "#004D40"}
        />
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
        accessibilityLabel="Next feedback page"
        accessibilityRole="button"
      >
        <AntDesign
          name="right"
          size={20}
          color={currentPage === totalPages ? "#B0BEC5" : "#004D40"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
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
        {/* Fixed Cart Button */}
        <TouchableOpacity
          style={styles.cartFab}
          onPress={() => navigation.navigate("CartScreen")}
          accessibilityLabel="View cart"
          accessibilityRole="button"
        >
          <AntDesign name="shoppingcart" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProductDetail;