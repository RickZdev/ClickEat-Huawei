import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomTextInput = ({ keyboardType, onchangeValue, value, placeholder, icon, customStyle }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <FontAwesome5 name={icon} size={25} color="black" />
        <TextInput style={[styles.input, customStyle]} keyboardType={keyboardType} onChangeText={onchangeValue} value={value} placeholder={placeholder} />
      </View>
    </View>
  )
}

const CustomPasswordInput = ({ onchangeValue, icon, value, placeholder, customStyle }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const handlePressShowPass = () => {
    const newState = !isVisiblePassword;
    setIsVisiblePassword(newState)
  }
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <FontAwesome5 name={icon} size={25} color="black" />
        <TextInput style={[styles.input, customStyle]} secureTextEntry={isVisiblePassword} onChangeText={onchangeValue} value={value} placeholder={placeholder} />
      </View>
      <TouchableOpacity style={{ position: 'absolute', right: 30, top: 15 }} onPress={handlePressShowPass}>
        <FontAwesome5 name={'eye'} size={25} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export { CustomTextInput, CustomPasswordInput }

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  input: {
    marginLeft: 10,
    paddingRight: 40
  }
})