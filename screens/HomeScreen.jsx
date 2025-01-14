import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Card, Button, Badge } from "@ant-design/react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Image } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAnimation] = useState(new Animated.Value(-250)); // Drawer starts off-screen

  const toggleDrawer = () => {
    if (drawerOpen) {
      // Close Drawer
      Animated.timing(drawerAnimation, {
        toValue: -250, // Hide the drawer
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(false));
    } else {
      // Open Drawer
      Animated.timing(drawerAnimation, {
        toValue: 0, // Slide the drawer into view
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDrawerOpen(true));
    }
  };

  return (
    <ImageBackground
      source={require("../assets/koimain3.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { left: drawerAnimation }]}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(drawerAnimation, {
                toValue: -250,
                duration: 300,
                useNativeDriver: false,
              }).start(() => setDrawerOpen(false)); // Close the drawer
            }}
            style={styles.backArrow}
          >
            <FontAwesome name="arrow-left" size={24} color="#6497B1" />
          </TouchableOpacity>
          <View style={styles.drawerProfile}>
            <FontAwesome name="user-circle" size={50} color="#6497B1" />
            <Text style={styles.drawerUserName}>User</Text>
            <Text style={styles.drawerUserRole}>UX/UI Designer</Text>
          </View>
        </View>
        {/* Divider Line */}
        <View style={styles.divider} />
        <View style={styles.drawerItems}>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/comments.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/bookmark.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/download-removebg-preview (1) 1.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/user.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/history_svgrepo.com.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Purchase History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
          <Image
          source={require('../assets/Calendar.png')} 
          style={styles.drawerItemImage} 
        />
            <Text style={styles.drawerItemText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.container}>
        {/* Header with Drawer Toggle */}
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Entypo name="menu" size={40} color="#6497B1" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="user-circle" size={40} color="#6497B1" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.userText}>Hi User</Text>
        </View>

        {/* Deposit Section */}
        <Card style={styles.depositCard}>
          <Card.Header
            title={
              <Text style={styles.depositText}>
                <Text style={styles.amount}>100000 </Text> VND
              </Text>
            }
            extra={
              <TouchableOpacity>
                <Text style={styles.depositLink}>Deposit</Text>
              </TouchableOpacity>
            }
          />
          <Card.Body>
            <Text style={styles.cardDescription}>
              Deposit funds now to unlock premium Koi care-system services!
            </Text>
          </Card.Body>
        </Card>

        {/* Section: My Koi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Koi</Text>
          <Badge text="i" style={styles.badge} />
        </View>

        <View style={styles.buttonGroup}>
          <Button onPress={() => navigation.navigate('FishStatistic')} style={styles.button}>Fish Statistic</Button>
          <Button style={styles.button}>Health Food</Button>
          <Button style={styles.button}>Fish Food</Button>
        </View>

        {/* Section: My Pond */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Pond</Text>
          <Badge text="i" style={styles.badge} />
        </View>

        <View style={styles.buttonGroup}>
          <Button onPress={() => navigation.navigate('PondStatistic')} type="primary" style={styles.pondButton}>
            Pond Statistic
          </Button>
          <Button type="primary" style={styles.pondButton}>
            Water Parameters
          </Button>
          <Button type="primary" style={styles.pondButton}>
            Food Calculator
          </Button>
          <Button type="primary" style={styles.pondButton}>
            Salt Calculator
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  userText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  depositCard: {
    marginBottom: 20,
    backgroundColor: "#4da6ff",
    borderRadius: 15,
    overflow: "hidden",
  },
  depositText: {
    fontSize: 24,
    color: "#fff",
  },
  amount: {
    fontWeight: "bold",
  },
  depositLink: {
    color: "#fff",
    fontSize: 18,
  },
  cardDescription: {
    color: "#fff",
    fontSize: 14,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    marginLeft: 10,
    backgroundColor: "#ff4d4f",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B4FBE2",
    width: "48%",
    marginBottom: 15,
    borderWidth: 0,
    color: "black",
    height: 60,
    borderRadius: 20,
  },
  pondButton: {
    backgroundColor: "#7EABC5",
    width: "48%",
    marginBottom: 15,
    borderWidth: 0,
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#A7C4B6",
    paddingHorizontal: 20,
    paddingVertical: 30,
    zIndex: 1,
  },
  drawerHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  drawerProfile: {
    marginTop: 10,
  },
  drawerUserName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  drawerUserRole: {
    fontSize: 14,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  drawerItemImage: {
  width: 20,    // Adjust the width as needed
  height: 20,   // Adjust the height as needed
},
  drawerItems: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
});

export default HomeScreen;
