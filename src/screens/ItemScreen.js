import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

import HeaderComp from '../components/HeaderComp';
import COLORS from '../global/COLORS';
import { getAllShops } from '../database/db';

const ItemScreen = ({ navigation, route }) => {
  const category = route.params;
  const products = route.params.products;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ItemCard data={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <View style={{ borderWidth: 0.5, color: COLORS.gray, opacity: .1 }} />}
        ListHeaderComponent={() => (
          <>
            <HeaderComp coverPhoto={category.categoryImage} />
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black, marginTop: 10, paddingLeft: 10, }}>{category.categoryName}</Text>
          </>

        )}
      />
    </View>
  )
}

const ItemCard = ({ navigation, data }) => {
  const [allShops, setAllShops] = useState([]);

  useEffect(() => {
    getAllShops(setAllShops);
  }, [])

  const handleGotoShopScreen = ({ shop }) => {
    let data = [];
    data = allShops.filter(item => {
      if (shop.foodRestaurant === item.shopName) {
        return item
      }
    })

    navigation.navigate('RestaurantScreen', data[0]);
  }

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('ProductScreen', data)}>
      <View style={{ width: '70%' }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.black, marginBottom: 3 }} numberOfLines={1}>{data.foodName}</Text>
        <Text style={{ fontSize: 13, fontWeight: '400', color: COLORS.black, marginBottom: 5 }}>P {data.foodPrice}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Entypo name="star" size={14} color="gold" />
          <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 5 }}>{data.foodRating}.0 · {data.foodRestaurant}</Text>
        </View>
        <TouchableOpacity style={styles.shopButton} onPress={() => handleGotoShopScreen({ shop: data })}>
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13 }}> View Shop </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: 70, height: 80, borderRadius: 20, overflow: 'hidden' }}>
        <Image
          source={{ uri: data.foodImage }}
          resizeMode='contain'
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default ItemScreen

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
  }
})