import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Icons } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Image source={Icons.logo2} resizeMode="contain" style={styles.logo} />
          <View style={styles.formContainer}>
            <View style={styles.formBox}>
              <Text style={styles.title}>Create Your Account</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Full Name</Text>
                <InputField placeholder="Enter your name" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email Address</Text>
                <InputField placeholder="Enter your email address" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <InputField placeholder="Enter your Password" password={true} />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Confirm Password</Text>
                <InputField placeholder="Enter your Confirm Password" password={true} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <CustomButton title="Sign Up" onPress={() => {}} />
        <View style={styles.loginLinkWrapper}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroud,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(5),
  },
  logo: {
    width: RFPercentage(40),
    height: RFPercentage(10),
    alignSelf: "center",
  },
  formContainer: {
    width: "90%",
    marginTop: RFPercentage(3.5),
    alignSelf: "center",
  },
  formBox: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: RFPercentage(3),
    padding: RFPercentage(2.7),
    paddingBottom: RFPercentage(3.5),
  },
  title: {
    color: Colors.black,
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2.5),
    textAlign: "center",
  },
  inputWrapper: {
    marginTop: RFPercentage(2.5),
  },
  label: {
    color: Colors.darkGrey,
    fontFamily: "Inter-SemiBold",
    fontSize: RFPercentage(1.8),
  },
  buttonWrapper: {
    alignSelf: "center",
    width: "90%",
    position: "absolute",
    bottom: RFPercentage(4),
  },
  loginLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(1),
  },
  loginText: {
    color: Colors.black,
    fontFamily: "Inter-Regualr",
    fontSize: RFPercentage(1.8),
  },
  loginButton: {
    color: Colors.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: RFPercentage(1.8),
    left: RFPercentage(0.4),
  },
});
