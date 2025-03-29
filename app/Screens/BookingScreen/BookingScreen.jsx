import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import GlobalApi from '@/app/Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/app/Utils/Colors';
import BookingDetailsScreen from '../BookingDetailsScreen/BookingDetailsScreen';


const BookingScreen = () => {

  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingPress = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

    const navigation = useNavigation();
    const {user} = useUser();

    useEffect(()=>{
      user&&getUserBookings();
    },[user])

    const getUserBookings=()=>{
      setLoading(true);
      GlobalApi.getAllBookings().then(res=>{
          // console.log(res);
          setBookingList(res.bookings)

          setLoading(false);
      })
    }

  return (
    <View
    style={{
      padding:20,
      paddingTop:40,
      margin:10,
      marginBottom:20
    }}
    >
      <TouchableOpacity 
              onPress={()=>navigation.goBack()}
            style={{
              display:'flex',
              flexDirection:'row',
              gap:10,
              alignItems:'center'
            }}>
      
            <Feather name="arrow-left" size={24} color="black" />

            <Text style={{
              fontSize:25,
              fontFamily:'outfit-medium'
            }}>Bookings For You</Text>
            </TouchableOpacity>

            <View
              style={{
                margin:10,
                paddingVertical:10,
                marginBottom:30
              }}
            >
              <FlatList
                data={bookingList}
                onRefresh={()=>getUserBookings()}
                refreshing={loading}
                showsVerticalScrollIndicator={false}

                renderItem={({item})=>(
                  <TouchableOpacity style={styles.container}
                   onPress={()=>handleBookingPress(item)}
                  >
                        <Image
                          source={{ uri: item?.service?.images[0]?.url }}
                          style={styles.image}
                        />
                        <View style={styles.textContainer}>
                          <Text 
                            style={styles.serviceName} 
                            numberOfLines={item?.service.name.length > 20 ? 2 : 1} // Wrap only for long names
                            ellipsizeMode="tail"
                          >
                            {item?.service.name}
                          </Text>
                          <View
                            style={{
                              display:'flex',
                              flexDirection:'column',
                              justifyContent:'space-between',
                              gap:5,
                            }}
                          >
                            <View
                              style={{
                                display:'flex',
                                flexDirection:'row',
                                gap:5,
                                 
                                alignItems:'center',
                                justifyContent:'center',
                                paddingHorizontal:10,
                                padding:5,
                                borderWidth:1,
                                borderBlockColor:Colors.GREEN,
                                borderRadius:5,
                              }}
                            >
                              <Text
                                style={{
                                  color:Colors.GREEN,
                                  fontFamily:'outfit'
                                }}
                              >
                                {(item?.date).substring(0,12)}
                              </Text>
                              <Text
                                style={{
                                  color:Colors.GREEN,
                                  fontFamily:'outfit'
                                }}
                              >
                                {item?.time}
                              </Text>

                            </View>
                  
                            
                  
                          </View>
                        </View>
                      </TouchableOpacity>
                )}
              />
            </View>

            <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <BookingDetailsScreen 
          booking={selectedBooking} 
          onClose={() => setModalVisible(false)}
        />
      </Modal>
      
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    flex:1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    gap:10,
    paddingHorizontal:10,
  },
  serviceName: {
    fontSize: 15,
    fontFamily: 'outfit-bold',
    paddingVertical:3,
  },
})

// import { FlatList, Modal, TouchableOpacity, View, Text } from 'react-native';
// import React, { useState } from 'react';
// import BookingDetailsScreen from './../BookingDetailsScreen/BookingDetailsScreen';

// const BookingScreen = ({ bookings }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const handleBookingPress = (booking) => {
//     setSelectedBooking(booking);
//     setModalVisible(true);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={bookings}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleBookingPress(item)}>
//             <Text>{item.service?.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <BookingDetailsScreen 
//           booking={selectedBooking} 
//           onClose={() => setModalVisible(false)}
//         />
//       </Modal>
//     </View>
//   );
// };

// export default BookingScreen;