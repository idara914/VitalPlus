import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Colors, Icons } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

interface Props {
    icon : any,
    text : string,
    style? : object
}

const Field = (props : Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.container,props.style]}>
      <Image source={props.icon} resizeMode="contain" style={{ width: RFPercentage(4.5), height: RFPercentage(4.5) }} />
      <Text style={{ color: "rgba(17, 24, 39, 1)", fontFamily: "Inter-Regular", fontSize: RFPercentage(1.7), left:RFPercentage(1.5) }}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Field;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    height: RFPercentage(8),
    flexDirection: "row",
    alignItems: "center",
    padding: RFPercentage(2),
   
  },
});
