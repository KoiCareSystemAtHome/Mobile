import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
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
        // Note: cart state is set but unused; consider using it or removing
        // setCart(cartData ? JSON.parse(cartData) : null);
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
          return Object.keys(p.parameterImpacts);
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
      const matchesBrand = filters.brand
        ? product.brand === filters.brand
        : true;
      const matchesShopName = filters.shopName
        ? product.shopName === filters.shopName
        : true;
      const matchesParameterImpacts = filters.parameterImpacts
        ? product.parameterImpacts &&
          filters.parameterImpacts in product.parameterImpacts
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
      style={[
        styles.filterOption,
        filters[filterType] === item && styles.selectedOption,
      ]}
    >
      <Text
        style={[
          styles.filterOptionText,
          filters[filterType] === item && styles.selectedOptionText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs")}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <AntDesign name="left" size={24} color="#26A69A" />
        </TouchableOpacity>
        <Text style={styles.title}>Cửa Hàng</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CartScreen")}
          accessibilityLabel="View cart"
          accessibilityRole="button"
        >
          <AntDesign name="shoppingcart" size={28} color="#26A69A" />
        </TouchableOpacity>
      </View>

      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchText}
            onChangeText={setSearchText}
            accessibilityLabel="Search products"
          />
          <FontAwesome
            name="search"
            size={20}
            color="#00695C"
            style={styles.searchIcon}
          />
        </View>
        <TouchableOpacity
          onPress={toggleFilterDrawer}
          style={styles.filterButton}
          accessibilityLabel="Open filters"
          accessibilityRole="button"
        >
          <AntDesign name="filter" size={20} color="#004D40" />
          <Text style={styles.filterText}>Lọc</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer Overlay */}
      {isFilterOpen && (
        <TouchableWithoutFeedback onPress={toggleFilterDrawer}>
          <View style={styles.drawerOverlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Animated Filter Drawer */}
      <Animated.View style={[styles.filterDrawer, animatedStyle]}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Bộ Lọc</Text>
          <TouchableOpacity
            onPress={toggleFilterDrawer}
            accessibilityLabel="Close filter drawer"
            accessibilityRole="button"
          >
            <AntDesign name="close" size={24} color="#004D40" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={[
            {
              title: "Tên Danh Mục",
              section: "categoryName",
              items: uniqueCategoryNames,
            },
            { title: "Thương Hiệu", section: "brand", items: uniqueBrands },
            { title: "Tên Cửa Hàng", section: "shopName", items: uniqueShopNames },
            {
              title: "Tác Động Thông Số",
              section: "parameterImpacts",
              items: uniqueParameterImpacts,
            },
          ]}
          keyExtractor={(item) => item.section}
          renderItem={({ item }) => (
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <Text style={styles.filterLabel}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() => toggleSection(item.section)}
                  accessibilityLabel={`Toggle ${item.title} section`}
                  accessibilityRole="button"
                >
                  <AntDesign
                    name={openSections[item.section] ? "minus" : "plus"}
                    size={20}
                    color="#004D40"
                  />
                </TouchableOpacity>
              </View>
              {openSections[item.section] && (
                <View style={styles.filterOptions}>
                  {item.items.map((option) =>
                    renderFilterOption(option, item.section)
                  )}
                </View>
              )}
            </View>
          )}
          contentContainerStyle={styles.filterScrollContainer}
        />
      </Animated.View>

      {/* Product List */}
      <FlatList
        data={paginatedProducts}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => {
          const isOutOfStock = item.stockQuantity === 0;

          return (
            <TouchableOpacity
              style={[
                styles.productCard,
                isOutOfStock && styles.outOfStockCard,
              ]}
              onPress={() => {
                if (!isOutOfStock) {
                  navigation.navigate("ProductDetail", { product: item });
                }
              }}
              disabled={isOutOfStock}
              accessibilityLabel={item.productName}
              accessibilityRole="button"
            >
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.productImage,
                  isOutOfStock && styles.outOfStockImage,
                ]}
              />
              <View style={styles.textContainer}>
                <Text
                  style={styles.productName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.productName}
                </Text>
                <Text style={styles.shopName}>{item.shopName}</Text>
                <Text style={styles.productPrice} numberOfLines={1}>
                  {item.price.toLocaleString("vi-VN")} VND
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.addToCartButton,
                    isOutOfStock && styles.outOfStockButton,
                  ]}
                  onPress={() => {
                    if (!isOutOfStock) {
                      navigation.navigate("ProductDetail", { product: item });
                    }
                  }}
                  disabled={isOutOfStock}
                  accessibilityLabel={
                    isOutOfStock ? "Out of stock" : "Add to cart"
                  }
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.addToCartText,
                      isOutOfStock && styles.outOfStockText,
                    ]}
                  >
                    {isOutOfStock ? "Hết Hàng" : "Thêm Vào Giỏ"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
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
            accessibilityLabel="Previous page"
            accessibilityRole="button"
          >
            <AntDesign
              name="left"
              size={20}
              color={currentPage === 1 ? "#B0BEC5" : "#004D40"}
            />
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
            accessibilityLabel="Next page"
            accessibilityRole="button"
          >
            <AntDesign
              name="right"
              size={20}
              color={currentPage === totalPages ? "#B0BEC5" : "#004D40"}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Fixed Cart Button */}
      <TouchableOpacity
        style={styles.cartFab}
        onPress={() => navigation.navigate("CartScreen")}
        accessibilityLabel="View cart"
        accessibilityRole="button"
      >
        <AntDesign name="shoppingcart" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Shopping;