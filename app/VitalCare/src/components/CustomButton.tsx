import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/theme";

interface Props {
    title : string,
    onPress : ()=> void
}

const CustomButton = (props:Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={styles.container}>
      <Text style={{ color: Colors.white, fontFamily: "Inter-Medium", fontSize: RFPercentage(1.9) }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: RFPercentage(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(1),
    backgroundColor: Colors.primary,
  },
});
