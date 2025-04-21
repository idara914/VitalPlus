import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Icons } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          <Image source={Icons.logo2} resizeMode="contain" style={styles.logo} />

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <InputField placeholder="Enter your email address" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <InputField placeholder="Enter your Password" password={true} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Login"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <View style={styles.footerTextWrapper}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.footerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

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
  },
  logo: {
    width: RFPercentage(40),
    height: RFPercentage(10),
  },
  formWrapper: {
    width: "100%",
    marginTop: RFPercentage(3.5),
  },
  formContainer: {
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
  inputLabel: {
    color: Colors.darkGrey,
    fontFamily: "Inter-SemiBold",
    fontSize: RFPercentage(1.8),
  },
  buttonWrapper: {
    alignSelf: "center",
    width: "90%",
    top: RFPercentage(40),
  },
  footerTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(1),
  },
  footerText: {
    color: Colors.black,
    fontFamily: "Inter-Regualr",
    fontSize: RFPercentage(1.8),
  },
  footerLink: {
    color: Colors.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: RFPercentage(1.8),
    left: RFPercentage(0.4),
  },
});
