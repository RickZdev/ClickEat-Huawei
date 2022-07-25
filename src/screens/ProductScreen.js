import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../global/COLORS'

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { addToCart, getCart } from '../database/db';

const ProductScreen = ({ navigation, route }) => {
  const product = route.params;
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0)
  const [cart, setCart] = useState([]);

  useState(() => {
    getCart({ setCart, setSubtotal });
  }, [])

  const handleAddToCart = (product) => {
    if (quantity > 0) {
      let tempDb = [];
      tempDb = cart.filter(item => {
        console.log(item._id, product._id);
        if (item._id === product._id) {
          return item;
        }
      })

      if (tempDb.length === 0) {
        const data = { ...product, orderQuantity: quantity }
        addToCart(data);
      } else {
        Alert.alert('', 'Product Already in the Cart!', [{ text: "Try again", onPress: () => { } }]);
      }
    } else {
      Alert.alert('', 'Add a quantity!', [{ text: "Try again", onPress: () => { } }]);
    }
  }

  const handleMinus = () => {
    if (quantity <= 0) {
      Alert.alert('', 'Invalid quantity!', [{ text: "Try again", onPress: () => { } }]);
    } else {
      setQuantity(prev => prev - 1);
    }
  }
  const handleAdd = () => {
    setQuantity(prev => prev + 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButton}>
          <AntDesign name="arrowleft" size={28} color="white" onPress={() => navigation.goBack()} />
          <FontAwesome5 name="shopping-bag" size={24} color="white" onPress={() => navigation.navigate('CartScreen')} />
        </View>
      </View>
      <View style={styles.contentImage}>
        <View style={styles.contentImageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.foodImage }}
              resizeMode='cover'
              style={styles.image}
            />
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleMinus}>
              <Entypo name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold', marginHorizontal: 15 }}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleAdd}>
              <Entypo name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.contentDetails}>
        <View style={styles.contentDetailsWrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: 'bold', width: 250 }}>{product.foodName}</Text>
            <Text style={{ fontSize: 20, color: COLORS.white, fontWeight: 'bold' }}>P{product.foodPrice}.00</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="restaurant-menu" size={16} color="black" />
              <Text style={{ fontSize: 12, color: COLORS.gray, fontWeight: '400', marginLeft: 7 }}>{product.foodRestaurant}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="location" size={16} color="black" />
              <Text style={{ fontSize: 12, color: COLORS.gray, fontWeight: '400', marginLeft: 7 }}>{product.foodLocation}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="delivery-dining" size={18} color="black" />
              <Text style={{ fontSize: 14, color: COLORS.gray, fontWeight: 'bold', marginLeft: 5 }}>Free</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="clockcircle" size={18} color="black" />
              <Text style={{ fontSize: 14, color: COLORS.gray, fontWeight: 'bold', marginLeft: 5 }}>{product.foodDeliveryTime}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="star" size={20} color="black" />
              <Text style={{ fontSize: 14, color: COLORS.gray, fontWeight: 'bold', marginLeft: 2 }}>{product.foodRating}</Text>
            </View>
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginBottom: 5 }}>Description</Text>
            <Text>{product.foodDescription}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(product)}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black, marginRight: 5 }}> Add to Cart </Text>
            <AntDesign name="shoppingcart" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 140,
    elevation: 10,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  contentImage: {
    backgroundColor: COLORS.primary,
  },
  contentImageWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    zIndex: 300,
    elevation: 7,
    top: -60,
    width: 250,
    height: 210,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 40,
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  quantityContainer: {
    position: 'relative',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  contentDetails: {
    flex: 1,
    backgroundColor: COLORS.gray
  },
  contentDetailsWrapper: {
    backgroundColor: COLORS.primary,
    height: '80%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 7
  },
})