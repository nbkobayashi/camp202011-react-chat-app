import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SigninScreen() {
  const navigation = useNavigation();

  const toChat = () => {
    navigation.navigate("Chat");
  };

  const toSignup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text>SigninScreen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
