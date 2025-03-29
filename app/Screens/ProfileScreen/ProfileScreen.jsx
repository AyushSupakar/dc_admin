// import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/app/Utils/Colors";

import React, { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import useLocation from "./../../hooks/useLocation"; // Import custom hook

const ProfileScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  
  const { address, errorMsg } = useLocation();

  React.useEffect(() => {
    if (errorMsg) {
      Alert.alert("Location Error", errorMsg);
    }
  }, [errorMsg]);
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.fullName}</Text>
        <Text style={styles.userEmail}>{user.primaryEmailAddress?.emailAddress}</Text>
      </View>
      
      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Account Details</Text>
        <Text style={styles.detailsText}>Role: Admin</Text>
        <Text style={styles.detailsText}>Email: {user.primaryEmailAddress?.emailAddress}</Text>
        <Text style={styles.detailsText}>Phone Number: {user.username || "N/A"}</Text>
        <Text style={styles.detailsText}>
  Address: {address?.city && address?.region && address?.country 
    ? `${address.city}, ${address.region}, ${address.country}` 
    : "N/A"}
</Text>
        {/* <Text style={styles.detailsText}>Username: {user.username || "N/A"}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  detailsContainer: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "gray",
  },
});

export default ProfileScreen;
