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
import { createOrder } from "../../redux/slices/ghnSlice";
import { loadAsync } from "expo-font";
import { getWallet } from "../../redux/slices/authSlice";
import { walletSelector } from "../../redux/selector";
import RadioGroup from "react-native-radio-buttons-group";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const walletData = useSelector(walletSelector);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD
  const shippingCost = 8.0;
  const tax = 0.0;
  const total = subtotal + shippingCost + tax;

  // Define radio buttons data directly with selected state based on paymentMethod
  const radioButtons = [
    {
      id: "COD",
      label: "Cash on Delivery (COD)",
      value: "COD",
      selected: paymentMethod === "COD",
    },
    {
      id: "Online Banking",
      label: "Online Banking",
      value: "Online Banking",
      selected: paymentMethod === "Online Banking",
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
          const newQuantity =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);
    setCart(updatedCart);
    calculateSubtotal(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    const order = {
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

    if (paymentMethod === "Online Banking") {
      if (walletData?.amount < total) {
        Toast.fail("Insufficient wallet balance");
        return;
      }

      dispatch(createOrder(order))
        .unwrap()
        .then(async (res) => {
          const orderIds = res.map((item) => item.message);
          console.log("Order IDs:", orderIds);
          Toast.success("Order Created Successfully");
          await AsyncStorage.removeItem("cart");
          setTimeout(() => {
            navigation.navigate("Shopping");
          }, 2000);
        })
        .catch((error) => {
          Toast.fail("Failed to create order");
          console.error(error);
        });
    } else {
      dispatch(createOrder(order))
        .unwrap()
        .then(async (res) => {
          Toast.success("Order Created Successfully");
          await AsyncStorage.removeItem("cart");
          setTimeout(() => {
            navigation.navigate("Shopping");
          }, 2000);
        })
        .catch((error) => {
          Toast.fail("Failed to create order");
          console.error(error);
        });
    }
  };

  const onPressRadioButton = (radioButtonsArray) => {
    const selected = radioButtonsArray?.find((rb) => rb.selected);
    if (selected) {
      setPaymentMethod(selected.value);
    }
  };

  if (!fontLoaded) {
    return null; // Or a loading indicator
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
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Cart</Text>
          <TouchableOpacity>
            <FontAwesome name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Wallet Amount */}
        <View style={styles.walletContainer}>
          <Text style={styles.walletText}>
            Wallet Balance: ${walletData?.amount?.toFixed(2) || "0.00"}
          </Text>
        </View>

        {address ? (
          <View style={styles.addressInfo}>
            <Text>{`${address.provinceName}, ${address.districtName}, ${address.wardName}`}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddressForm")}>
              <Text style={{ color: "blue" }}>Change address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("AddressForm")}>
            <View style={styles.addressBar}>
              <Text>Add an address</Text>
              <AntDesign name="arrowright" size={20} color="black" />
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
              <View>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productPrice}>{`${item.price.toFixed(
                    0
                  )}đ`}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.productId, "decrease")}
                  >
                    <AntDesign name="minus" size={16} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.productId, "increase")}
                  >
                    <AntDesign name="plus" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryPrice}>{`$${subtotal.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Shipping Cost</Text>
          <Text style={styles.summaryPrice}>{`$${shippingCost.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Tax</Text>
          <Text style={styles.summaryPrice}>{`$${tax.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>{`$${total.toFixed(2)}`}</Text>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodLabel}>Payment Method:</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="column"
            containerStyle={styles.radioGroup}
          />
        </View>

        {/* Coupon Input */}
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholderTextColor="#9a979f"
            placeholder="Enter Coupon Code"
          />
          <TouchableOpacity style={styles.applyCouponButton}>
            <AntDesign name="arrowright" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Checkout Button */}
        <Button
          type="primary"
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Button>
      </ImageBackground>
    </Provider>
  );
};

export default CartScreen;