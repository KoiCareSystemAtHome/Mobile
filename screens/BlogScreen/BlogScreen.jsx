import React, { useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedBlogs } from "../../redux/slices/blogSlice";
import { approvedBlogsSelector } from "../../redux/selector";
import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BlogScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const blogData = useSelector(approvedBlogsSelector);
  const { width } = useWindowDimensions(); // For responsive HTML rendering

  useEffect(() => {
    dispatch(getApprovedBlogs());
  }, [dispatch]);

  const renderBlogItem = ({ item }) => (
    <View style={styles.blogCard}>
      {/* Blog Title */}
      <Text style={styles.blogTitle}>{item.title.toUpperCase()}</Text>

      {/* Blog Content */}
      <HTML
        source={{ html: item.content }}
        contentWidth={width - 40} // Adjust content width for padding
        baseStyle={styles.blogContent}
        tagsStyles={{
          h1: styles.blogContentHeading,
          ul: { marginVertical: 5 },
          li: { marginVertical: 2, color: "#333" },
          ol: { marginVertical: 5 },
        }}
      />

      {/* Blog Image */}
      {item.images && (
        <Image source={{ uri: item.images }} style={styles.blogImage} />
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
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        <FlatList
          data={blogData}
          renderItem={renderBlogItem}
          keyExtractor={(item) => item.blogId}
          contentContainerStyle={styles.listContent}
        />
      </ImageBackground>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="home" size={24} color="#666" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome5 name="chart-bar" size={24} color="#6497B1" />
          <Text style={[styles.footerText, { color: "#6497B1" }]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="question-circle" size={24} color="#666" />
          <Text style={styles.footerText}>FAQ's</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogScreen;