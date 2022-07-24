import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { ToastShortComp } from '../function/ToastFunc';
import { CustomPasswordInput, CustomTextInput } from '../components/CustomInput'
import COLORS from '../global/COLORS';
import { loginUser } from '../database/authentication';

const LoginScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AntDesign name="arrowleft" size={32} color="white" style={{ marginTop: 15 }} onPress={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <View style={{ marginTop: 30, paddingLeft: 20, }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black }}>Let's get something</Text>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Good  to see you back!</Text>
        </View>
        <LoginForm navigation={navigation} />
      </View>
    </ScrollView>
  )
}

const LoginForm = ({ navigation }) => {
  const [isRemember, setIsRemember] = useState(false);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        loginUser(values.email, values.password, navigation);
      }}
    >
      {(formikProps) => (
        <View style={styles.formContainer}>
          <CustomTextInput placeholder={'Email Adress'} icon={"envelope"} value={formikProps.values.email} keyboardType={'email-address'} onchangeValue={formikProps.handleChange('email')} />
          <CustomPasswordInput placeholder={'Password'} icon={"lock"} value={formikProps.values.password} keyboardType={'default'} onchangeValue={formikProps.handleChange('password')} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 22, paddingRight: 10, marginTop: 10, marginBottom: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.black }}>Remember me </Text>
            <Switch value={isRemember} onValueChange={() => setIsRemember(!isRemember)} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }} onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    elevation: 15,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 30,
  },
  formContainer: {
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginBottom: 15,
    borderRadius: 20,

  }
})