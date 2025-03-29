import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from "./Categories";
import Services from "./Services";
import useLocation from '@/app/hooks/useLocation';

const HomeScreen = () => {
  const [showsearch, setShowSearch] = useState(true);
  const { location, errorMsg } = useLocation();

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Location Error", errorMsg);
    }
  }, [errorMsg]);
  return (<View >
      <Header showsearch={showsearch} />
      <View style={{padding:20}}>
      <Slider/>
      <Categories showsearch={showsearch} setShowSearch={setShowSearch} />
    <View style={{ display:'flex',  alignItems:'center', justifyContent:'center'}} >
      <Services/>
    </View>

      </View>
    </View>)
}

export default HomeScreen

const styles = StyleSheet.create({
  
})