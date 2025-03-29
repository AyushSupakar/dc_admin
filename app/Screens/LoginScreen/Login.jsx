import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from "./../../Utils/Colors";
import React, { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'


export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

const Login = () => {
  useWarmUpBrowser()

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })
      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])


  return (
    <View style={{alignItems:'center'}}>
    <Image source={require('./../../../assets/images/fs10.jpeg')} 
        style={styles.loginImage} />
    
    <View style={styles.subContainer}> 
          <Text style={{color:Colors.WHITE, fontSize:27, textAlign:'center'}}> 
            Hello,
            <Text style={{fontWeight:'bold'}} > This is the Admin Side of DC App. </Text>
          </Text>
          <Text style={{fontSize:17, color:Colors.WHITE, textAlign:'center', marginTop:20 }}> Best App to get Services near you</Text>             
        <TouchableOpacity style={styles.button} onPress={onPress} >
          
          <Text style={{textAlign:'center', fontSize:17, color:Colors.PRIMARY}}> Sign In  (if you are an Admin) </Text>
        </TouchableOpacity>     
    </View>

</View>
  )
}

export default Login

const styles = StyleSheet.create({
    loginImage:{
        width:"80%",
        height:400,
        marginTop:30,
        borderWidth:4,
        borderColor:Colors.BLACK,
        borderRadius:50,
    },
    subContainer:{
       width:'100%',
       padding:20,
       height:'65%',
       marginTop:-25,
       backgroundColor:Colors.PRIMARY,
       borderTopLeftRadius:30,
       borderTopRightRadius:30,
    },
    button:{
        backgroundColor:Colors.WHITE,
        padding:15,
        borderRadius:99,
        marginTop:40,
        alignSelf:'center',
        alignItems:'center',
    }

})