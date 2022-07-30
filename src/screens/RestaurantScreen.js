import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HeaderComp from '../components/HeaderComp';
import COLORS from '../global/COLORS';

const RestaurantScreen = ({ navigation, route }) => {
  const shop = route.params;
  const products = shop.shops;

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', width: '100%' }}>
        <HeaderComp coverPhoto={shop.shopImage} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => <RestaurantCard data={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <View style={{ borderWidth: 0.5, borderColor: '#dae6eb', opacity: 1 }} />}
        ListHeaderComponent={() => <RestaurantHeader data={shop} />}
        style={{ zIndex: 1, }}
      />
    </View >
  )
}

const RestaurantHeader = ({ data }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.black, marginBottom: 20, }}>{data.shopName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="location" size={16} color="black" />
          <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.gray, marginLeft: 5 }}>{data.shops[0].foodLocation}</Text>
        </View>
        <HorizontalLine />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="star" size={16} color="gold" />
          <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.gray, marginLeft: 5 }}> {data.shops[0].foodRating}.0</Text>
        </View>
        <HorizontalLine />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="delivery-dining" size={18} color="black" />
          <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.gray, marginLeft: 5 }}>{data.shops[0].foodDistance} ({data.shops[0].foodDeliveryTime})</Text>
        </View>
        <HorizontalLine />
        <Text style={{ fontSize: 13, fontWeight: '500', color: COLORS.gray, marginBottom: 20, }}>{data.shops[0].foodType} · {data.shops[0].foodPlace} · {data.shops[0].foodCategory}</Text>
        <View style={{ backgroundColor: '#dae6eb', padding: 10, borderRadius: 5 }}>
          <Text style={{ fontWeight: '500' }}>Please be advised that menu prices may vary or be subject to change by the merchant. Higher delivery fees may also apply for long distance delivery. Thank you!</Text>
        </View>
      </View>
    </View >
  )
}

const RestaurantCard = ({ navigation, data }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('ProductScreen', data)}>
      <View style={{ width: '70%' }}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.black, marginBottom: 3 }} numberOfLines={1}>{data.foodName}</Text>
        <Text style={{ fontSize: 13, fontWeight: '400', color: COLORS.black, marginBottom: 5 }}>P {data.foodPrice}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Entypo name="star" size={14} color="gold" />
          <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 5 }}>{data.foodRating}.0 · {data.foodCategory}</Text>
        </View>
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

const HorizontalLine = () => {
  return (
    <View style={{ borderWidth: .5, borderColor: '#dae6eb', marginVertical: 10 }} />
  )
}

export default RestaurantScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  headerContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    elevation: 7,
    borderRadius: 5,
  }
})