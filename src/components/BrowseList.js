import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import COLORS from '../global/COLORS'
import { getDifferentShop } from '../database/db'

const BrowseList = () => {
  const navigation = useNavigation();

  const [allShops, setAllShops] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [fastfood, setFastFood] = useState([]);

  const shopCoverPhoto = 'https://ops-dra.agcstorage.link/v0/huawefoodappimages-8ff8k/cover%2Fshop-cover.jpg?token=2100535b-2c79-4d5e-9309-b60a42840f87';
  const restaurantCoverPhoto = 'https://ops-dra.agcstorage.link/v0/huawefoodappimages-8ff8k/cover%2Frestaurant.jpeg?token=687c94ae-a676-40a2-9fe7-b97ea4e6acbe';
  const fastfoodCoverPhoto = 'https://ops-dra.agcstorage.link/v0/huawefoodappimages-8ff8k/cover%2FEating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg?token=323b160c-b725-4fd2-aff3-253faf58f737';

  useEffect(() => {
    getDifferentShop(setAllShops, setRestaurant, setFastFood);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity style={styles.browseShop} onPress={() => navigation.navigate('ShopScreen', { data: allShops, shopCoverPhoto })}>
          <View style={{ paddingLeft: 10, paddingTop: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.black }}>Browse All Shops</Text>
            <Text style={{ marginBottom: 20, fontSize: 12, fontWeight: 'bold', color: COLORS.gray }}>Order food you love</Text>
          </View>
          <Image
            source={require("../assets/images/all_shops.png")}
            resizeMode='cover'
            style={{ height: 200, width: '100%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeFood} onPress={() => navigation.navigate('UnderConstructionScreen')}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>Type of Food</Text>
          <Text style={{ marginBottom: 10, fontSize: 10, fontWeight: 'bold', color: COLORS.gray, width: 100 }}>Foreign or Filipino Food Lover?</Text>
          <Image
            source={require("../assets/images/food_type.png")}
            resizeMode='contain'
            style={{ position: 'absolute', top: 20, height: 40, width: 60, alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerRight}>
        <TouchableOpacity style={styles.bestDeals} onPress={() => navigation.navigate('UnderConstructionScreen')}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>Best Deals</Text>
          <Text style={{ marginBottom: 10, fontSize: 10, fontWeight: 'bold', color: COLORS.gray, width: 100 }}>Deals that you waiting for!</Text>
          <Image
            source={require("../assets/images/deals.png")}
            resizeMode='contain'
            style={{ position: 'absolute', top: 20, right: 0, height: 50, width: 90, alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.findRestaurant} onPress={() => navigation.navigate('ShopScreen', { data: restaurant, shopCoverPhoto: restaurantCoverPhoto })}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>Find Restaurants</Text>
          <Text style={{ marginBottom: 10, fontSize: 10, fontWeight: 'bold', color: COLORS.gray, width: 100 }}>Look for the finest resto in town!</Text>
          <Image
            source={require("../assets/images/restaurant.png")}
            resizeMode='contain'
            style={{ position: 'absolute', top: 30, height: 50, width: 80, alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.findFastfood} onPress={() => navigation.navigate('ShopScreen', { data: fastfood, shopCoverPhoto: fastfoodCoverPhoto })}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>Find Fastfoods near you</Text>
          <Text style={{ marginBottom: 10, fontSize: 10, fontWeight: 'bold', color: COLORS.gray, width: 100 }}>Convenient Foods coming for you!</Text>
          <Image
            source={require("../assets/images/fastfood.png")}
            resizeMode='contain'
            style={{ height: 100, width: 170, alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BrowseList

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dae6eb',
    flexDirection: 'row',
    marginTop: 10
  },
  containerLeft: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  browseShop: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10
  },
  typeFood: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingLeft: 10,
    padding: 10
  },
  containerRight: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingRight: 10,
  },
  bestDeals: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  findRestaurant: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    marginBottom: 10

  },
  findFastfood: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
  },
})