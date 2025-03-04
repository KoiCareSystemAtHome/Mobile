import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { styles } from "./styles"; // Assume styles are in styles.js
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
  
  const products = useSelector(productSelector);
  const categories = useSelector(categorySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    // Set default category when categories are loaded
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


  useEffect(() => {
    const getData = async (key) => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        setCart(cartData ? JSON.parse(cartData) : null);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);


  return (
    <View style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <AntDesign name="shoppingcart" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={28} color="black" />
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
            onPress={() => setSelectedCategory(category.categoryId)}
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
        data={filteredProducts}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productPrice}>{item.price} VND</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                navigation.navigate("ProductDetail", { product: item });
              }}
            >
              <Text style={styles.addToCartText}>Add to cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Shopping;
