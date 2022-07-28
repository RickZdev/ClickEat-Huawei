import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import AntDesign from 'react-native-vector-icons/AntDesign';

import HMSMapView, { MapTypes, HMSMarkerView, HMSCircleView, PatternItemTypes } from '@hmscore/react-native-hms-map'
import { huaweiGetFromLocationName, huaweiGetLocation, huaweiGetLocationByName, huaweiLocationNotification } from './HuaweiLocation';
import axios from 'axios';

const HuaweiMap = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const [markerLocationLat, setMarkerLocationLat] = useState(0);
  const [markerLocationLong, setMarkerLocationLong] = useState(0);
  const [locations, setLocations] = useState(0);
  const [sampleLat, setSampleLat] = useState(0);
  const [sampleLng, setsampleLng] = useState(0);

  const [address, setAddress] = useState('ayala malls feliz');
  useEffect(() => {
    huaweiGetLocation(setCurrentLocation);
    huaweiGetLocationByName(markerLocationLat, markerLocationLong, setNewLocation);
    huaweiLocationNotification();
    if (newLocation === undefined) {
      setNewLocation("Cannot read location")
    }

    console.log("NEW LOCATION", newLocation);
  }, [markerLocationLat])

  useEffect(() => {
    huaweiGetFromLocationName(address, setLocations)
    console.log('nice', locations)
  }, [address])

  useEffect(() => {
    setSampleLat(locations[0]?.latitude);
    setsampleLng(locations[0]?.longitude);

    console.log("lat: ", sampleLat)
    console.log("lng: ", sampleLng)
  }, [address])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 20, marginBottom: 10, backgroundColor: COLORS.primary, elevation: 7 }}>
        <AntDesign name="arrowleft" size={28} color="black" onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.black, paddingLeft: 20, }}>Back To Cart</Text>
      </View>
      <HMSMapView
        style={{ height: '50%' }}
        camera={{
          // target: { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
          target: { latitude: sampleLat || currentLocation.latitude, longitude: sampleLng || currentLocation.longitude },
          zoom: 11,
          bearing: 5,
        }}
        // latLngBoundsForCameraTarget={[
        //   { latitude: 50, longitude: 35 },
        //   { latitude: 42, longitude: 30 },
        // ]}
        useAnimation={true}
        animationDuration={2000}
        // liteMode={true}
        compassEnabled={true}
        mapType={MapTypes.NORMAL}
        // minZoomPreference={10}
        // maxZoomPreference={20}
        rotateGesturesEnabled={true}
        scrollGesturesEnabled={true}
        tiltGesturesEnabled={true}
        zoomControlsEnabled={true}
        zoomGesturesEnabled={true}
        buildingsEnabled={true}
        trafficEnabled={true}
        pointToCenter={{ x: 10, y: 10 }}
        // gestureScaleByMapCenter={true}
        markerClusterColor={[255, 230, 130, 0]}
        markerClusterTextColor={[200, 0, 0, 0]}
        markerClusterIcon={{ asset: "ic_launcher.png" }}
        description="Huawei Map"
        mapStyle={
          '[{"mapFeature":"all","options":"labels.icon","paint":{"icon-type":"night"}}]'
        }
        myLocationEnabled={true}
        myLocationButtonEnabled={true}
        markerClustering={true}
        scrollGesturesEnabledDuringRotateOrZoom={true}
        // onCameraUpdateFinished={(e) => console.log("HMSMap onCameraUpdateFinished: ", e.nativeEvent)}
        // onCameraUpdateCanceled={(e) => console.log("HMSMap onCameraUpdateCanceled: ", e.nativeEvent)}
        // onCameraIdle={(e) => console.log("HMSMap onCameraIdle: ", e.nativeEvent)}
        // onMapReady={(e) => console.log("HMSMap onMapReady: ", e.nativeEvent)}
        // onCameraMoveCanceled={(e) => console.log("HMSMap onCameraMoveCanceled: ", e.nativeEvent)}
        // onCameraMove={(e) => console.log("HMSMap onCameraMove: ", e.nativeEvent)}
        // onCameraMoveStarted={(e) => console.log("HMSMap onCameraMoveStarted: ", e.nativeEvent)}
        // onMapLongClick={(e) => console.log("HMSMap onMapLongClick: ", e.nativeEvent)}
        // onMapLoaded={(e) => console.log("HMSMap onMapLoaded: ", e.nativeEvent)}
        // onMyLocationClick={(e) => console.log("HMSMap onMyLocationClick: ", e.nativeEvent)}
        // onPoiClick={(e) => console.log("HMSMap onPoiClick: ", e.nativeEvent)}
        onMyLocationButtonClick={(e) => console.log("HMSMap onMyLocationButtonClick: ", e.nativeEvent)}
        // console.log("HMSMap onMapClick: ", e.nativeEvent.coordinate.latitude)
        onMapClick={(e) => {
          setMarkerLocationLat(e.nativeEvent.coordinate.latitude);
          setMarkerLocationLong(e.nativeEvent.coordinate.longitude);
          console.log(markerLocationLat)
          console.log(markerLocationLong)
        }}
      >
        <HMSMarkerView // Simple example
          coordinate={{ latitude: markerLocationLat, longitude: markerLocationLong }}
        />

        <HMSMarkerView // Simple example
          coordinate={{ latitude: sampleLat || 0, longitude: sampleLng || 0 }}
        />
      </HMSMapView>
      <Text>{newLocation?.street}</Text>
      <TextInput placeholder='enter address' onChangeText={(text) => setAddress(text)} />
      <Text>{address}</Text>

      <FlatList
        data={locations}
        keyExtractor={item => item.latitude}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: COLORS.primary, marginBottom: 5 }}>
            <Text>{item.street}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default HuaweiMap

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})