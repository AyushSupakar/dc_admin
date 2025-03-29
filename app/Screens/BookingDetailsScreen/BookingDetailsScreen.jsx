import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '@/app/Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const BookingDetailsScreen = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <ScrollView>
      <Image 
        source={{ uri: booking?.service?.images[0]?.url }}
        style={{ width: '100%', height: 270 }}
      />
      <Text style={styles.headerText}>{booking?.service?.name}</Text>
      <View style={styles.container}>
        <Text style={styles.texts}>Selected Date: {booking?.date}</Text>
        <Text style={styles.texts}>Selected Time: {booking?.time}</Text>
        <Text style={styles.texts}>Name: {booking?.name}</Text>
        <Text style={styles.texts}>Phone: {booking?.phonenumber}</Text>
        <Text style={styles.texts}>Address: {booking?.address}</Text>
        <Text style={styles.texts}>Details: {booking?.details}</Text>
        <Text style={styles.texts}>Username: {booking?.username}</Text>
        <Text style={styles.texts}>User Email: {booking?.useremail}</Text>
        <Text style={styles.texts}>User Location: {booking?.latLong}</Text>
        <Text style={styles.texts}>Location LatLong: {booking?.latLong}</Text>
        <Text style={styles.texts}>Booked at: {booking?.updatedAt}</Text>
        <Text style={styles.texts}>Progress: {booking?.bookingProgress}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={{ color: 'white' }}> Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  texts: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    textAlign: 'justify',
    paddingHorizontal: 5,
  },
  headerText: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    margin: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
});
