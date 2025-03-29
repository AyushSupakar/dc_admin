import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '../Utils/Colors';
import HomeNavigation from "./HomeNavigation";



const Tab = createBottomTabNavigator();
const TabNavigaion = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
     }} >
      
      <Tab.Screen 
        name="home" 
        component={HomeNavigation} 
        options= {{ 
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-4}}>Home</Text>),
            tabBarIcon: ({color,size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
                }}/>
      <Tab.Screen name="profile" component={ProfileScreen}   options= {{ 
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-4}}>Profile</Text>),
            tabBarIcon: ({color,size})=>(
                // <FontAwesome name="home" size={size} color={color} /> 
                // <MaterialIcons name="event" size={24} color="black" />
                <FontAwesome name="user-circle-o" size={size} color={color} />
            )
                }}/>
      <Tab.Screen name="booking" component={BookingScreen}  options= {{ 
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginTop:-4}}>Bookings</Text>),
            tabBarIcon: ({color,size})=>(
                // <FontAwesome name="home" size={size} color={color} /> 
                <MaterialIcons name="event" size={size} color={color} />
            )
                }} />
    </Tab.Navigator>
  )
}

export default TabNavigaion

const styles = StyleSheet.create({})


