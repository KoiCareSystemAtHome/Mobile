import React, { useEffect, useState } from "react"; // Added useState
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput, // Added TextInput
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedBlogs, searchBlogs } from "../../redux/slices/blogSlice";
import { approvedBlogsSelector } from "../../redux/selector";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BlogScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const blogData = useSelector(approvedBlogsSelector);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    dispatch(getApprovedBlogs());
  }, [dispatch]);

  // Handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      dispatch(searchBlogs(text));
    } else {
      dispatch(getApprovedBlogs()); // Reset to all blogs when search is cleared
    }
  };

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogCard}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Image
          source={require("../../assets/shopImage.jpg")}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            fontFamily: "serif",
            width: 250,
          }}
        >
          {item.title.toUpperCase()}
        </Text>
      </View>

      <Text
        style={{
          ...styles.blogContent,
          paddingLeft: 8,
          paddingRight: 8,
          textAlign: "justify",
        }}
      >
        {item.content}
      </Text>

      {item.images && (
        <Image
          source={{ uri: item.images }}
          style={[styles.blogImage, { paddingBottom: 20 }]}
        />
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
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Blog</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" />
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              fontSize: 16,
            }}
            placeholder="Search blog titles..."
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