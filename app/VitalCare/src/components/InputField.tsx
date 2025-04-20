import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  placeholder: string;
  password?: boolean;
}

const InputField = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(true);
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: "90%", flexDirection: "row", alignItems: "center", height: RFPercentage(6), fontFamily: "Inter-Regular", fontSize: RFPercentage(1.7), color: Colors.black }}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.mediumGrey}
        secureTextEntry={!visible}
      />
      {props.password && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={{}}>
          <Feather name={visible ? "eye" : "eye-off"} size={RFPercentage(2)} color={"rgba(100, 116, 139, 1)"} style={{ right: RFPercentage(0.7) }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    height: RFPercentage(6),
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: RFPercentage(1),
    alignItems: "center",
    marginTop: RFPercentage(1),
    flexDirection: "row",
  },
});
