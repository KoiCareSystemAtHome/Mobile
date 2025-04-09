import React, { useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedBlogs } from "../../redux/slices/blogSlice";
import { approvedBlogsSelector } from "../../redux/selector";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BlogScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const blogData = useSelector(approvedBlogsSelector);

  useEffect(() => {
    dispatch(getApprovedBlogs());
  }, [dispatch]);

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogCard}>
      {/* Blog Title */}
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
            width:250
          }}
        >
          {item.title.toUpperCase()}
        </Text>
      </View>

      {/* Blog Content */}
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

      {/* Blog Image */}
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
