import { Provider } from "@ant-design/react-native";
import React, { useEffect } from "react";
import { ImageBackground, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getPondByID } from "../../../../redux/slices/pondSlice";
import {
  fishByOwnerSelector,
  pondByIdSelector,
} from "../../../../redux/selector";
import { getFishByOwner } from "../../../../redux/slices/fishSlice";

const FishList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const pondById = useSelector(pondByIdSelector);
  const fishByOwner = useSelector(fishByOwnerSelector);
  const userId = route.params.userId;
  const pondID = route.params.pondID;

  useEffect(() => {
    dispatch(getPondByID(pondID));
  }, [pondID, dispatch]);
  useEffect(() => {
    dispatch(getFishByOwner(userId));
  }, [userId, dispatch]);

  // Filter fish to only include those with matching pondID
  const filteredFish = fishByOwner.filter(
    (fish) => fish.pond.pondID === pondID
  );

  return (
    <Provider>
      <ImageBackground
        source={require("../../../../assets/koimain3.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Cá Của Hồ {pondById.name}</Text>
            <View style={{ width: 24 }} />
          </View>

          {filteredFish.length > 0 ? (
            <View style={styles.fishGrid}>
              {filteredFish.map((fish) => (
                <TouchableOpacity
                  key={fish.koiID}
                  style={styles.fishCard}
                  onPress={() =>
                    navigation.navigate("FishDetail", { fish })
                  }
                >
                  <Image
                    source={{
                      uri: fish.image || "https://via.placeholder.com/100",
                    }}
                    style={styles.fishImage}
                  />
                  <Text style={styles.fishName} numberOfLines={1}>
                    {fish.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>Chưa có cá trong ao</Text>
          )}
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
};

export default FishList;