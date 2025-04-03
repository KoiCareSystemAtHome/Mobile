import React, { useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  LogBox,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedBlogs } from "../../redux/slices/blogSlice";
import { approvedBlogsSelector } from "../../redux/selector";
import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


LogBox.ignoreLogs([
  "Warning: TNodeChildrenRenderer: Support for defaultProps will be removed",
  "Warning: Text strings must be rendered within a <Text> component",
  "Warning: TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "Warning: MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.",
  "Warning: TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "Warning: TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",

]);
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
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
      <Image
        source={require("../../assets/shopImage.jpg")}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{
         fontSize: 12, fontWeight: "bold", fontFamily: "serif",
         width: 300}}>
        {item.title.toUpperCase()}
      </Text>
      </View>


      {/* Blog Content */}
      <HTML
        source={{ html: item.content }}
        contentWidth={width - 40} // Adjust content width for padding
        baseStyle={{ ...styles.blogContent,
           paddingLeft: 8, 
           paddingRight:8,
           textAlign: "justify" }}
        tagsStyles={{
          h1: styles.blogContentHeading,
          ul: { marginVertical: 5 },
          li: { marginVertical: 2, color: "#333" },
          ol: { marginVertical: 5 },
        }}
      />

      {/* Blog Image */}
      {item.images && (
        <Image source={{ uri: item.images }} style={[styles.blogImage, { paddingBottom: 20 }]} />
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
    </View>
  );
};

export default BlogScreen;