import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { SwipeListView } from 'react-native-swipe-list-view';

import COLORS from '../global/COLORS';
import { deleteCart, getCart, removeToCart } from '../database/db';

const CartScreen = ({ navigation, route }) => {
  const cartItem = route.params;
  const [cartDb, setCartDb] = useState([]);
  const [cart, setCart] = useState([]);
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ['1%', '40%'], []);
  const [subtotal, setSubtotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCart({ setCart, setSubtotal });
    setCartDb(cart);
  }, [cartDb])

  const handleOpenBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, [])

  const handleDeleteToCart = (data) => {
    setCartDb(cartDb.filter(item => {
      if (item === data) {
        return item
      }
    }))
    removeToCart(data);
  }

  const handleNotWorking = () => {
    Alert.alert('', 'This feature is not yet working! Sorry for the inconvenience', [{ text: "Okay", onPress: () => { } }]);
  }

  const handleConfirmOrder = () => {
    // if (cartDb.length === 0) {
    //   Alert.alert('', "Please add product in your cart first!", [{ text: "Okay", onPress: () => { } }]);
    // }

    navigation.navigate('ReviewScreen');

    // deleteCart();
    // setCartDb(cartDb.filter(item => {
    //   if (item === data) {
    //     return item
    //   }
    // }))
    // Alert.alert('', 'Thank you for your order!', [{ text: "Okay", onPress: () => { } }]);
  }

  const hiddenItem = (data) => {
    return (
      <View style={styles.rowBack} >
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={handleNotWorking}>
          <AntDesign name="edit" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => handleDeleteToCart(data.item)}>
          <FontAwesome5 name="trash" size={28} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  const onRefresh = (data) => {
    setRefreshing(true)
    setCartDb(cartDb.filter(item => {
      if (item === data) {
        return item
      }
    }))
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        data={cart}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(cart)}
          />}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CartCard data={item} navigation={navigation} isOpen={isOpen} />}
        ItemSeparatorComponent={() => <View style={{ borderWidth: 0.5, color: COLORS.gray, opacity: .1 }} />}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 20, marginBottom: 10, backgroundColor: COLORS.primary, elevation: 7 }}>
            <AntDesign name="arrowleft" size={28} color="black" onPress={() => navigation.goBack()} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.black, paddingLeft: 20, }}>Add To Cart</Text>
          </View>
        )}
        style={{ opacity: isOpen ? .5 : 1 }}
        renderHiddenItem={(data) => hiddenItem(data)}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => handleOpenBottomSheet(1)}>
        <AntDesign name="shoppingcart" size={25} color="black" style={{ padding: 18 }} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        animateOnMount={true}
        style={styles.cartBottomSheetcontainer}
      >
        <BottomSheetView style={styles.bottomSheetViewContainer}>
          <View style={styles.cartDetails}>
            <Text style={styles.cartTitle}>Subtotal</Text>
            <Text style={styles.cartSubtitle}>P{subtotal}.00</Text>
          </View>
          <View style={styles.cartDetails}>
            <Text style={styles.cartTitle}>Discount</Text>
            <Text style={styles.cartSubtitle}>P0.00</Text>
          </View>
          <TouchableOpacity style={styles.cartDetailButton} onPress={handleNotWorking}>
            <FontAwesome name="ticket" size={25} color="black" />
            <Text style={{ paddingVertical: 15, paddingLeft: 10, fontWeight: 'bold', color: COLORS.black }}>Add a Voucher</Text>
          </TouchableOpacity>
          <View style={styles.cartDetails}>
            <Text style={styles.cartTitle}>Delivery Fee</Text>
            <Text style={[styles.cartSubtitle, { textDecorationLine: 'line-through' }]}>P59.00</Text>
          </View>
          <View style={[styles.cartDetails]}>
            <Text style={[styles.cartTitle, { fontWeight: 'bold' }]}>Total (incl. VAT)</Text>
            <Text style={[styles.cartSubtitle, { fontSize: 16 }]}>P{subtotal}.00</Text>
          </View>
          <TouchableOpacity style={styles.cartDetailButton} onPress={handleConfirmOrder}>
            <Text style={{ paddingVertical: 15, paddingLeft: 10, fontWeight: 'bold', color: COLORS.black }}>Review Payment & Address</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View >
  )
}

const CartCard = ({ navigation, data, isOpen }) => {
  return (
    <View style={styles.cardContainer}>
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
    </View>
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
    alignItems: 'center',
    backgroundColor: COLORS.white
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
  },
  cartBottomSheetcontainer: {
    shadowColor: '',
    elevation: 10,
    borderRadius: 25,
  },
  bottomSheetViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetViewContainerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cartTitle: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '500'
  },
  cartSubtitle: {
    color: COLORS.black,
    fontWeight: 'bold'
  },
  cartDetailButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    borderRadius: 10
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 23
  },
  backRightBtnRight: {
    backgroundColor: COLORS.primary,
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  backRightBtnLeft: {
    backgroundColor: COLORS.primary,
    left: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  }

})
