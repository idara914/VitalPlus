import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Menu from "../screens/home/Menu";
import Account from "../screens/home/Account";
import Notification from "../screens/home/Notification";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/theme";
import { View, TouchableWithoutFeedback } from "react-native";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Menu") {
            return <FontAwesome name="plus" size={RFPercentage(3)} color={color} />;
          } else if (route.name === "Account") {
            return <FontAwesome6 name="user" size={RFPercentage(2.5)} color={color} />;
          } else if (route.name === "Notification") {
            return <Fontisto name={"bell"} size={RFPercentage(2.5)} color={color} />;
          }
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          height: RFPercentage(10),
          paddingTop: RFPercentage(1.5),
        },
        tabBarLabelStyle: {
          fontSize: RFPercentage(1.6),
          fontFamily: "Inter-Medium",
        },
        tabBarButton: (props) => (
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={props.style}>{props.children}</View>
          </TouchableWithoutFeedback>
        ),
      })}
    >
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}

