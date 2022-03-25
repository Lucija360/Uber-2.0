import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';



const data = [
  {
    id: "Uber-X-123",
    title:"UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title:"UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title:"UberLUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

//If we have SURGE pricing, this should go up because of the high request demand
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation= useNavigation();
  const [seleted, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <ScrollView>
      <View>
        <TouchableOpacity onPress={() =>navigation.navigate('NavigateCard')} style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon name="chevron-left" type="fontawesome"  />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text} </Text>
      </View>
      <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item : {id, title, multiplier, image}, item}) => (
        <TouchableOpacity 
        onPress={ () => setSelected(item)}
        style={tw `flex-row justify-between items-center px-10 ${id === seleted?.id && "bg-gray-200"}`}>
          <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{uri: image}}
          />
          <View style={tw`-ml-6`}>
            <Text style={tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration.text}   Travel Time</Text>
          </View>
          <Text style={tw`text-xl`}>
            $65
          </Text>
        </TouchableOpacity>
      )}
      />

      <View>
        <TouchableOpacity 
        disabled={!seleted}
        style={tw`bg-black py-3 m-3 ${!seleted && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {seleted?.title}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});