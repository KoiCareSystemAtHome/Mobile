import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button, Provider, Toast } from "@ant-design/react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, updateOrderStatus } from "../../redux/slices/ghnSlice";
import { loadAsync } from "expo-font";
import { getWallet } from "../../redux/slices/authSlice";
import { walletSelector } from "../../redux/selector";
import RadioGroup from "react-native-radio-buttons-group";
import { payOrder, payPackage } from "../../redux/slices/transactionSlice";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const walletData = useSelector(walletSelector);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [address, setAddress] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Updated to store both name and phoneNumber
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const tax = 0.0;
  const total = subtotal;

  const radioButtons = [
    {
      id: "COD",
      label: "Thanh toán khi nhận hàng (COD)",
      value: "COD",
    },
    {
      id: "Online Banking",
      label: "Thanh toán bằng ví",
      value: "Online Banking",
    },
  ];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCart(parsedCart);
          calculateSubtotal(parsedCart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("address");
        setAddress(value ? JSON.parse(value) : null);
        const recipientInfo = await AsyncStorage.getItem("userInfo");
        setUserInfo(recipientInfo ? JSON.parse(recipientInfo) : null); // Store name and phoneNumber
        const userInfo = await AsyncStorage.getItem("user");
        setIsLoggedIn(userInfo ? JSON.parse(userInfo) : null);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      });
      setFontLoaded(true);
      Toast.config({ duration: 2 });
    };

    loadFontAsync();
  }, []);

  useEffect(() => {
    if (isLoggedIn?.id) {
      dispatch(getWallet(isLoggedIn.id));
    }
  }, [cart, isLoggedIn, dispatch]);

  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const handleQuantityChange = async (productId, type) => {
    let updatedCart = cart
      .map((item) => {
        if (item.productId === productId) {
          if (type === "increase") {
            // Only increase quantity if it's less than stockQuantity
            if (item.quantity < item.stockQuantity) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item; // No change if quantity equals stockQuantity
          } else if (type === "decrease") {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
    calculateSubtotal(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    const name = userInfo?.name || "Người nhận";
    const phoneNumber = userInfo?.phoneNumber || "Số điện thoại";

    // Calculate total weight of the cart
    const totalWeight = cart.reduce((acc, item) => acc + (item.weight * item.quantity), 0);

    // Check if total weight exceeds 50,000 grams
    if (totalWeight > 50000) {
      Toast.fail("Total weight exceeds 50,000 grams. Cannot create order.");
      return;
    }

    const order = {
      name,
      phoneNumber,
      address,
      accountId: isLoggedIn?.id,
      orderDetails: cart.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      shipFee: 10,
      shipType: "string",
      status: "Pending",
      note: "string",
      paymentMethod: paymentMethod,
    };

    if (address === null && userInfo === null) {
      Toast.fail("Please provide recipient information and address");
      return;
    } else {
      if (paymentMethod === "Online Banking") {
        if (walletData?.amount < total) {
          Toast.fail("Insufficient wallet balance");
          return;
        }

        dispatch(createOrder(order))
          .unwrap()
          .then(async (res) => {
            const orderIds = res.map((item) => item.message);
            const email = isLoggedIn?.email;
            console.log(email, orderIds);
            const values = { email, orderIds };
            console.log(values);
            dispatch(payOrder(values))
              .unwrap()
              .then((res) => {
                if (!res) {
                  Toast.fail("Failed to pay order");
                } else {
                  dispatch(getWallet(isLoggedIn?.id));
                  Toast.success("Order Paid Successfully");
                  AsyncStorage.removeItem("cart");
                  setTimeout(() => {
                    navigation.navigate("Shopping");
                  }, 100);
                }
              });
          })
          .catch((error) => {
            Toast.fail("Failed to pay order");
            console.error(error);
          });
      } else {
        dispatch(createOrder(order))
          .unwrap()
          .then(async (res) => {
            if (res !== undefined) {
              Toast.success("Order Created Successfully");
              await AsyncStorage.removeItem("cart");
              setTimeout(() => {
                navigation.navigate("Shopping");
              }, 1000);
            }
          })
          .catch((error) => {
            Toast.fail("Failed to create order");
            console.error(error);
          });
      }
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/koimain3.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay} />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
            <AntDesign name="left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Giỏ Hàng</Text>
          <TouchableOpacity>
            <FontAwesome name="bell" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Wallet Amount */}
        <View style={styles.walletContainer}>
          <Text style={styles.walletText}>
            Số dư ví: {(walletData?.amount).toLocaleString("vi-VN") || "0.00"} VND
          </Text>
        </View>

        {/* Recipient and Address Info */}
        {address && userInfo ? (
          <View style={styles.addressInfo}>
            <Text style={styles.addressText}>
              {`${userInfo.name} | ${userInfo.phoneNumber}`}
            </Text>
            <Text style={styles.addressText}>
              {`${address.provinceName}, ${address.districtName}, ${address.wardName}`}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddressForm")}
              style={styles.changeAddressButton}
            >
              <Text style={styles.changeAddressText}>Thay đổi địa chỉ</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("AddressForm")}>
            <View style={styles.addressBar}>
              <Text style={styles.addressBarText}>Thêm địa chỉ</Text>
              <AntDesign name="arrowright" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        )}

        {/* Cart Items */}
        <FlatList
          data={cart}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>
                  {`${item.price.toLocaleString("vi-VN")} VND`}
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      handleQuantityChange(item.productId, "decrease")
                    }
                  >
                    <AntDesign name="minus" size={16} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      item.quantity >= item.stockQuantity && {backgroundColor:"#ddd"},
                    ]}
                    onPress={() =>
                      handleQuantityChange(item.productId, "increase")
                    }
                    disabled={item.quantity >= item.stockQuantity}
                  >
                    <AntDesign name="plus" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Cân nặng</Text>
            <Text style={styles.summaryPrice}>
              {`${cart.reduce((acc, item) => acc + (item.weight * item.quantity), 0)}g`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>{`${total.toLocaleString("vi-VN")} VND`}</Text>
          </View>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodLabel}>Phương thức thanh toán</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setPaymentMethod}
            selectedId={paymentMethod}
            layout="column"
            containerStyle={styles.radioGroup}
            labelStyle={styles.radioText}
          />
        </View>

        {/* Checkout Button */}
        <Button
          type="primary"
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </Button>
      </ImageBackground>
    </Provider>
  );
};

export default CartScreen;