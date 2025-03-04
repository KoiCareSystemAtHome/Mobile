import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Profile = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken"); 
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem("user");
        setIsLoggedIn(value ? JSON.parse(value) : null);
        const token = await AsyncStorage.getItem("accessToken");
        setToken(token);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);


  return (
    <ImageBackground
      source={require("../../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sideHeader} onPress={()=>{navigation.navigate("EditProfile")}}>Edit</Text>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.sideHeader} >
            Logout
          </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: isLoggedIn.avatar }} // Replace with actual image URL
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIconWrapper} onPress={()=>{navigation.navigate("EditProfile")}}>
              <FontAwesome name="pencil" size={24} color="black" style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{isLoggedIn?.name}</Text>
          <Text style={styles.profileEmail}>{isLoggedIn?.email}</Text>
          {/* <Text style={styles.profilePhone}>+1234567890</Text> */}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;
