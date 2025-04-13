import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/slices/productSlice";
import { productSelector } from "../../redux/selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Shopping = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categoryName: "",
    brand: "",
    shopName: "",
    parameterImpacts: "",
  });
  const [openSections, setOpenSections] = useState({
    categoryName: false,
    brand: false,
    shopName: false,
    parameterImpacts: false,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const products = useSelector(productSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        setCart(cartData ? JSON.parse(cartData) : null);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    getData();
  }, []);

  // Animation setup for filter drawer
  const translateX = useSharedValue(-300);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggleFilterDrawer = () => {
    translateX.value = withTiming(isFilterOpen ? -300 : 0, { duration: 300 });
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle a filter section (open/close)
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Extract unique values for filter options with error handling
  const uniqueCategoryNames = [
    ...new Set(products?.map((p) => p.categoryName).filter(Boolean)),
  ];
  const uniqueBrands = [
    ...new Set(products?.map((p) => p.brand).filter(Boolean)),
  ];
  const uniqueShopNames = [
    ...new Set(products?.map((p) => p.shopName).filter(Boolean)),
  ];
  const uniqueParameterImpacts = [
    ...new Set(
      products?.flatMap((p) => {
        if (p.parameterImpacts && typeof p.parameterImpacts === "object") {
          return Object.keys(p.parameterImpacts); // Only get parameter names
        }
        return [];
      })
    ),
  ].filter(Boolean);

  const filteredProducts = products?.filter((product) => {
    try {
      const matchesSearch = product.productName
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategoryName = filters.categoryName
        ? product.categoryName === filters.categoryName
        : true;
      const matchesBrand = filters.brand ? product.brand === filters.brand : true;
      const matchesShopName = filters.shopName
        ? product.shopName === filters.shopName
        : true;
      const matchesParameterImpacts = filters.parameterImpacts
        ? product.parameterImpacts &&
          filters.parameterImpacts in product.parameterImpacts // Check if parameter exists
        : true;

      return (
        matchesSearch &&
        matchesCategoryName &&
        matchesBrand &&
        matchesShopName &&
        matchesParameterImpacts
      );
    } catch (error) {
      console.error("Error filtering product:", product, error);
      return false;
    }
  });

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Render function for filter options
  const renderFilterOption = (item, filterType) => (
    <TouchableOpacity
      key={`${filterType}-${item}`}
      onPress={() => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: prevFilters[filterType] === item ? "" : item,
        }));
      }}
    >
      <Text
        style={[
          styles.filterOption,
          filters[filterType] === item && styles.selectedOption,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/koiimg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cửa Hàng</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <AntDesign name="shoppingcart" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome name="search" size={20} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFilterDrawer} style={styles.filterButton}>
          <AntDesign name="filter" size={20} color="#000" />
          <Text style={styles.filterText}>Lọc</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer Overlay (for press outside to close) */}
      {isFilterOpen && (
        <TouchableWithoutFeedback onPress={toggleFilterDrawer}>
          <View style={styles.drawerOverlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Animated Filter Drawer */}
      <Animated.View style={[styles.filterDrawer, animatedStyle]}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Sắp Xếp</Text>
          <TouchableOpacity onPress={toggleFilterDrawer}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterScrollContainer}>
          {/* Category Name Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterSectionHeader}>
              <Text style={styles.filterLabel}>Tên Danh Mục</Text>
              <TouchableOpacity onPress={() => toggleSection("categoryName")}>
                <AntDesign
                  name={openSections.categoryName ? "minus" : "plus"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {openSections.categoryName && (
              <View>
                {uniqueCategoryNames.map((item) =>
                  renderFilterOption(item, "categoryName")
                )}
              </View>
            )}
          </View>

          {/* Brand Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterSectionHeader}>
              <Text style={styles.filterLabel}>Thương Hiệu</Text>
              <TouchableOpacity onPress={() => toggleSection("brand")}>
                <AntDesign
                  name={openSections.brand ? "minus" : "plus"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {openSections.brand && (
              <View>
                {uniqueBrands.map((item) => renderFilterOption(item, "brand"))}
              </View>
            )}
          </View>

          {/* Shop Name Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterSectionHeader}>
              <Text style={styles.filterLabel}>Tên Cửa Hàng</Text>
              <TouchableOpacity onPress={() => toggleSection("shopName")}>
                <AntDesign
                  name={openSections.shopName ? "minus" : "plus"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {openSections.shopName && (
              <View>
                {uniqueShopNames.map((item) =>
                  renderFilterOption(item, "shopName")
                )}
              </View>
            )}
          </View>

          {/* Parameter Impacts Filter */}
          <View style={styles.filterSection}>
            <View style={styles.filterSectionHeader}>
              <Text style={styles.filterLabel}>Tác Động Thông Số</Text>
              <TouchableOpacity onPress={() => toggleSection("parameterImpacts")}>
                <AntDesign
                  name={openSections.parameterImpacts ? "minus" : "plus"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {openSections.parameterImpacts && (
              <View>
                {uniqueParameterImpacts.map((item) =>
                  renderFilterOption(item, "parameterImpacts")
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Product List */}
      <FlatList
        data={paginatedProducts}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => {
              navigation.navigate("ProductDetail", { product: item });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.shopName}>{item.shopName}</Text>
            <View style={styles.priceAndButtonContainer}>
              <Text style={styles.productPrice}>
                {item.price.toLocaleString("vi-VN")} VND
              </Text>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
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