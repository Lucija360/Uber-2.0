import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import {selectDestionation, selectOrigin, setTravelTimeInformation} from '../slices/navSlice'
import {useSelector} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';



const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestionation)
    const dispatch = useDispatch();

    

// Zoom out function missing, need to implement


useEffect(() => {

if(!origin || !destination) return;

const getTravelTime= async() => {
 fetch (`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
 .then(res => res.json())
 .then(data => {
   dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
 })
};
getTravelTime();
}, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >


      { origin && destination && (
         <MapViewDirections
         origin={origin.description}
         destination={destination.description}
         apikey={GOOGLE_MAPS_APIKEY}
         strokeWidth={3}
         strokeColor= "black"
         />
      )}
      {origin?.location && (
          <Marker 
          coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
          }}
          title="Your Starting Location"
          description={origin.description}
          identifier="origin"
          />
      )}
       {destination?.location && (
          <Marker 
          coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
          }}
          title="Your Starting Location"
          description={destination.description}
          identifier="origin"
          />
      )}
  </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
