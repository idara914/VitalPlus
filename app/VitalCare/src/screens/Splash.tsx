import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts, Icons } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={"transparent"} />
      <View style={styles.container}>
        <Image source={Icons.logo} resizeMode="contain" style={{ width: RFPercentage(35), height: RFPercentage(10) }} />
        <Text style={{ color: Colors.white, fontSize: RFPercentage(2), marginTop: RFPercentage(1.5), fontFamily: "Inter-Regular" }}>Simplifying Healthcare Scheduling</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
