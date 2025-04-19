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
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          quantity,
          image: product.image,
          shopId: product.shopId,
          weight: product.weight,
        });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      navigation.navigate("Shopping");
      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  console.log(product);

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
        <Text style={styles.feedbackMemberName}>{item.memberName}:</Text>
        <Text style={styles.feedbackRating}>Chất lượng: {item.rate}/5</Text>
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
        <AntDesign name="left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Product Info */}
      <Text style={styles.productTitle}>{product.productName}</Text>
      <Text style={styles.shopName}>{product.shopName}</Text>

      <View
        style={[
          styles.ratingContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text style={styles.stockQuantity}>
          Còn: {product.stockQuantity} sản phẩm
        </Text>
        <Text style={[styles.averageRating, { marginLeft: 10 }]}>
          <AntDesign name="star" size={16} color="#FFD700" />
          {isNaN(averageRating) ||
          averageRating === null ||
          averageRating === undefined
            ? 0
            : averageRating}
          ({feedbacks.length} đánh giá)
        </Text>
      </View>

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

      <View style={styles.buttonContainer}>
        <Button
          type="primary"
          style={styles.addToCartButton}
          onPress={addToCart}
          disabled={product.stockQuantity === 0}
        >
          <View style={styles.buttonContent}>
            {product.stockQuantity === 0 ? (
              <Text style={styles.buttonText}>Hết hàng</Text>
            ) : (
              <>
                <AntDesign name="shoppingcart" size={18} color="#fff" />
                <Text style={styles.buttonText}>Thêm vào giỏ</Text>
              </>
            )}
          </View>
        </Button>
      </View>

      <Text style={styles.productDescription}> {productById?.spec}</Text>

      <Text style={styles.productDescription}>{product.description}</Text>

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
        <Text style={styles.paginationText}>{" < "}</Text>
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
        <Text style={styles.paginationText}>{" > "}</Text>
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
        />
      </View>
    </ImageBackground>
  );
};

export default ProductDetail;
