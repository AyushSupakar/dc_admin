import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../Utils/GlobalApi'
import Heading from "./../../components/Heading";

const Slider = () => {
  
  const [slider,setSlider] = useState();
    useEffect(()=>{
        getSliders();
    },[])

    const getSliders=()=>{   
        GlobalApi.getSlider().then((res)=>{
          setSlider(res?.sliders);
        });
    }
    return (
    <View>
      <Heading text={'Offers By You'} />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
          <View style={{marginRight:20}} >
            {/* <Text>{item.name}</Text> */}
            <Image
              source={{uri:item?.image?.url}}
              style={styles.sliderImage}
            />
          </View>
        )}

      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  heading:{
    fontSize:20,
    fontFamily:'outfit-medium',
    marginBottom:10
  },
  sliderImage:{
    width:230,
    height:120,
    borderRadius:20,
  }

})