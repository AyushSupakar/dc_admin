import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ServicesByCategory from '../Screens/ServicesByCategory/ServicesByCategory';
import ServiceDetailsScreen from '../Screens/ServiceDetails/ServiceDetailsScreen';
import BookingDetailsScreen from '../Screens/BookingDetailsScreen/BookingDetailsScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';

const Stack = createStackNavigator();

const BookingNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false,
    }}>
      <Stack.Screen name='booking' component={BookingScreen}/>
      <Stack.Screen name='booking_details' component={BookingDetailsScreen}/>
    </Stack.Navigator>
  )
}

export default BookingNavigation

const styles = StyleSheet.create({})