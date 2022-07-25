import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import COLORS from '../global/COLORS';

const CartScreen = ({ navigation, route }) => {
  const cart = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CartCard data={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <View style={{ borderWidth: 0.5, color: COLORS.gray, opacity: .1 }} />}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10, marginBottom: 10, }}>
            <AntDesign name="arrowleft" size={28} color="black" onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.black, paddingLeft: 20, }}>Add To Cart</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.cartButton}>
        <AntDesign name="shoppingcart" size={25} color="black" style={{ padding: 18 }} />
      </TouchableOpacity>
    </View >
  )
}

const CartCard = ({ navigation, data }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('ProductScreen', data)}>
      <View style={{ width: '70%' }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.black, marginBottom: 3 }} numberOfLines={1}>{data.foodName}</Text>
        <Text style={{ fontSize: 13, fontWeight: '400', color: COLORS.black, marginBottom: 5 }}>P {data.foodPrice}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Entypo name="star" size={14} color="gold" />
          <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 5 }}>{data.foodRating}.0 · {data.foodRestaurant}</Text>
        </View>
        <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: '500' }}> Order Quantity: {data?.orderQuantity}</Text>

      </View>
      <View style={{ width: 70, height: 80, borderRadius: 20 }}>
        <Image
          source={{ uri: data.foodImage }}
          resizeMode='contain'
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    paddingVertical: 7,
    borderRadius: 5,
  },
  cartButton: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 2,
    backgroundColor: COLORS.primary
  }
})