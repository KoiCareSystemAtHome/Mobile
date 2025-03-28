import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/slices/productSlice";
import { getCategory } from "../../redux/slices/categorySlice";
import { categorySelector, productSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Shopping = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState(false);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 10 products per page

  const products = useSelector(productSelector);
  const categories = useSelector(categorySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0].categoryId);
    }
  }, [categories]);

  // Filter products by selected category and search text
  const filteredProducts = products?.filter(
    (product) =>
      product.categoryId === selectedCategory &&
      product.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

  // Slice filtered products for current page
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        setCart(cartData ? JSON.parse(cartData) : null);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ImageBackground 
    source={require('../../assets/koiimg.jpg')}  
    style={styles.background}
    resizeMode="cover"
  >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <AntDesign name="shoppingcart" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome name="search" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Category Selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories?.map((category) => (
          <TouchableOpacity
            key={category.categoryId}
            style={[
              styles.categoryButton,
              selectedCategory === category.categoryId && styles.activeCategory,
            ]}
            onPress={() => {
              setSelectedCategory(category.categoryId);
              setCurrentPage(1); // Reset to first page when category changes
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.categoryId &&
                  styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={paginatedProducts} // Use paginated products instead of filteredProducts
        keyExtractor={(item) => item.productId}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}
          onPress={() => {
            navigation.navigate("ProductDetail", { product: item });
          }}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.productName}</Text>
            {item?.shop && <Text style={styles.productName}>{item.shop}</Text>}
            <Text style={styles.productPrice}>{item.price} VND</Text>
          </TouchableOpacity>
        )}
      />

      {/* Pagination Controls */}
      {filteredProducts?.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationText}>
              <AntDesign name="left" size={20} color="black" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
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
            <Text style={styles.paginationText}>
              <AntDesign name="right" size={20} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
     </ImageBackground>
  );
};

export default Shopping;