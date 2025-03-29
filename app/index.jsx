import './gesture-handler';
import { ScrollView, Text, View } from "react-native";
import Login  from "./Screens/LoginScreen/Login";
import TabNavigation  from "./Navigations/TabNavigaion";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { SignOutButton } from '@/app/components/SignOutButton'
import { Link } from 'expo-router'
import { useFonts } from 'expo-font';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function Index() {

  const [loaded, error] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });


  return (<View
      style={{
        flex: 1        
      }}
      options={{ headerShown: false }}
    >
      <SignedIn><TabNavigation/>
      {/* <SignOutButton /> */}
            </SignedIn>
            <SignedOut>
                <Login />
            </SignedOut> 
    </View>);
}
