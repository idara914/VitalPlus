import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Icons } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import Field from "../../components/Field";

const Menu = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={Icons.logo2} resizeMode="contain" style={styles.logo} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            <View style={styles.sectionContent}>
              <Field icon={Icons.one} text="View Schedule" style={styles.topRounded} />
              <Field icon={Icons.two} text="Offer/Add Shift" style={styles.borderedTop} />
              <Field
                icon={Icons.one}
                text="Request PTO"
                style={[styles.bottomRounded, styles.borderedTop]}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verify visit</Text>
            <View style={styles.sectionContent}>
              <Field icon={Icons.three} text="Verify visit" style={styles.rounded} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Forms</Text>
            <View style={styles.sectionContent}>
              <Field icon={Icons.five} text="Trainings" style={styles.topRounded} />
              <Field
                icon={Icons.six}
                text="Required Forms"
                style={[styles.bottomRounded, styles.borderedTop]}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Action</Text>
            <View style={styles.sectionContent}>
              <Field icon={Icons.seven} text="Update Direct Deposit" style={styles.rounded} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Charting</Text>
            <View style={styles.sectionContent}>
              <Field icon={Icons.eight} text="New Chart" style={styles.topRounded} />
              <Field
                icon={Icons.nine}
                text="View Chart"
                style={[styles.bottomRounded, styles.borderedTop]}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroud,
  },
  scrollContent: {
    paddingBottom: RFPercentage(5),
  },
  container: {
    width: "90%",
    alignSelf: "center",
    paddingTop: RFPercentage(2),
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: RFPercentage(40),
    height: RFPercentage(10),
  },
  section: {
    marginTop: RFPercentage(2.5),
  },
  sectionTitle: {
    color: Colors.black,
    fontFamily: "Inter-SemiBold",
    fontSize: RFPercentage(1.9),
  },
  sectionContent: {
    marginTop: RFPercentage(1),
  },
  topRounded: {
    borderTopLeftRadius: RFPercentage(1.5),
    borderTopRightRadius: RFPercentage(1.5),
  },
  bottomRounded: {
    borderBottomLeftRadius: RFPercentage(1.5),
    borderBottomRightRadius: RFPercentage(1.5),
  },
  rounded: {
    borderRadius: RFPercentage(1.5),
  },
  borderedTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
});
