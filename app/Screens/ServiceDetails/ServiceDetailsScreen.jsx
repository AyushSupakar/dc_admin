import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Colors from '@/app/Utils/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ServiceDetailsScreen = () => {
  const navigation= useNavigation();
   const param=useRoute().params;
    const [service, setService] = useState(param.service);
   useEffect(()=>{
      
   },[])

  return (

    <ScrollView>
      <Image 
        source={{
          uri:service?.images[0]?.url,
        }}
        style={{
          width:'100%',
          height:270
        }}
      />
      <Text
        style={{
          fontFamily:'outfit-bold',
          fontSize:25,
          margin:10,
          paddingHorizontal:10,
        }}
      >{service?.name}</Text>
      <View>
        <FlatList
          data={(service?.category)??[]}
          keyExtractor={(item)=>item?.name}
         
          horizontal={true}
          showsHorizontalScrollIndicator={false}

          contentContainerStyle={{
            justifyContent:'space-evenly',
            alignItems:'center',
            padding:10,
            margin:10
          }}



          renderItem={({item})=>(
            <View style={{
                        margin:2,
                        padding:3,
                        backgroundColor:Colors.PRIMARY_LIGHT,
                        borderRadius:10,
                        alignSelf:'center',
                    }} >
                        <Text
                        style={{fontSize:10, fontFamily:'outfit',
                            marginHorizontal:5,
                            color:Colors.PRIMARY,
                            fontWeight:'bold',
                            
                        }}
                        >{item.name}</Text>
                    </View>
          )}
        />
      </View>

          <View
            style={styles.container}
          >
            <Text
              style={styles.texts}
            >{service?.about}</Text>
          </View>

          <View
            style={styles.container}
          >
            <Text
              style={styles.texts}
            
            >For more informations, send us your queries at: 
            <Text
              style={{
                fontFamily:'outfit-bold',
              }}
            > {service.email}</Text>
            </Text>
          </View>

          <View
          style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            padding:10,
            margin:10,
            marginHorizontal:20
          }}
        >

          <TouchableOpacity
            style={{
              display:'flex',
              flexDirection:'row',
              gap:5,
               
              alignItems:'center',
              justifyContent:'center',
              paddingHorizontal:10,
              padding:5,
              backgroundColor:Colors.PRIMARY,
              borderRadius:5,
            }}
            onPress={()=>navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text
                style={{
                  color:'white'
                }}
            > Back</Text>
            
          </TouchableOpacity>

          <View
             style={{
              display:'flex',
              flexDirection:'row',
              gap:5,
               
              alignItems:'center',
              justifyContent:'center',
              padding:5,
              paddingHorizontal:10,
              backgroundColor:Colors.DARK_GRAY,
              borderRadius:5,
            }}
           
          >
            <FontAwesome name="calendar-check-o" size={18} color="white" />
        
             <Text
               style={{
                color:'black'
              }}
             > Can't Book</Text>
            
          </View>


        </View>

    </ScrollView>


  )
}

export default ServiceDetailsScreen

const styles = StyleSheet.create({
  container:{
    padding:10,
    marginHorizontal:10,
    marginVertical:5
  },
  texts:{
    fontFamily:'outfit-medium',
    fontSize:15,
    textAlign:'justify',
    paddingHorizontal:5
  }
  
})