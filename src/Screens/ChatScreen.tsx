import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";

type ChatScreenRouteProps = RouteProp<RootStackParamList, "Chat">;
type Props = {
  route: ChatScreenRouteProps;
};

export function ChatScreen(props: Props) {
  const currentUser = props.route.params.user;
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>{`${currentUser.email}`}でログイン中</Text>
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
