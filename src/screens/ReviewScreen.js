import { Alert, StyleSheet, Switch, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../global/COLORS'
import HuaweiMapComp from '../components/HuaweiMapComp';
import { huaweiGetLocation } from '../hms-kit/HuaweiLocation';

const ReviewScreen = ({ navigation, route }) => {
  const [currentLocation, setCurrentLocation] = useState({})
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payment, setPayment] = useState("");

  const newLocation = route?.params || 0;

  const paymentMethod = [
    {
      id: 0,
      method: 'Cash On Delivery'
    },
    {
      id: 1,
      method: 'Paypal'
    },
    {
      id: 2,
      method: 'Card'
    },
  ]

  const handleTogglePayment = (item, index) => {
    setSelectedPayment(index);
    setPayment(item.method)
  }
  const handleCheckout = () => {
    if (selectedPayment !== null) {
      navigation.navigate('ConfirmScreen', { deliveryAddress: newLocation !== 0 ? newLocation : currentLocation, payment })
    } else {
      Alert.alert("", "Please choose your payment method first")
    }
  }

  useEffect(() => {
    huaweiGetLocation(setCurrentLocation);
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign name="arrowleft" size={28} color="black" onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black, paddingLeft: 20, }}>Back To Cart</Text>
      </View>

      <TouchableOpacity style={styles.contentContainer} onPress={() => navigation.navigate('EditMapScreen')} activeOpacity={.8}>
        <View style={styles.contentHeader}>
          <View style={{ flexDirection: 'row' }}>
            <Entypo name="location" size={22} color="black" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.black, marginLeft: 10 }}>Edit Delivery Address</Text>
          </View>
          <View>
            <AntDesign name="edit" size={23} color="black" />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <HuaweiMapComp
            latitude={newLocation !== 0 ? newLocation.latitude : currentLocation.latitude}
            longitude={newLocation !== 0 ? newLocation.longitude : currentLocation.longitude}
            height={150}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black, marginTop: 10 }}>Current Delivery Address:</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.black, marginBottom: 20 }}>{newLocation !== 0 ? newLocation.street : currentLocation.street}</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.contentContainer, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}>
        <View style={[styles.contentHeader, { borderBottomWidth: 1, borderBottomColor: COLORS.primary }]}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="payment" size={22} color="black" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.black, marginLeft: 10 }}>Edit Payment Method</Text>
          </View>
          <View>
            <AntDesign name="edit" size={23} color="black" />
          </View>
        </View>
        <View>
          {paymentMethod.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleTogglePayment(item, index)} style={[styles.paymentButton, { backgroundColor: index === selectedPayment ? COLORS.primary : null }]}>
              {index === 0 ? <MaterialCommunityIcons name="cash" size={22} color="black" />
                : index === 1 ? <Entypo name="paypal" size={22} color="black" />
                  : index === 2 ? <Entypo name="credit-card" size={22} color="black" /> : null}
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black, marginLeft: 15, }}>{item.method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout()}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white, padding: 15 }}> Checkout </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
    elevation: 7
  },
  contentContainer: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    elevation: 7,
    borderWidth: .5,
    marginBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  paymentButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  checkoutButton: {
    backgroundColor: '#CB3526',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 15
  }
})