import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedBlogs, searchBlogs } from "../../redux/slices/blogSlice";
import { approvedBlogsSelector } from "../../redux/selector";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BlogScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const blogData = useSelector(approvedBlogsSelector);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getApprovedBlogs());
  }, [dispatch]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      dispatch(searchBlogs(text));
    } else {
      dispatch(getApprovedBlogs());
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate("ProductDetail", { product: item });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.productPrice}>
        {`${item.price.toLocaleString("vi-VN")} VND`}
      </Text>
    </TouchableOpacity>
  );

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogCard}>
      <View style={styles.blogHeader}>
        <Image
          source={require("../../assets/shopImage.jpg")}
          style={styles.shopImage}
        />
        <View>
          <Text style={styles.blogTitle}>{item.title.toUpperCase()}</Text>
          <Text style={styles.shopName}>{item.shop.name}</Text>
        </View>
      </View>

      <Text style={styles.blogContent} numberOfLines={4}>
        {item.content.replace(/<[^>]+>/g, "")} {/* Strip HTML tags */}
      </Text>

      {item.images && (
        <Image
          source={{ uri: item.images }}
          style={styles.blogImage}
          resizeMode="cover"
        />
      )}

      {item.products && item.products.length > 0 && (
        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Sản phẩm liên quan</Text>
          <FlatList
            data={item.products}
            renderItem={renderProductItem}
            keyExtractor={(product) => product.productId}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Blog</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#FFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bài viết..."
            placeholderTextColor="#B0C4DE"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <FlatList
          data={blogData}
          renderItem={renderBlogItem}
          keyExtractor={(item) => item.blogId}
          contentContainerStyle={styles.listContent}
        />
      </ImageBackground>
    </View>
  );
};

export default BlogScreen;
