import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import AntDesign from 'react-native-vector-icons/AntDesign';

import HMSMapView, { MapTypes, HMSMarkerView } from '@hmscore/react-native-hms-map'
import { huaweiGetFromLocationName, huaweiGetLocation, huaweiGetLocationByName, } from '../hms-kit/HuaweiLocation';
import { ToastLongComp } from '../function/ToastFunc';

const EditMapScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const [isEditTextInput, setIsEditTextInput] = useState(false);

  const [markerLocationLat, setMarkerLocationLat] = useState(0);
  const [markerLocationLong, setMarkerLocationLong] = useState(0);
  const [locations, setLocations] = useState(0);
  const [sampleLat, setSampleLat] = useState(0);
  const [sampleLng, setsampleLng] = useState(0);

  const [address, setAddress] = useState('ayala malls feliz');
  useEffect(() => {
    huaweiGetLocation(setCurrentLocation);
    huaweiGetLocationByName(markerLocationLat, markerLocationLong, setNewLocation);
  }, [markerLocationLat])

  useEffect(() => {
    huaweiGetFromLocationName(address, setLocations)
  }, [address])

  useEffect(() => {
    setSampleLat(locations[0]?.latitude);
    setsampleLng(locations[0]?.longitude);
  }, [address])

  const handleChangedLocation = (item) => {
    setNewLocation(item);
    setSampleLat(item.latitude);
    setsampleLng(item.longitude);
    setIsEditTextInput(false)
  }

  const handleSaveDeliveryAddress = () => {
    ToastLongComp("Delivery Address successfully changed!");
    navigation.navigate('ReviewScreen', newLocation);
  }

  return (
    <View style={styles.container}>

      <View style={{ position: 'absolute', zIndex: 2, marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity style={{ backgroundColor: COLORS.white, borderRadius: 20, padding: 5 }}>
          <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <TextInput onChangeText={(text) => {
          setAddress(text)
          if (text === '') {
            setIsEditTextInput(false)
          } else {
            setIsEditTextInput(true)
          }
        }}
          style={{ backgroundColor: COLORS.white, width: '85%', alignSelf: 'center', marginLeft: 10, borderRadius: 10, elevation: 7, padding: 10, paddingLeft: 20 }}
          placeholder="Enter Address"
        />

      </View>
      {isEditTextInput ?
        <View style={{ paddingTop: 80, backgroundColor: COLORS.white }}>
          <FlatList
            data={locations}
            style={{}}
            keyExtractor={item => item.latitude}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ paddingVertical: 15, paddingHorizontal: 20 }} onPress={() => handleChangedLocation(item)}>
                <Text style={{ fontSize: 15, fontWeight: '500', color: COLORS.black }}>{item.street}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ borderWidth: .5, borderColor: '#dae6eb' }} />}
          />
        </View> :
        <View>
          <HMSMapView
            style={{ height: '100%', width: '100%' }}
            camera={{
              target: { latitude: sampleLat || currentLocation.latitude || 0, longitude: sampleLng || currentLocation.longitude || 0 },
              zoom: 18,
              bearing: 5,
            }}
            useAnimation={true}
            animationDuration={2000}
            compassEnabled={false}
            mapType={MapTypes.NORMAL}
            mapPadding={{ bottom: 500 }}
            rotateGesturesEnabled={true}
            scrollGesturesEnabled={true}
            tiltGesturesEnabled={true}
            zoomControlsEnabled={true}
            zoomGesturesEnabled={true}
            buildingsEnabled={true}
            trafficEnabled={true}
            pointToCenter={{ x: 10, y: 10 }}
            markerClusterColor={[255, 230, 130, 0]}
            markerClusterTextColor={[200, 0, 0, 0]}
            markerClusterIcon={{ asset: "ic_launcher.png" }}
            description="Huawei Map"
            mapStyle={
              '[{"mapFeature":"all","options":"labels.icon","paint":{"icon-type":"night"}}]'
            }
            myLocationEnabled={true}
            myLocationButtonEnabled={false}
            markerClustering={true}
            scrollGesturesEnabledDuringRotateOrZoom={true}
            onMapClick={(e) => {
              setMarkerLocationLat(e.nativeEvent.coordinate.latitude);
              setMarkerLocationLong(e.nativeEvent.coordinate.longitude);
              setSampleLat(e.nativeEvent.coordinate.latitude)
              setsampleLng(e.nativeEvent.coordinate.longitude)
            }}
          >
            <HMSMarkerView // Simple example
              coordinate={{ latitude: sampleLat || markerLocationLat, longitude: sampleLng || markerLocationLong }}
            />
          </HMSMapView>
          <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 10, elevation: 7, padding: 20, marginBottom: 10, marginHorizontal: 20 }}>
              <Text style={{ fontWeight: 'bold', color: COLORS.black, marginBottom: 8 }}>New Delivery Address:</Text>
              <Text >{newLocation?.street || currentLocation.street}</Text>
            </View>
            <TouchableOpacity onPress={handleSaveDeliveryAddress} style={{ alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 15, borderRadius: 10, marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

    </View>
  )
}

export default EditMapScreen

const styles = StyleSheet.create({

})