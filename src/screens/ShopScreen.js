import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

import HeaderComp from '../components/HeaderComp';
import COLORS from '../global/COLORS';

const ShopScreen = ({ route, navigation }) => {
  const shop = route.params.data;
  const shopCoverPhoto = route.params.shopCoverPhoto;
  return (
    <View style={styles.container}>
      <HeaderComp coverPhoto={shopCoverPhoto} />
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <FlatList
          data={shop}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <ShopCard data={item} navigation={navigation} />}
        />
      </View>
    </View >

  )
}

const ShopCard = ({ data, navigation }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('RestaurantScreen', data)}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: data.shopImage }}
          style={{ width: '100%', height: 150, borderRadius: 10 }}
          resizeMode='cover'
        />
        <View style={styles.cardImageDetails}>
          <Text style={[styles.cardImageText, { marginBottom: 5 }]}>Featured</Text>
          <Text style={styles.cardImageText}>20% OFF</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.cardTitle}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black, width: 270 }} numberOfLines={1}>{data.shopName} - {data.shops[0].foodLocation}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="star" size={14} color="gold" />
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.black, }}>{data.shops[0].foodRating}.0</Text>
          </View>
        </View>
        <View style={styles.cardSubTitle}>
          <Text>{data.shopPlace} · {data.shops[0].foodCategory} · {data.shops[0].foodDeliveryTime}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={{ fontSize: 12, color: 'gold', fontWeight: 'bold' }}>Welcome gift: free delivery</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ShopScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  cardImageDetails: {
    position: 'absolute',
    marginTop: 15
  },
  cardImageText: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    fontSize: 14,
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: COLORS.primary,
    fontWeight: 'bold'
  },
  cardDetails: {
    marginTop: 8
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  cardSubTitle: {
    marginTop: 3
  },
  cardFooter: {
    marginTop: 4
  }
})