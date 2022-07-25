import { Dimensions, StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import CategoryList from '../components/CategoryList'
import { getCart, initializeData } from '../database/db'
import COLORS from '../global/COLORS'
import PopularList from '../components/PopularList'
import PromoList from '../components/PromoList'
import BrowseList from '../components/BrowseList'
import { CustomHomeSkeleton } from '../components/CustomSkeletonCard'

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData(setCategories, setPopulars, setIsLoading);
    console.log("MAIN SCREEN")
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.yellowBackground} />
      <View style={styles.header}>
        <View style={styles.headerButton}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcon name="menu" size={28} color="white" onPress={() => navigation.openDrawer()} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.black }}>Current Location</Text>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome name="map-pin" size={16} color="red" />
                <Text style={{ fontSize: 12, width: 200, color: COLORS.black, marginLeft: 5 }} numberOfLines={1}>#15 D.K MAGSAYSAY STREET, PASIG CITY</Text>
              </View>
            </View>
          </View>
          <FontAwesome5 name="shopping-bag" size={24} color="white" onPress={() => navigation.navigate('CartScreen')} />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30, color: 'black' }}></Text>
        </View>
      </View>
      {!isLoading ?
        <>
          <PromoList />
          <View style={styles.headerSearchbarContainer}>
            <FontAwesome name="search" size={20} color="black" style={{ position: 'absolute', left: 33 }} />
            <TextInput
              style={styles.headerSearchbar}
              value={searchText}
              placeholder='Search for Shops and Restaurants'
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View style={styles.content}>
            <CategoryList data={categories} />
            <PopularList data={populars} />
            <BrowseList />
          </View>
        </>
        : <CustomHomeSkeleton />
      }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  yellowBackground: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 120,
    position: 'absolute',
    elevation: 10,
    zIndex: -999,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  header: {
  },
  headerDetails: {
    paddingHorizontal: 35,
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  headerTitleContainer: {
    marginTop: 15,
    paddingHorizontal: 30
  },
  headerSearchbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  headerSearchbar: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingRight: 30,
    paddingLeft: 40,
  },
  content: {

  },
})