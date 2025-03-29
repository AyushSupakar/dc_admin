import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from './../../Utils/Colors';
import Calender from './../../components/Calender'
import { ScrollView } from 'react-native-gesture-handler';
import GlobalApi from '@/app/Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
import useLocation from '@/app/hooks/useLocation';

const BookingFormScreen = () => {
    const {latlonglocation, address, errorMsg } = useLocation();
      
    
    const {user} = useUser();
    const route = useRoute();
    const [finalLatLong, setFinalLatLong] = useState("latitude="+latlonglocation?.latitude+", Longitude="+latlonglocation?.longitude);
    const [finaladdress, setFinaladdress] = useState((address?.city && address?.region && address?.country 
        )? `${address.city}, ${address.region}, ${address.country}` 
        : "N/A");
    const [service, setService] = useState(route?.params?.service || {});
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    // useEffect(()=>{
    //     console.log('address='+address);
    // },[])

    const handleBooking = () => {
        if (!name || !phone || !location || !selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const data = {
            serviceid: service?.id,
            username: user?.fullName,
            name:name,
            useremail: user?.primaryEmailAddress?.emailAddress,
            phonenumber: phone,
            location: finaladdress,
            details: details,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            time: selectedTime,
            latlong: finalLatLong,
            address: location,
        };

        
        GlobalApi.createBooking(data).then(resp=>{
            
        })

       
        Alert.alert('Success', 'Your booking has been submitted.');

        navigation.reset({
            index: 0,
            routes: [
              {
                name: 'home'
              },
            ],
          });


    };

    useEffect(()=>{
        if (latlonglocation) {
            setFinalLatLong(`Latitude: ${latlonglocation.latitude}, Longitude: ${latlonglocation.longitude}`);
        }
        if (address?.city && address?.region && address?.country) {
            const formattedAddress = `${address.city}, ${address.region}, ${address.country}`;
            setFinaladdress(formattedAddress);
            setLocation(formattedAddress); // Autofill input field
        }
    


    },[latlonglocation, address])

    return (
        <ScrollView>
        <KeyboardAvoidingView>
            <View style={{ padding: 20, paddingTop: 40 }}>
                <Text style={{ fontSize: 20, fontFamily: 'outfit', alignSelf:'center' }}>
                    You are Booking for
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'outfit-medium',
                        color: Colors.PRIMARY,
                        fontStyle: 'italic',
                        fontWeight: '600'
                    }}> {service?.name}</Text>
                </Text>
            </View>

            <View>
                <Calender onDateSelect={setSelectedDate} onTimeSelect={setSelectedTime} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Current Location:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your location"
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={styles.label}>Additional Details:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe your problem or add extra details"
                    value={details}
                    onChangeText={setDetails}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Entypo name="squared-cross" size={24} color="white" />
                    <Text style={styles.buttonText}> Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.doneButton} onPress={handleBooking}>
                    <FontAwesome name="calendar-check-o" size={18} color="white" />
                    <Text style={styles.buttonText}> Confirm Booking </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default BookingFormScreen;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily:'outfit'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderColor:Colors.PRIMARY,
        fontFamily:'outfit'
    },
    textArea: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        borderColor:Colors.PRIMARY
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        marginHorizontal: 20,
        marginBottom:20
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: Colors.LIGHT_RED,
        borderRadius: 5,
    },
    doneButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    }
});
