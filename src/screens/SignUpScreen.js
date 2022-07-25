import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { ToastShortComp } from '../function/ToastFunc';
import { CustomPasswordInput, CustomTextInput } from '../components/CustomInput'
import COLORS from '../global/COLORS';
import { addAuthenticatedUser } from '../database/authentication';

const SignUpScreen = ({ navigation }) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AntDesign name="arrowleft" size={32} color="white" style={{ marginTop: 15 }} onPress={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <View style={{ marginTop: 30, paddingLeft: 20, }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black }}>Getting Started</Text>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Create account to continue!</Text>
        </View>
        <SignUpForm navigation={navigation} />
      </View>
    </ScrollView>
  )
}

const SignUpForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
      onSubmit={(values) => {
        if (values.firstName === '' || values.lastName === '' || values.email === '' || values.phoneNumber === '' || values.password === '' || values.confirmPassword === '') {
          ToastShortComp("All fields are required!");
        } else {
          if (values.password === values.confirmPassword) {
            addAuthenticatedUser(values, navigation)
          } else {
            ToastShortComp("Password Do not Match!");
          }
        }
      }}
    >
      {(formikProps) => (
        <View style={styles.formContainer}>
          <CustomTextInput placeholder={'First Name'} icon={"user-alt"} value={formikProps.values.firstName} keyboardType={'default'} onchangeValue={formikProps.handleChange('firstName')} />
          <CustomTextInput placeholder={'Last Name'} icon={"house-user"} value={formikProps.values.lastName} keyboardType={'default'} onchangeValue={formikProps.handleChange('lastName')} />
          <CustomTextInput placeholder={'Email Adress'} icon={"envelope"} value={formikProps.values.email} keyboardType={'email-address'} onchangeValue={formikProps.handleChange('email')} />
          <CustomTextInput placeholder={'Phone Number'} icon={"phone-alt"} value={formikProps.values.phoneNumber} keyboardType={'phone-pad'} onchangeValue={formikProps.handleChange('phoneNumber')} />
          <CustomPasswordInput placeholder={'Password'} icon={"lock"} value={formikProps.values.password} keyboardType={'default'} onchangeValue={formikProps.handleChange('password')} />
          <CustomPasswordInput placeholder={'Confirm Password'} icon={"unlock"} value={formikProps.values.confirmPassword} keyboardType={'default'} onchangeValue={formikProps.handleChange('confirmPassword')} />
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.white }}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30, }} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    elevation: 15,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 30
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