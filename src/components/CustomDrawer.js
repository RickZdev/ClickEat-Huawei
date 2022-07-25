import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { auth, logoutUser } from '../database/authentication'
import COLORS from '../global/COLORS'


const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('https://firebasestorage.googleapis.com/v0/b/shopping-app-be469.appspot.com/o/images%2Favatar%2Favatar.jpg?alt=media&token=e351f21f-5741-400a-9355-3fcf08865644');

  const handleLogoutUser = () => {
    logoutUser(navigation)
  }

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
            <AntDesign name="close" size={40} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: imageUri }}
                resizeMode='cover'
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userTextName}>{auth.currentUser?.displayName}</Text>
            <Text style={styles.userTextEmail}>{auth.currentUser?.email}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.footerContainer} onPress={() => handleLogoutUser()}>
        <Text style={styles.logoutText}> Sign Out </Text>
        <MaterialIcons name="logout" size={24} color="black" style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 5, right: 10,
  },
  avatarContainer: {
    backgroundColor: COLORS.white,
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetailsContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  userTextName: {
    color: COLORS.black,
    fontWeight: 'bold'
  },
  userTextEmail: {
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray
  },
  logoutText: {
    fontSize: 14,
    letterSpacing: 1,
    paddingLeft: 70,
    fontWeight: 'bold',
    color: COLORS.black
  },
})