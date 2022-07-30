import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteCart, getCart } from '../database/db';


const ConfirmScreen = ({ navigation, route }) => {
  const deliveryAddress = route.params.deliveryAddress;
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [restaurantAddress, setRestaurantAddress] = useState([]);

  useEffect(() => {
    getCart({ setCart, setSubtotal, setRestaurantAddress });
  }, [])

  const handleOrderReceived = () => {
    deleteCart();
    Alert.alert('', 'Thank you for ordering!', [{ text: "Okay", onPress: () => { } }]);
    navigation.navigate('HomeScreen');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name="arrowleft" size={28} color="black" onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black, paddingLeft: 20, }}>Back To Review Payment and Address</Text>
      </View>
      <View style={{ backgroundColor: COLORS.primary, borderRadius: 50, paddingTop: 20, flex: 1, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40, paddingBottom: 20 }}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 40 }}
            source={require('../assets/images/rider.jpg')}
            resizeMode='contain'
          />
          <View style={{ paddingLeft: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>Order Picked Up!</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.black, width: 200, }}>John has picked up your order. Please prepare your payment. Thank you!</Text>
          </View>
        </View>

        <View style={{ backgroundColor: COLORS.white, elevation: 7, borderTopRightRadius: 50, borderTopLeftRadius: 50, paddingTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.black, paddingVertical: 15, paddingLeft: 20 }}>Order Summary</Text>
          {cart.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 1, }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>{item.orderQuantity}</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black, width: 180 }}>{item.foodName}</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>P{item.foodPrice}.00</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.black, paddingVertical: 15, }}>Total (incl. VAT)</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.black, paddingVertical: 15, paddingLeft: 20 }}>P{subtotal}.00</Text>
          </View>
        </View>

        <View style={{ backgroundColor: COLORS.white, paddingBottom: 30 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black, paddingVertical: 5, paddingLeft: 10 }}>Delivery Address</Text>
          <Text style={{ fontSize: 14, color: COLORS.black, paddingHorizontal: 15, marginBottom: 5 }}>{deliveryAddress.street}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black, paddingVertical: 5, paddingLeft: 10 }}>Shop Addresses</Text>
          {
            restaurantAddress.map((item, index) => (
              <View key={index}>
                <Text style={{ fontSize: 14, color: COLORS.black, paddingLeft: 10, paddingVertical: 3 }}>{item}</Text>
              </View>
            ))
          }
        </View>
      </View>
      <TouchableOpacity onPress={() => handleOrderReceived()} style={{ backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginHorizontal: 50, borderRadius: 15, marginBottom: 20 }}>
        <Text style={{ padding: 15, color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>Order Received</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ConfirmScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 20,
    marginBottom: 20,
  },

})