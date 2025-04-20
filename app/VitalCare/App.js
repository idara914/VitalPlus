import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/routers/StackNavigator";
import { useFonts } from "expo-font";
import { Fonts } from "./src/constants/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": Fonts.Bold,
    "Inter-Regular": Fonts.Regular,
    "Inter-Medium": Fonts.Medium,
    "Inter-SemiBold": Fonts.SemiBold,
  });

  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
